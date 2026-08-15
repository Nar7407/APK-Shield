import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "../lib/utils";

interface LiquidTextProps {
  /** Single text string (can also use newline \n) */
  text?: string;
  /** Array of lines to display */
  lines?: string[];
  /** Colors for each line (e.g. ["#ffffff", "#38bdf8"] or gradient strings) */
  lineColors?: string[];
  /** Font size in pixels */
  fontSize?: number;
  /** Font family */
  font?: string;
  /** Fixed text color (overrides theme colors) */
  color?: string;
  /** Text color in light mode */
  lightColor?: string;
  /** Text color in dark mode */
  darkColor?: string;
  /** Additional CSS classes */
  className?: string;
}

const createTextTexture = (
  textLines: string[],
  lineColors: string[] | undefined,
  baseFontSize: number,
  font: string,
  defaultColor: string,
  containerWidth: number,
  containerHeight: number,
  dpr: number
): THREE.Texture => {
  const canvas = document.createElement("canvas");
  // 3x super-sampling for crystal clear, razor sharp vector-like crispness
  const superSample = Math.max(dpr, 2) * 2;
  const canvasWidth = Math.max(Math.round(containerWidth * superSample), 1024);
  const canvasHeight = Math.max(Math.round(containerHeight * superSample), 512);

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  const numLines = Math.max(textLines.length, 1);
  const scaleRatio = superSample / 2;
  let currentSize = Math.round(baseFontSize * scaleRatio);

  const maxAvailableWidth = canvasWidth * 0.94;
  const maxAvailableHeight = canvasHeight * 0.88;

  // Measure max line width & scale down if necessary to prevent wrapping/clipping
  ctx.font = `900 ${currentSize}px ${font}`;
  let maxWidth = 0;
  for (const line of textLines) {
    const w = ctx.measureText(line).width;
    if (w > maxWidth) maxWidth = w;
  }

  if (maxWidth > maxAvailableWidth) {
    currentSize = Math.floor(currentSize * (maxAvailableWidth / maxWidth));
  }

  const lineHeight = currentSize * 1.15;
  const totalHeight = numLines * lineHeight;
  if (totalHeight > maxAvailableHeight) {
    currentSize = Math.floor(currentSize * (maxAvailableHeight / totalHeight));
  }

  ctx.font = `900 ${currentSize}px ${font}`;
  const finalLineHeight = currentSize * 1.15;
  const blockHeight = (numLines - 1) * finalLineHeight;
  const startY = canvasHeight / 2 - blockHeight / 2;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  textLines.forEach((line, index) => {
    const lineColor = lineColors && lineColors[index] ? lineColors[index] : defaultColor;

    if (lineColor.startsWith("gradient:")) {
      const parts = lineColor.replace("gradient:", "").split(",");
      const grad = ctx.createLinearGradient(canvasWidth * 0.2, 0, canvasWidth * 0.8, 0);
      grad.addColorStop(0, parts[0] || "#38bdf8");
      grad.addColorStop(1, parts[1] || "#60a5fa");
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = lineColor;
    }

    const y = startY + index * finalLineHeight;
    ctx.fillText(line, canvasWidth / 2, y);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  return texture;
};

const vertexShader = `
  varying vec2 vUv;
  uniform vec3 uDisplacement;
  uniform float uTime;
  uniform float uHover;

  float easeInOutCubic(float x) {
    return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
  }

  void main() {
    vUv = uv;
    vec3 displaced = position;
    float dist = length(uDisplacement.xy - position.xy);
    float minDistance = 3.5;

    if (dist < minDistance && uHover > 0.001) {
      float factor = 1.0 - (dist / minDistance);
      float wave = sin(dist * 6.0 - uTime * 4.0) * 0.35 * easeInOutCubic(factor) * uHover;
      displaced.z += wave;
      vec2 dir = normalize(position.xy - uDisplacement.xy + 0.0001);
      displaced.xy += dir * (sin(dist * 7.0 - uTime * 5.0) * 0.16 * factor * uHover);
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec3 uDisplacement;
  uniform float uTime;
  uniform float uHover;

  void main() {
    vec2 uv = vUv;
    
    // Smooth fluid refraction ripple in UV space
    vec2 toMouse = uv - (uDisplacement.xy * 0.08 + 0.5);
    float dist = length(toMouse);
    if (dist < 0.35 && uHover > 0.001) {
      float factor = (1.0 - dist / 0.35) * uHover;
      float wave = sin(dist * 28.0 - uTime * 6.0) * 0.012 * factor;
      uv += normalize(toMouse + 0.0001) * wave;
    }
    
    gl_FragColor = texture2D(uTexture, uv);
  }
`;

export function LiquidText({
  text,
  lines,
  lineColors,
  fontSize = 90,
  font = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  color,
  lightColor = "#ffffff",
  darkColor = "#ffffff",
  className,
}: LiquidTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const parsedLines: string[] = lines && lines.length > 0
    ? lines
    : text
    ? text.split("\n")
    : ["Liquid Text"];

  const fullText = parsedLines.join(" ");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(rect.width, 100);
    const height = Math.max(rect.height, 50);

    const scene = new THREE.Scene();
    scene.background = null;

    const viewHeight = 6;
    const aspect = width / height;
    const camera = new THREE.OrthographicCamera(
      (-viewHeight * aspect) / 2,
      (viewHeight * aspect) / 2,
      viewHeight / 2,
      -viewHeight / 2,
      0.01,
      1000
    );
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      const fallback = document.createElement("div");
      fallback.className =
        "flex flex-col h-full w-full items-center justify-center text-3xl sm:text-4xl md:text-5xl font-black text-white text-center leading-tight";
      parsedLines.forEach((l, idx) => {
        const lineEl = document.createElement("div");
        lineEl.textContent = l;
        if (lineColors && lineColors[idx]) {
          lineEl.style.color = lineColors[idx];
        }
        fallback.appendChild(lineEl);
      });
      container.appendChild(fallback);

      return () => {
        fallback.remove();
      };
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const planeWidth = viewHeight * aspect;
    const planeHeight = viewHeight;
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 120, 120);

    const getActiveColor = () =>
      color || (document.documentElement.classList.contains("dark") ? darkColor : lightColor);

    let currentColor = getActiveColor();
    let textTexture = createTextTexture(
      parsedLines,
      lineColors,
      fontSize,
      font,
      currentColor,
      width,
      height,
      dpr
    );

    const uniforms = {
      uTexture: { value: textTexture },
      uDisplacement: { value: new THREE.Vector3(999, 999, 0) },
      uTime: { value: 0 },
      uHover: { value: 0 },
    };

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const plane = new THREE.Mesh(geometry, shaderMaterial);
    plane.rotation.set(0, 0, 0);
    scene.add(plane);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-999, -999);
    let targetHover = 0;

    const onPointerMove = (e: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      pointer.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;
      targetHover = 1.0;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(plane);
      if (intersects.length > 0) {
        uniforms.uDisplacement.value.copy(intersects[0].point);
      }
    };

    const onPointerLeave = () => {
      targetHover = 0;
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    const handleResize = () => {
      const r = container.getBoundingClientRect();
      if (r.height === 0 || r.width === 0) return;
      const newAspect = r.width / r.height;
      camera.left = (-viewHeight * newAspect) / 2;
      camera.right = (viewHeight * newAspect) / 2;
      camera.top = viewHeight / 2;
      camera.bottom = -viewHeight / 2;
      camera.updateProjectionMatrix();

      plane.geometry.dispose();
      plane.geometry = new THREE.PlaneGeometry(viewHeight * newAspect, viewHeight, 120, 120);

      renderer.setSize(r.width, r.height, false);

      // Re-create texture on resize for 1:1 pixel sharpness
      const newDpr = Math.min(window.devicePixelRatio || 1, 3);
      const newTex = createTextTexture(
        parsedLines,
        lineColors,
        fontSize,
        font,
        currentColor,
        r.width,
        r.height,
        newDpr
      );
      uniforms.uTexture.value = newTex;
      textTexture.dispose();
      textTexture = newTex;
    };

    window.addEventListener("resize", handleResize);

    let animationId = 0;
    const clock = new THREE.Clock();

    const render = () => {
      animationId = requestAnimationFrame(render);
      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;
      uniforms.uHover.value += (targetHover - uniforms.uHover.value) * 0.1;

      renderer.render(scene, camera);
    };
    render();

    const observer = new MutationObserver(() => {
      const next = getActiveColor();
      if (next !== currentColor) {
        const curRect = container.getBoundingClientRect();
        const tex = createTextTexture(
          parsedLines,
          lineColors,
          fontSize,
          font,
          next,
          curRect.width || width,
          curRect.height || height,
          dpr
        );
        uniforms.uTexture.value = tex;
        textTexture.dispose();
        textTexture = tex;
        currentColor = next;
      }
    });
    if (!color) observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(animationId);
      observer.disconnect();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
      renderer.renderLists.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      textTexture.dispose();
      plane.geometry.dispose();
      shaderMaterial.dispose();
    };
  }, [JSON.stringify(parsedLines), JSON.stringify(lineColors), fontSize, font, color, lightColor, darkColor]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-28 sm:h-36 md:h-44 overflow-visible cursor-pointer select-none", className)}
      aria-label={fullText}
    >
      <h2 className="sr-only">{fullText}</h2>
    </div>
  );
}

export default LiquidText;

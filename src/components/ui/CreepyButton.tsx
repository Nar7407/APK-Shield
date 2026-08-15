"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { playCreepyEyeSound } from "@/lib/sound";

export interface CreepyButtonProps {
    children: React.ReactNode;
    className?: string;
    coverClassName?: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

type Coords = {
    x: number;
    y: number;
};

export const CreepyButton = ({
    children,
    className,
    coverClassName,
    onClick,
    ...props
}: CreepyButtonProps) => {
    const eyesRef = useRef<HTMLSpanElement>(null);
    const [eyeCoords, setEyeCoords] = useState<Coords>({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const updateEyes = (e: React.MouseEvent | React.TouchEvent) => {
        const userEvent =
            "touches" in e ? (e as React.TouchEvent).touches[0] : (e as React.MouseEvent);

        if (!eyesRef.current) return;

        // get the center of the eyes container
        const eyesRect = eyesRef.current.getBoundingClientRect();
        const eyesCenter = {
            x: eyesRect.left + eyesRect.width / 2,
            y: eyesRect.top + eyesRect.height / 2,
        };

        // cursor position
        const cursor = {
            x: userEvent.clientX,
            y: userEvent.clientY,
        };

        // calculate the eye angle
        const dx = cursor.x - eyesCenter.x;
        const dy = cursor.y - eyesCenter.y;
        const angle = Math.atan2(-dy, dx) + Math.PI / 2;

        // pupil distance from the eye center
        const visionRangeX = 180; // Max distance to look horizontally
        const visionRangeY = 75; // Max distance to look vertically
        const distance = Math.hypot(dx, dy);

        // Limit the movement so pupils don't go too far
        const x = (Math.sin(angle) * Math.min(distance, visionRangeX)) / visionRangeX;
        const y = (Math.cos(angle) * Math.min(distance, visionRangeY)) / visionRangeY;

        setEyeCoords({ x, y });
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
        setIsHovered(true);
        updateEyes(e);
        playCreepyEyeSound();
    };

    // Reset eyes when mouse leaves
    const resetEyes = () => {
        setEyeCoords({ x: 0, y: 0 });
        setIsHovered(false);
    };

    const pupilStyle = {
        transform: `translate(calc(-50% + ${eyeCoords.x * 50}%), calc(-50% + ${eyeCoords.y * 50}%))`,
    };

    return (
        <button
            className={cn(
                "relative min-w-[9em] rounded-xl bg-black cursor-pointer outline-none select-none group tap-highlight-transparent border border-neutral-800",
                "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400",
                className
            )}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseMove={(e) => {
                updateEyes(e);
                if (!isHovered) setIsHovered(true);
            }}
            onTouchMove={updateEyes}
            onMouseLeave={resetEyes}
            onFocus={() => {
                setIsHovered(true);
                playCreepyEyeSound();
            }}
            onBlur={() => setIsHovered(false)}
            {...props}
        >
            {/* Eyes Container */}
            <span
                ref={eyesRef}
                className="absolute flex items-center gap-[0.375em] right-[1em] bottom-[0.5em] h-[0.75em] z-0 pointer-events-none"
            >
                {/* Left Eye */}
                <motion.span
                    className="relative w-[0.75em] bg-white rounded-full overflow-hidden shadow-inner"
                    animate={{ height: ["0.75em", "0.75em", "0em", "0.75em"] }}
                    transition={{
                        duration: 3,
                        times: [0, 0.92, 0.96, 1],
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <span
                        className="absolute top-1/2 left-1/2 w-[0.375em] h-[0.375em] bg-black rounded-full transition-transform duration-75 ease-out shadow-sm"
                        style={pupilStyle}
                    />
                </motion.span>
                {/* Right Eye */}
                <motion.span
                    className="relative w-[0.75em] bg-white rounded-full overflow-hidden shadow-inner"
                    animate={{ height: ["0.75em", "0.75em", "0em", "0.75em"] }}
                    transition={{
                        duration: 3,
                        times: [0, 0.92, 0.96, 1],
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <span
                        className="absolute top-1/2 left-1/2 w-[0.375em] h-[0.375em] bg-black rounded-full transition-transform duration-75 ease-out shadow-sm"
                        style={pupilStyle}
                    />
                </motion.span>
            </span>

            {/* Button Cover */}
            <motion.span
                className={cn(
                    "absolute inset-0 block rounded-xl bg-blue-500 text-white font-bold tracking-wider",
                    "shadow-[-4px_4px_0px_0px_#000000]",
                    "flex items-center justify-center px-5 py-2.5 text-sm",
                    "origin-[1.25em_50%]",
                    coverClassName
                )}
                animate={{
                    rotate: isHovered ? -5 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.8,
                }}
            >
                {children}
            </motion.span>

            {/* Invisible placeholder to maintain size since cover is absolute */}
            <span className="block opacity-0 px-5 py-2.5 font-bold tracking-wider min-w-[9em] text-sm">
                {children}
            </span>
        </button>
    );
};

export default CreepyButton;

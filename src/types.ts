export type ThreatSeverity = 'CLEAN' | 'SAFE' | 'LOW_RISK' | 'SUSPICIOUS' | 'MALICIOUS' | 'CRITICAL';

export interface MitreTactic {
  id: string;
  tactic: string;
  technique: string;
  description: string;
}

export interface HeuristicCheck {
  name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  matched: boolean;
  detail: string;
}

export interface SandboxEmulation {
  processCalls: string[];
  registryKeys: string[];
  networkConnections: string[];
  fileSystemOps: string[];
  mutexes: string[];
}

export interface FileScanResult {
  scanId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  mimeType?: string;
  sha256: string;
  sha1: string;
  md5: string;
  entropy: number;
  threatLevel: ThreatSeverity;
  threatScore: number; // 0 to 100
  malwareFamily: string;
  verdict: string;
  summary: string;
  mitreTactics: MitreTactic[];
  heuristics: HeuristicCheck[];
  sandboxActivity: SandboxEmulation;
  extractedStrings: string[];
  yaraRule: string;
  remediation: string[];
  scanDurationMs: number;
  timestamp: string;
  isAiEnhanced?: boolean;
}

export interface BlacklistVendor {
  engine: string;
  detected: boolean;
  category: string;
}

export interface UrlScanResult {
  scanId: string;
  url: string;
  domain: string;
  threatLevel: ThreatSeverity;
  reputationScore: number; // 0 (Clean) to 100 (Deadly Phish/Malware)
  verdict: string;
  summary: string;
  threatCategories: string[];
  domainAge: string;
  ipAddress: string;
  asn: {
    number: number;
    organization: string;
    country: string;
    city?: string;
  };
  sslStatus: {
    valid: boolean;
    issuer: string;
    protocol: string;
    daysRemaining: number;
  };
  redirectionChain: string[];
  blacklists: BlacklistVendor[];
  riskFactors: string[];
  mitigationSteps: string[];
  timestamp: string;
  scanDurationMs: number;
  isAiEnhanced?: boolean;
}

export interface ThreatFeedItem {
  id: string;
  type: 'FILE' | 'URL' | 'IP' | 'HASH';
  indicator: string;
  threatName: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  originCountry: string;
  targetedSector: string;
  timestamp: string;
}

export interface ThreatStats {
  totalScans: number;
  threatsFound: number;
  cleanFiles: number;
  urlsAnalyzed: number;
  activeHoneyPots: number;
}

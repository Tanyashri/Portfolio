import React, { useState } from 'react';
import { Mic, ShieldCheck, Lock, Hash, CheckCircle, ArrowRight, RefreshCw, FileText } from 'lucide-react';

const SAMPLE_GRIEVANCES = [
  {
    audioName: 'Voice Memo #409 (0:14s)',
    transcript: 'The street lighting along the southern campus perimeter has been broken for three weeks, making it unsafe to walk after dark.',
    intent: 'CIVIC_INFRASTRUCTURE_HAZARD',
    severity: 'HIGH_PRIORITY',
    entity: 'Campus Perimeter South // Lighting',
    saltHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    blockHeight: '0x004A9F',
    timestamp: '2026-08-23 14:12:08 UTC'
  },
  {
    audioName: 'Voice Memo #410 (0:22s)',
    transcript: 'Sanitation collection in Sector 4 was skipped twice consecutively, causing severe accumulation near the main clinic entrance.',
    intent: 'PUBLIC_HEALTH_SANITATION',
    severity: 'CRITICAL',
    entity: 'Sector 4 // Clinic Entrance',
    saltHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    blockHeight: '0x004AA0',
    timestamp: '2026-08-23 14:18:32 UTC'
  }
];

export const AwaazSimulator: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isRecordingSim, setIsRecordingSim] = useState<boolean>(false);
  const [verifiedChain, setVerifiedChain] = useState<boolean>(true);

  const current = SAMPLE_GRIEVANCES[selectedIdx];

  const handleSimulateNew = () => {
    setIsRecordingSim(true);
    setTimeout(() => {
      setSelectedIdx((prev) => (prev === 0 ? 1 : 0));
      setIsRecordingSim(false);
    }, 600);
  };

  return (
    <div className="bg-[#111416] border border-[#23282c] rounded-xl p-5 text-xs font-mono text-[#d8dad9] overflow-hidden">
      {/* Header telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#23282c]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ec4899] animate-pulse" />
          <span className="font-semibold tracking-wider text-white">AWAAZ VOICE // NLP & BLOCKCHAIN-LITE AUDIT</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateNew}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-[10px] bg-[#ec4899]/10 text-[#ec4899] border border-[#ec4899]/30 hover:bg-[#ec4899]/20 transition-colors"
          >
            <Mic className="w-3 h-3" /> {isRecordingSim ? 'PROCESSING VOICE...' : 'CYCLE VOICE SAMPLE'}
          </button>
        </div>
      </div>

      {/* Voice to Audit 4-Step Pipeline Flow */}
      <div className="my-4 grid grid-cols-1 md:grid-cols-4 gap-2">
        {/* Step 1: Voice Capture */}
        <div className="p-3 bg-[#0c0f11] border border-[#23282c] rounded-lg">
          <div className="text-[10px] text-[#ec4899] uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>01 / Voice Audio</span>
            <Mic className="w-3 h-3" />
          </div>
          <div className="text-white font-bold text-xs">{current.audioName}</div>
          <div className="flex items-center gap-0.5 mt-2 h-4">
            {[40, 70, 30, 90, 60, 100, 45, 80, 20, 95, 50, 75].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-[#ec4899] rounded-full transition-all duration-300"
                style={{ height: isRecordingSim ? `${Math.random() * 100}%` : `${h}%` }}
              />
            ))}
          </div>
          <div className="text-[9px] text-[#8e9599] mt-2">Zero login required</div>
        </div>

        {/* Step 2: NLP Intent */}
        <div className="p-3 bg-[#0c0f11] border border-[#23282c] rounded-lg">
          <div className="text-[10px] text-[#38bdf8] uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>02 / NLP Intent</span>
            <FileText className="w-3 h-3" />
          </div>
          <div className="text-white font-bold text-[11px] truncate">{current.intent}</div>
          <div className="mt-1.5 inline-block px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[9px] font-bold">
            {current.severity}
          </div>
          <div className="text-[9px] text-[#8e9599] mt-1.5 truncate">{current.entity}</div>
        </div>

        {/* Step 3: Salted SHA-256 */}
        <div className="p-3 bg-[#0c0f11] border border-[#23282c] rounded-lg">
          <div className="text-[10px] text-[#f59e0b] uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>03 / Salted Hash</span>
            <Lock className="w-3 h-3" />
          </div>
          <div className="text-white font-bold text-xs">Pseudonymized</div>
          <div className="text-[9px] text-[#f59e0b] mt-1 font-mono break-all leading-tight bg-[#15191c] p-1 rounded border border-[#262c31]">
            {current.saltHash.substring(0, 24)}...
          </div>
          <div className="text-[9px] text-[#8e9599] mt-1">One-way salt; zero PII disk write</div>
        </div>

        {/* Step 4: Blockchain-Lite Ledger */}
        <div className="p-3 bg-[#0c0f11] border border-[#00f59b]/30 rounded-lg">
          <div className="text-[10px] text-[#00f59b] uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>04 / Ledger Block</span>
            <ShieldCheck className="w-3 h-3 text-[#00f59b]" />
          </div>
          <div className="text-white font-bold text-xs">Block #{current.blockHeight}</div>
          <div className="text-[10px] text-emerald-400 mt-1 font-semibold flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Tamper-Evident ✓
          </div>
          <div className="text-[9px] text-[#8e9599] mt-1">{current.timestamp}</div>
        </div>
      </div>

      {/* Spoken Transcript Preview */}
      <div className="mt-3 p-3 bg-[#15191c] border border-[#23282c] rounded-lg">
        <div className="text-[10px] text-[#8e9599] uppercase tracking-wider mb-1">
          Automated Speech-To-Text Output:
        </div>
        <p className="text-[#f2f4f3] text-xs italic font-sans">
          "{current.transcript}"
        </p>
      </div>
    </div>
  );
};

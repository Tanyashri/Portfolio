import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, AlertTriangle, ArrowRight, RefreshCw, Cpu, Database, CheckCircle2 } from 'lucide-react';

export const AuraSimulator: React.FC = () => {
  const [driftMode, setDriftMode] = useState<boolean>(false);
  const [streamIndex, setStreamIndex] = useState<number>(0);
  const [telemetryLog, setTelemetryLog] = useState<Array<{
    id: string;
    featureVector: string;
    prodPred: string;
    challengerPred: string;
    divergence: number;
    driftFlag: boolean;
    latency: number;
  }>>([]);

  useEffect(() => {
    // Generate initial telemetry logs
    const initialLogs = [
      { id: 'TX-8921', featureVector: '[0.84, 0.12, 0.95]', prodPred: 'APPROVE (0.91)', challengerPred: 'APPROVE (0.93)', divergence: 0.02, driftFlag: false, latency: 4.2 },
      { id: 'TX-8922', featureVector: '[0.41, 0.78, 0.33]', prodPred: 'REJECT (0.18)', challengerPred: 'REJECT (0.16)', divergence: 0.02, driftFlag: false, latency: 3.8 },
      { id: 'TX-8923', featureVector: '[0.65, 0.44, 0.71]', prodPred: 'APPROVE (0.76)', challengerPred: 'APPROVE (0.79)', divergence: 0.03, driftFlag: false, latency: 4.0 },
    ];
    setTelemetryLog(initialLogs);
  }, []);

  const injectSyntheticStream = () => {
    const newIdx = streamIndex + 1;
    setStreamIndex(newIdx);

    const isShifted = driftMode;
    const prodScore = isShifted ? (Math.random() * 0.4 + 0.3).toFixed(2) : (Math.random() * 0.3 + 0.7).toFixed(2);
    const chalScore = isShifted ? (Math.random() * 0.3 + 0.65).toFixed(2) : (Number(prodScore) + (Math.random() * 0.06 - 0.03)).toFixed(2);
    const divVal = Math.abs(Number(prodScore) - Number(chalScore));

    const newLog = {
      id: `TX-${9000 + newIdx}`,
      featureVector: `[${(Math.random()).toFixed(2)}, ${(Math.random()).toFixed(2)}, ${(Math.random()).toFixed(2)}]`,
      prodPred: Number(prodScore) > 0.5 ? `APPROVE (${prodScore})` : `REJECT (${prodScore})`,
      challengerPred: Number(chalScore) > 0.5 ? `APPROVE (${chalScore})` : `REJECT (${chalScore})`,
      divergence: Number(divVal.toFixed(3)),
      driftFlag: isShifted && divVal > 0.15,
      latency: Number((3.5 + Math.random() * 2).toFixed(1)),
    };

    setTelemetryLog(prev => [newLog, ...prev.slice(0, 4)]);
  };

  return (
    <div className="bg-black/60 border border-white/10 rounded-xl p-5 text-xs font-mono text-white/80 overflow-hidden">
      {/* Header telemetry bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#D4FF3F] animate-pulse" />
          <span className="font-bold tracking-wider text-white text-[11px]">AURA TELEMETRY // SHADOW-CHAMPION ENGINE</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDriftMode(!driftMode)}
            className={`px-2.5 py-1 rounded text-[10px] font-medium border transition-colors ${
              driftMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-white/5 text-white/50 border-white/10 hover:text-white'
            }`}
          >
            {driftMode ? '● DATA DRIFT INJECTED' : '○ DRIFT: NOMINAL'}
          </button>
          <button
            onClick={injectSyntheticStream}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-[10px] bg-[#D4FF3F] hover:bg-[#c4ed30] text-black font-black transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> STREAM INFERENCE
          </button>
        </div>
      </div>

      {/* Architecture pipeline diagram */}
      <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Ingress Stream */}
        <div className="p-3 bg-white/[0.02] border border-white/10 rounded-lg relative">
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>01 / Ingress Stream</span>
            <Activity className="w-3 h-3 text-[#D4FF3F]" />
          </div>
          <div className="text-white font-medium text-xs">Asynchronous Bifurcation</div>
          <div className="text-[10px] text-white/40 mt-1 font-sans">Single stream replicated with 0ms impact on live client SLA.</div>
        </div>

        {/* Dual Execution Engine */}
        <div className="p-3 bg-white/[0.03] border border-[#D4FF3F]/30 rounded-lg relative">
          <div className="text-[10px] text-[#D4FF3F] uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>02 / Dual Runner</span>
            <Cpu className="w-3 h-3 text-[#D4FF3F]" />
          </div>
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="flex items-center justify-between bg-black/40 px-2 py-1 rounded border border-white/5">
              <span className="text-white text-[11px]">Champion (v1.4)</span>
              <span className="text-[10px] text-[#D4FF3F] font-bold">LIVE SERVING</span>
            </div>
            <div className="flex items-center justify-between bg-black/40 px-2 py-1 rounded border border-white/5">
              <span className="text-white text-[11px]">Challenger (v2.0-RC)</span>
              <span className="text-[10px] text-amber-400">SHADOW AUDIT</span>
            </div>
          </div>
        </div>

        {/* Drift & Regulatory Gate */}
        <div className="p-3 bg-white/[0.02] border border-white/10 rounded-lg">
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>03 / Drift & Audit</span>
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="text-white font-medium text-xs">RBI/SEBI Regulatory Check</div>
          <div className="text-[10px] text-white/40 mt-1 font-sans">
            {driftMode ? (
              <span className="text-amber-400 font-semibold">⚠ Divergence spike detected ({'>'} 0.15)</span>
            ) : (
              <span className="text-emerald-400 font-semibold">✓ Divergence within safe bounds (0.02)</span>
            )}
          </div>
        </div>
      </div>

      {/* Live Inference Feed */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Live Execution Feed (Shadow Comparison)</span>
          <span className="text-[10px] text-white/30">Sampling rate: Real-time</span>
        </div>
        <div className="space-y-1.5">
          {telemetryLog.map((log) => (
            <div
              key={log.id}
              className={`p-2 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2 border transition-all ${
                log.driftFlag
                  ? 'bg-amber-500/10 border-amber-500/30'
                  : 'bg-white/[0.02] border-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">{log.id}</span>
                <span className="text-[10px] text-white/40">{log.featureVector}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10.5px] sm:text-[11px]">
                <span className="text-white/60">Prod: <strong className="text-white">{log.prodPred}</strong></span>
                <ArrowRight className="w-3 h-3 text-white/30 hidden sm:inline" />
                <span className="text-white/60">Challenger: <strong className="text-[#D4FF3F]">{log.challengerPred}</strong></span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                  log.divergence > 0.15 ? 'bg-amber-500/20 text-amber-300' : 'bg-white/10 text-white/60'
                }`}>
                  Δ {log.divergence}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

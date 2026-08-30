import React, { useState } from 'react';
import { Users, Sparkles, ArrowRight, BookOpen, Layers, CheckCircle } from 'lucide-react';

interface PeerMatch {
  user: string;
  offering: string;
  seeking: string;
  matchScore: number;
  connectionType: 'Direct Reciprocal' | 'Cluster Triad' | 'Mentorship';
  telemetryStatus: 'Active Session' | 'Matched' | 'Scheduled';
}

export const SkillHiveSimulator: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>('Dev-01 (Tanya)');

  const mockPeers: Record<string, PeerMatch[]> = {
    'Dev-01 (Tanya)': [
      { user: 'Alex K. (IITM)', offering: 'Cloud & Kubernetes', seeking: 'Neo4j & Python Graph', matchScore: 96, connectionType: 'Direct Reciprocal', telemetryStatus: 'Active Session' },
      { user: 'Rhea S. (PESU)', offering: 'NLP Transformers', seeking: 'MLOps & Drift Analysis', matchScore: 92, connectionType: 'Direct Reciprocal', telemetryStatus: 'Matched' },
      { user: 'Kiran M. (MITM)', offering: 'Next.js Frontend', seeking: 'FastAPI Backend', matchScore: 88, connectionType: 'Cluster Triad', telemetryStatus: 'Scheduled' }
    ],
    'Peer-02 (Alex)': [
      { user: 'Dev-01 (Tanya)', offering: 'Neo4j & Python Graph', seeking: 'Cloud & Kubernetes', matchScore: 96, connectionType: 'Direct Reciprocal', telemetryStatus: 'Active Session' },
      { user: 'Siddharth P.', offering: 'PostgreSQL Indexing', seeking: 'Docker Pipelines', matchScore: 84, connectionType: 'Cluster Triad', telemetryStatus: 'Matched' }
    ]
  };

  const matches = mockPeers[selectedUser] || mockPeers['Dev-01 (Tanya)'];

  return (
    <div className="bg-[#111416] border border-[#23282c] rounded-xl p-5 text-xs font-mono text-[#d8dad9] overflow-hidden">
      {/* Header telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#23282c]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-pulse" />
          <span className="font-semibold tracking-wider text-white">SKILLHIVE // RECIPROCAL RECOMMENDATION ENGINE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#8e9599]">CURRENT ROOT:</span>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="bg-[#181c1f] text-white text-[10px] border border-[#2a3035] rounded px-2 py-1 focus:outline-none focus:border-[#f59e0b]"
          >
            <option value="Dev-01 (Tanya)">Dev-01 (Tanya) [Offering: ML/Graph]</option>
            <option value="Peer-02 (Alex)">Peer-02 (Alex) [Offering: Cloud/K8s]</option>
          </select>
        </div>
      </div>

      {/* Interactive Match Topology Flow */}
      <div className="my-4 p-3 bg-[#0c0f11] border border-[#23282c] rounded-lg">
        <div className="text-[10px] text-[#8e9599] uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Reciprocal Graph Pipeline: [User] ➔ [Vector Embeddings] ➔ [Cosine Scoring] ➔ [Peer]</span>
          <span className="text-[#f59e0b] font-bold">Vector Sim Engine</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {matches.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#15191c] border border-[#262c31] hover:border-[#f59e0b]/40 rounded transition-all flex flex-col justify-between gap-2"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-xs">{item.user}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#f59e0b]/20 text-[#f59e0b] font-bold">
                    {item.matchScore}% Match
                  </span>
                </div>
                <div className="text-[10px] text-[#8e9599] mt-1">
                  Type: <span className="text-white">{item.connectionType}</span>
                </div>
              </div>

              <div className="space-y-1 my-1 p-2 bg-[#0e1113] rounded border border-[#1e2326]">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#8e9599]">Provides:</span>
                  <span className="text-emerald-400 font-medium">{item.offering}</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#8e9599]">Wants:</span>
                  <span className="text-[#38bdf8] font-medium">{item.seeking}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] text-[#8e9599]">
                <span>Status: <strong className="text-white">{item.telemetryStatus}</strong></span>
                <span className="text-[#f59e0b]">Auto-scheduled ✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resilience & Architecture highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="p-2.5 bg-[#15191c] border border-[#23282c] rounded flex items-start gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-[#f59e0b] mt-0.5 shrink-0" />
          <div>
            <span className="text-white font-semibold block text-xs">Interaction Telemetry Pipelines</span>
            <span className="text-[10px] text-[#8e9599]">Aggregates session velocity, reciprocal satisfaction, and peer milestone tracking into a persistent score.</span>
          </div>
        </div>

        <div className="p-2.5 bg-[#15191c] border border-[#23282c] rounded flex items-start gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-[#f59e0b] mt-0.5 shrink-0" />
          <div>
            <span className="text-white font-semibold block text-xs">Graceful Service Recovery</span>
            <span className="text-[10px] text-[#8e9599]">Fault-tolerant backend services preserve live session states and recover cleanly from abrupt interruptions.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

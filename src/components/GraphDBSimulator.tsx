import React, { useState } from 'react';
import { GitBranch, Zap, RefreshCw, Layers, Crosshair, AlertCircle, ArrowUpRight } from 'lucide-react';

interface GraphNode {
  id: string;
  name: string;
  category: string;
  duration: number; // in ms
  dependencies: string[]; // IDs this node depends on
  x: number;
  y: number;
}

const GRAPH_NODES: GraphNode[] = [
  { id: 'AUTH', name: 'Auth Gateway', category: 'Security', duration: 8, dependencies: [], x: 60, y: 50 },
  { id: 'SCHEMA', name: 'Schema Validator', category: 'Ingestion', duration: 12, dependencies: ['AUTH'], x: 220, y: 35 },
  { id: 'PARSER', name: 'Vector Parser', category: 'Ingestion', duration: 15, dependencies: ['AUTH'], x: 220, y: 95 },
  { id: 'TRANSFORM', name: 'Graph Normalizer', category: 'Compute', duration: 24, dependencies: ['SCHEMA', 'PARSER'], x: 390, y: 65 },
  { id: 'INDEX', name: 'Cypher Indexer', category: 'Storage', duration: 18, dependencies: ['TRANSFORM'], x: 550, y: 35 },
  { id: 'CACHE', name: 'In-Memory Cache', category: 'Storage', duration: 6, dependencies: ['TRANSFORM'], x: 550, y: 95 },
  { id: 'NOTIFY', name: 'Event Dispatcher', category: 'Egress', duration: 10, dependencies: ['INDEX', 'CACHE'], x: 700, y: 65 },
];

export const GraphDBSimulator: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('TRANSFORM');
  const [analysisMode, setAnalysisMode] = useState<'blast' | 'cycle' | 'critical'>('blast');
  const [cycleDetected, setCycleDetected] = useState<boolean>(false);

  // Helper to compute downstream blast radius
  const getBlastRadius = (startId: string): Set<string> => {
    const affected = new Set<string>([startId]);
    let changed = true;
    while (changed) {
      changed = false;
      GRAPH_NODES.forEach(node => {
        if (!affected.has(node.id)) {
          const dependsOnAffected = node.dependencies.some(dep => affected.has(dep));
          if (dependsOnAffected) {
            affected.add(node.id);
            changed = true;
          }
        }
      });
    }
    return affected;
  };

  const blastSet = getBlastRadius(selectedNode);

  // Critical path nodes (longest dependency path)
  const criticalPathSet = new Set(['AUTH', 'PARSER', 'TRANSFORM', 'INDEX', 'NOTIFY']);

  return (
    <div className="bg-[#111416] border border-[#23282c] rounded-xl p-5 text-xs font-mono text-[#d8dad9] overflow-hidden">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#23282c]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-pulse" />
          <span className="font-semibold tracking-wider text-white">NEO4J GRAPH-NATIVE ENGINE // CYPHER TRAVERSAL</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setAnalysisMode('blast'); setCycleDetected(false); }}
            className={`px-2.5 py-1 rounded text-[10px] font-medium border transition-colors ${
              analysisMode === 'blast'
                ? 'bg-[#38bdf8]/20 text-[#38bdf8] border-[#38bdf8]/40'
                : 'bg-[#181c1f] text-[#8e9599] border-[#2a3035]'
            }`}
          >
            BLAST RADIUS
          </button>
          <button
            onClick={() => { setAnalysisMode('critical'); setCycleDetected(false); }}
            className={`px-2.5 py-1 rounded text-[10px] font-medium border transition-colors ${
              analysisMode === 'critical'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-[#181c1f] text-[#8e9599] border-[#2a3035]'
            }`}
          >
            CRITICAL PATH
          </button>
          <button
            onClick={() => { setAnalysisMode('cycle'); setCycleDetected(true); }}
            className={`px-2.5 py-1 rounded text-[10px] font-medium border transition-colors ${
              analysisMode === 'cycle'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-[#181c1f] text-[#8e9599] border-[#2a3035]'
            }`}
          >
            CYCLE CHECK (DFS)
          </button>
        </div>
      </div>

      {/* Interactive SVG Diagram */}
      <div className="relative my-4 w-full h-[220px] bg-[#0c0f11] rounded-lg border border-[#23282c] overflow-x-auto overflow-y-hidden">
        <svg viewBox="0 0 780 140" className="w-full min-w-[700px] h-full">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#4b5563" />
            </marker>
            <marker id="arrow-active" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
            </marker>
            <marker id="arrow-critical" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
            </marker>
            <marker id="arrow-cycle" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#f43f5e" />
            </marker>
          </defs>

          {/* Render edges */}
          {GRAPH_NODES.flatMap(node =>
            node.dependencies.map(depId => {
              const sourceNode = GRAPH_NODES.find(n => n.id === depId);
              if (!sourceNode) return null;

              const isBlastActive = analysisMode === 'blast' && blastSet.has(sourceNode.id) && blastSet.has(node.id);
              const isCritActive = analysisMode === 'critical' && criticalPathSet.has(sourceNode.id) && criticalPathSet.has(node.id);

              let strokeColor = '#272e35';
              let marker = 'url(#arrow)';
              let strokeWidth = 1.5;

              if (isCritActive) {
                strokeColor = '#f59e0b';
                marker = 'url(#arrow-critical)';
                strokeWidth = 2.5;
              } else if (isBlastActive) {
                strokeColor = '#38bdf8';
                marker = 'url(#arrow-active)';
                strokeWidth = 2;
              }

              return (
                <path
                  key={`${sourceNode.id}-${node.id}`}
                  d={`M ${sourceNode.x} ${sourceNode.y} C ${(sourceNode.x + node.x) / 2} ${sourceNode.y}, ${(sourceNode.x + node.x) / 2} ${node.y}, ${node.x} ${node.y}`}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  markerEnd={marker}
                  strokeDasharray={isBlastActive ? '4 2' : 'none'}
                />
              );
            })
          )}

          {/* Render Cycle Back-Edge simulation if cycle mode active */}
          {analysisMode === 'cycle' && (
            <path
              d="M 550 35 C 550 140, 220 140, 220 95"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2"
              strokeDasharray="5 3"
              markerEnd="url(#arrow-cycle)"
            />
          )}

          {/* Render Nodes */}
          {GRAPH_NODES.map(node => {
            const isSelected = selectedNode === node.id;
            const inBlast = analysisMode === 'blast' && blastSet.has(node.id);
            const inCritical = analysisMode === 'critical' && criticalPathSet.has(node.id);

            let nodeFill = '#15191c';
            let borderColor = '#2a3138';
            let textColor = '#e2e8f0';

            if (analysisMode === 'cycle') {
              if (node.id === 'INDEX' || node.id === 'PARSER' || node.id === 'TRANSFORM') {
                nodeFill = '#2a1215';
                borderColor = '#f43f5e';
                textColor = '#fda4af';
              }
            } else if (analysisMode === 'critical' && inCritical) {
              nodeFill = '#221c10';
              borderColor = '#f59e0b';
              textColor = '#fde68a';
            } else if (analysisMode === 'blast') {
              if (isSelected) {
                nodeFill = '#0e2c3d';
                borderColor = '#38bdf8';
                textColor = '#38bdf8';
              } else if (inBlast) {
                nodeFill = '#10222b';
                borderColor = '#0284c7';
                textColor = '#7dd3fc';
              }
            }

            return (
              <g
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className="cursor-pointer transition-all duration-200"
              >
                <rect
                  x={node.x - 48}
                  y={node.y - 18}
                  width="96"
                  height="36"
                  rx="6"
                  fill={nodeFill}
                  stroke={borderColor}
                  strokeWidth={isSelected || inCritical ? 2 : 1}
                />
                <text
                  x={node.x}
                  y={node.y - 3}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="var(--font-mono)"
                >
                  {node.id}
                </text>
                <text
                  x={node.x}
                  y={node.y + 10}
                  textAnchor="middle"
                  fill="#8e9599"
                  fontSize="8"
                  fontFamily="var(--font-mono)"
                >
                  {node.duration}ms
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Real-time telemetry summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-2.5 bg-[#15191c] border border-[#23282c] rounded">
          <div className="text-[10px] text-[#8e9599] uppercase">Active Selection</div>
          <div className="text-white font-bold text-xs mt-0.5">{selectedNode} ({GRAPH_NODES.find(n => n.id === selectedNode)?.name})</div>
          <div className="text-[10px] text-[#8e9599] mt-0.5">Click any node to re-calculate downstream blast radius.</div>
        </div>

        <div className="p-2.5 bg-[#15191c] border border-[#23282c] rounded">
          <div className="text-[10px] text-[#8e9599] uppercase">Downstream Blast Radius</div>
          <div className="text-[#38bdf8] font-bold text-xs mt-0.5">{blastSet.size} of {GRAPH_NODES.length} Nodes Affected</div>
          <div className="text-[10px] text-[#8e9599] mt-0.5">Calculated in 1 Neo4j Cypher hop.</div>
        </div>

        <div className="p-2.5 bg-[#15191c] border border-[#23282c] rounded">
          <div className="text-[10px] text-[#8e9599] uppercase">Traversal Performance</div>
          <div className="text-emerald-400 font-bold text-xs mt-0.5">Sub-10ms Latency (~40% Boost)</div>
          <div className="text-[10px] text-[#8e9599] mt-0.5">In-memory NetworkX + Neo4j Cypher cache.</div>
        </div>
      </div>
    </div>
  );
};

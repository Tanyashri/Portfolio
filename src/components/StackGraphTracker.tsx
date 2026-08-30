import React, { useRef, useEffect, useState } from 'react';
import { Network, Terminal, Activity, Layers, Sparkles, ArrowUpRight } from 'lucide-react';
import { PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';
import { Project } from '../types';
import { TechLogo } from './TechLogos';

interface StackGraphTrackerProps {
  activeSkillName: string;
  onSelectSkill: (skillName: string) => void;
  onSelectProject: (project: Project) => void;
}

interface GraphNode {
  id: string;
  label: string;
  type: 'skill' | 'project';
  category?: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetX?: number;
  targetY?: number;
  relatedIds: string[];
}

interface GraphEdge {
  source: string;
  target: string;
  color: string;
  particlePos: number;
  speed: number;
}

export const StackGraphTracker: React.FC<StackGraphTrackerProps> = ({
  activeSkillName,
  onSelectSkill,
  onSelectProject
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'AI / ML' | 'GRAPH DB' | 'BACKEND'>('ALL');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [liveQuery, setLiveQuery] = useState<string>('MATCH (s:Skill)-[:POWERED_BY]->(p:Project) RETURN s, p');
  const animationFrameRef = useRef<number | null>(null);

  // Nodes & Edges references
  const nodesRef = useRef<GraphNode[]>([]);
  const edgesRef = useRef<GraphEdge[]>([]);

  // Initialize graph topology
  useEffect(() => {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];

    // Project Central Nodes
    const projectConfigs = [
      { id: 'aura', label: 'AURA DRIFT', color: '#D4FF3F', x: 0.25, y: 0.35 },
      { id: 'graphdb', label: 'GRAPH DB ENGINE', color: '#38bdf8', x: 0.75, y: 0.35 },
      { id: 'skillhive', label: 'SKILLHIVE REC', color: '#f59e0b', x: 0.3, y: 0.75 },
      { id: 'awaaz', label: 'AWAAZ SECURITY', color: '#ec4899', x: 0.7, y: 0.75 }
    ];

    projectConfigs.forEach((p) => {
      nodes.push({
        id: p.id,
        label: p.label,
        type: 'project',
        color: p.color,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 22,
        relatedIds: []
      });
    });

    // Skill Nodes from Categories
    const categoryColors: Record<string, string> = {
      'AI / ML & Modeling': '#D4FF3F',
      'Graph Systems & DBs': '#38bdf8',
      'Backend & Infrastructure': '#f59e0b',
      'Core & CS Fundamentals': '#a855f7'
    };

    SKILL_CATEGORIES.forEach((cat) => {
      cat.skills.forEach((sk) => {
        nodes.push({
          id: sk.name.toLowerCase(),
          label: sk.name,
          type: 'skill',
          category: cat.name,
          color: categoryColors[cat.name] || '#FFFFFF',
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          radius: 12,
          relatedIds: sk.relatedProjects
        });

        // Add edges to projects
        sk.relatedProjects.forEach((projId) => {
          edges.push({
            source: sk.name.toLowerCase(),
            target: projId,
            color: categoryColors[cat.name] || '#D4FF3F',
            particlePos: Math.random(),
            speed: 0.005 + Math.random() * 0.005
          });
        });
      });
    });

    nodesRef.current = nodes;
    edgesRef.current = edges;
  }, []);

  // Update query log when active skill changes
  useEffect(() => {
    if (activeSkillName) {
      setLiveQuery(`MATCH (s:Skill {name: "${activeSkillName}"})-[r:IMPLEMENTS]->(p:Project) RETURN s, r, p`);
    }
  }, [activeSkillName]);

  // Main Canvas Render Loop with dynamic container sizing & ResizeObserver
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 700;
    let height = 420;

    const initNodePositions = (w: number, h: number) => {
      const centerX = w / 2;
      const centerY = h / 2;
      const isMobile = w < 640;

      // Position projects in a responsive structured diamond
      const xSpread = isMobile ? w * 0.28 : w * 0.22;
      const ySpread = isMobile ? h * 0.22 : h * 0.2;

      const projOffsets: Record<string, [number, number]> = {
        aura: [centerX - xSpread, centerY - ySpread],
        graphdb: [centerX + xSpread, centerY - ySpread],
        skillhive: [centerX - xSpread * 0.9, centerY + ySpread * 1.1],
        awaaz: [centerX + xSpread * 0.9, centerY + ySpread * 1.1]
      };

      const skillNodes = nodesRef.current.filter((n) => n.type === 'skill');
      const totalSkills = skillNodes.length;

      skillNodes.forEach((node, i) => {
        const angle = (i / totalSkills) * Math.PI * 2;
        const radius = Math.min(w, h) * (isMobile ? 0.38 : 0.42) + (i % 2 === 0 ? (isMobile ? 8 : 15) : (isMobile ? -8 : -15));
        node.targetX = centerX + Math.cos(angle) * radius;
        node.targetY = centerY + Math.sin(angle) * radius;
        node.radius = isMobile ? 9 : 12;

        if (node.x === 0 && node.y === 0) {
          node.x = node.targetX;
          node.y = node.targetY;
        }
      });

      nodesRef.current.forEach((n) => {
        if (n.type === 'project' && projOffsets[n.id]) {
          n.targetX = projOffsets[n.id][0];
          n.targetY = projOffsets[n.id][1];
          n.radius = isMobile ? 18 : 22;
          if (n.x === 0 && n.y === 0) {
            n.x = n.targetX;
            n.y = n.targetY;
          }
        }
      });
    };

    const updateDimensions = () => {
      if (!canvas || !container) return;
      const clientW = container.clientWidth || 700;
      const isMobile = clientW < 640;
      const targetH = isMobile ? 350 : 420;

      // Handle HiDPI / retina displays crispness
      const dpr = window.devicePixelRatio || 1;
      width = clientW;
      height = targetH;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      initNodePositions(width, height);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 640;

      // Subtle background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = isMobile ? 24 : 32;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Smooth position interpolation
      nodesRef.current.forEach((node) => {
        if (node.targetX !== undefined && node.targetY !== undefined) {
          node.x += (node.targetX - node.x) * 0.1;
          node.y += (node.targetY - node.y) * 0.1;
        }
      });

      const selectedSkillNorm = activeSkillName.toLowerCase();
      const activeId = hoveredNodeId || selectedSkillNorm;

      // Draw Edges
      edgesRef.current.forEach((edge) => {
        const sourceNode = nodesRef.current.find((n) => n.id === edge.source);
        const targetNode = nodesRef.current.find((n) => n.id === edge.target);
        if (!sourceNode || !targetNode) return;

        const isHighlighted =
          sourceNode.id === activeId ||
          targetNode.id === activeId ||
          (sourceNode.type === 'skill' && sourceNode.relatedIds.includes(activeId));

        const isFilteredOut =
          activeFilter !== 'ALL' &&
          sourceNode.category &&
          !sourceNode.category.toUpperCase().includes(activeFilter.replace('/', '').trim());

        if (isFilteredOut) return;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);

        // Gentle curve toward center
        const midX = (sourceNode.x + targetNode.x) / 2;
        const midY = (sourceNode.y + targetNode.y) / 2;
        ctx.quadraticCurveTo(midX, midY, targetNode.x, targetNode.y);

        if (isHighlighted) {
          ctx.strokeStyle = '#D4FF3F';
          ctx.lineWidth = isMobile ? 1.5 : 2;
          ctx.shadowColor = '#D4FF3F';
          ctx.shadowBlur = isMobile ? 6 : 10;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.restore();

        // Draw animated packet particle
        edge.particlePos = (edge.particlePos + edge.speed) % 1;
        const t = edge.particlePos;
        const px = (1 - t) * (1 - t) * sourceNode.x + 2 * (1 - t) * t * midX + t * t * targetNode.x;
        const py = (1 - t) * (1 - t) * sourceNode.y + 2 * (1 - t) * t * midY + t * t * targetNode.y;

        ctx.beginPath();
        ctx.arc(px, py, isHighlighted ? (isMobile ? 2 : 2.5) : 1.2, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? '#D4FF3F' : 'rgba(255, 255, 255, 0.25)';
        ctx.fill();
      });

      // Draw Nodes
      nodesRef.current.forEach((node) => {
        const isFilteredOut =
          activeFilter !== 'ALL' &&
          node.type === 'skill' &&
          node.category &&
          !node.category.toUpperCase().includes(activeFilter.replace('/', '').trim());

        if (isFilteredOut) return;

        const isHovered = hoveredNodeId === node.id;
        const isSelected = activeSkillName.toLowerCase() === node.id || node.relatedIds.includes(activeSkillName.toLowerCase());

        ctx.save();

        // Node Glow / Halo
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + (node.type === 'project' ? 6 : 4), 0, Math.PI * 2);
          ctx.fillStyle = node.type === 'project' ? 'rgba(212, 255, 63, 0.15)' : 'rgba(56, 189, 248, 0.15)';
          ctx.fill();
        }

        // Main Node Body
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.type === 'project' ? '#141414' : isSelected ? '#D4FF3F' : '#1A1A1A';
        ctx.fill();
        ctx.strokeStyle = isSelected || isHovered ? '#D4FF3F' : node.color;
        ctx.lineWidth = node.type === 'project' ? 2 : 1.5;
        ctx.stroke();

        // Inner pip for projects
        if (node.type === 'project') {
          ctx.beginPath();
          ctx.arc(node.x, node.y, isMobile ? 3 : 4, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();
        }

        // Label
        ctx.font = node.type === 'project'
          ? `bold ${isMobile ? 10 : 11}px "JetBrains Mono", monospace`
          : `${isMobile ? 8.5 : 10}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (node.type === 'project') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(node.label, node.x, node.y + node.radius + (isMobile ? 9 : 12));
        } else {
          ctx.fillStyle = isSelected ? '#D4FF3F' : 'rgba(255, 255, 255, 0.7)';
          ctx.fillText(node.label, node.x, node.y + node.radius + (isMobile ? 8 : 10));
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [activeSkillName, hoveredNodeId, activeFilter]);

  // Handle Canvas Mouse Interactivity
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const hit = nodesRef.current.find((n) => {
      const dx = n.x - mx;
      const dy = n.y - my;
      return Math.sqrt(dx * dx + dy * dy) < n.radius + 6;
    });

    if (hit) {
      setHoveredNodeId(hit.id);
      if (hit.type === 'skill') {
        onSelectSkill(hit.label);
      }
    } else {
      setHoveredNodeId(null);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const hit = nodesRef.current.find((n) => {
      const dx = n.x - mx;
      const dy = n.y - my;
      return Math.sqrt(dx * dx + dy * dy) < n.radius + 6;
    });

    if (hit) {
      if (hit.type === 'skill') {
        onSelectSkill(hit.label);
      } else if (hit.type === 'project') {
        const found = PROJECTS.find((p) => p.id === hit.id);
        if (found) onSelectProject(found);
      }
    }
  };

  return (
    <div ref={containerRef} className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
      {/* Top HUD Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-[#D4FF3F]" />
          <span className="text-white font-bold tracking-wider">LIVE TOPOLOGY NETWORK GRAPH</span>
          <span className="text-white/20">//</span>
          <span className="text-[#D4FF3F] text-[11px] animate-pulse">TELEMETRY ACTIVE</span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-lg border border-white/10 text-[10px]">
          {(['ALL', 'AI / ML', 'GRAPH DB', 'BACKEND'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              data-cursor="INSPECT"
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                activeFilter === filter
                  ? 'bg-[#D4FF3F] text-black font-bold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive 2D Graph Canvas */}
      <div className="relative cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onClick={handleCanvasClick}
          className="w-full h-[420px] block"
        />

        {/* Overlay Helper Badge */}
        <div className="absolute bottom-3 left-4 pointer-events-none text-[10px] font-mono text-white/40 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF3F]" />
          <span>Click/hover any node to trace Cypher paths & verified repo implementations</span>
        </div>
      </div>

      {/* Bottom Live Cypher Terminal Bar */}
      <div className="p-3 sm:px-5 bg-black/40 border-t border-white/10 flex items-center justify-between gap-3 font-mono text-xs text-white/60">
        <div className="flex items-center gap-2 truncate">
          <Terminal className="w-3.5 h-3.5 text-[#D4FF3F] shrink-0" />
          <span className="text-[#D4FF3F] font-bold text-[11px]">QUERY:</span>
          <code className="text-white/80 text-[11px] truncate">{liveQuery}</code>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[10px] text-white/40 shrink-0">
          <span>PACKETS: 48/s</span>
          <span className="text-white/20">•</span>
          <span>LATENCY: 4.2ms</span>
        </div>
      </div>
    </div>
  );
};

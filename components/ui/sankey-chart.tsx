"use client";
import React from 'react';

interface SankeyData {
  nodes: {
    id: string;
    name: string;
    color: string;
    percentage: number;
  }[];
  links: {
    source: string;
    target: string;
    value: number;
    color: string;
  }[];
}

interface SankeyChartProps {
  data: SankeyData;
  width?: number;
  height?: number;
}

export const SankeyChart: React.FC<SankeyChartProps> = ({ 
  data, 
  width = 800, 
  height = 500 
}) => {
  const nodeHeight = 60;
  const nodeWidth = 160;
  const linkWidth = 30;
  const spacing = 80;

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height} className="mx-auto">
        <defs>
          {/* Arrow markers */}
          {data.links.map((link, index) => (
            <marker
              key={`arrow-${index}`}
              id={`arrow-${link.source}-${link.target}`}
              viewBox="0 -5 10 10"
              refX="8"
              refY="0"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,-5L10,0L0,5" fill={link.color} />
            </marker>
          ))}
          
          {/* Gradient definitions */}
          {data.nodes.map((node, index) => (
            <linearGradient key={`gradient-${node.id}`} id={`gradient-${node.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={node.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={node.color} stopOpacity="0.6" />
            </linearGradient>
          ))}
          
          {/* Impact gradient */}
          <linearGradient id="gradient-impact" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Source nodes (left side) */}
        <g className="source-nodes">
          {data.nodes.map((node, index) => (
            <g key={`source-${node.id}`} className="node-group">
              <rect
                x="20"
                y={20 + index * (nodeHeight + spacing)}
                width={nodeWidth}
                height={nodeHeight}
                rx="12"
                ry="12"
                fill={`url(#gradient-${node.id})`}
                className="cursor-pointer transition-all duration-300 hover:scale-105"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
              />
              <text
                x={20 + nodeWidth / 2}
                y={20 + index * (nodeHeight + spacing) + nodeHeight / 2 - 8}
                textAnchor="middle"
                fill="white"
                fontSize="13"
                fontWeight="bold"
                className="pointer-events-none"
              >
                {node.name}
              </text>
              <text
                x={20 + nodeWidth / 2}
                y={20 + index * (nodeHeight + spacing) + nodeHeight / 2 + 12}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                className="pointer-events-none"
              >
                {node.percentage}%
              </text>
            </g>
          ))}
        </g>

        {/* Target node (right side) */}
        <g className="target-node">
          <rect
            x={width - nodeWidth - 20}
            y={height / 2 - nodeHeight / 2}
            width={nodeWidth}
            height={nodeHeight}
            rx="12"
            ry="12"
            fill="url(#gradient-impact)"
            className="cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
          />
          <text
            x={width - nodeWidth / 2 - 20}
            y={height / 2 - 8}
            textAnchor="middle"
            fill="white"
            fontSize="16"
            fontWeight="bold"
            className="pointer-events-none"
          >
            Impact
          </text>
          <text
            x={width - nodeWidth / 2 - 20}
            y={height / 2 + 12}
            textAnchor="middle"
            fill="white"
            fontSize="12"
            className="pointer-events-none"
          >
            100% Transparent
          </text>
        </g>

        {/* Links (flowing connections) */}
        <g className="links">
          {data.links.map((link, index) => {
            const sourceNode = data.nodes.find(n => n.id === link.source);
            if (!sourceNode) return null;

            const sourceIndex = data.nodes.findIndex(n => n.id === link.source);
            const x1 = 20 + nodeWidth + 20;
            const y1 = 20 + sourceIndex * (nodeHeight + spacing) + nodeHeight / 2;
            const x2 = width - nodeWidth - 20;
            const y2 = height / 2;
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;

            return (
              <g key={`link-${index}`}>
                {/* Curved path */}
                <path
                  d={`M ${x1} ${y1} Q ${midX} ${midY - 30} ${x2} ${y2}`}
                  stroke={link.color}
                  strokeWidth={Math.max(3, link.value * 0.8)}
                  fill="none"
                  opacity="0.7"
                  markerEnd={`url(#arrow-${link.source}-${link.target})`}
                  className="transition-all duration-300 hover:opacity-100"
                />
                
                {/* Value label */}
                <text
                  x={midX}
                  y={midY - 40}
                  textAnchor="middle"
                  fill={link.color}
                  fontSize="11"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {link.value}%
                </text>
              </g>
            );
          })}
        </g>

        {/* Center title */}
        <text
          x={width / 2}
          y="15"
          textAnchor="middle"
          fill="#374151"
          fontSize="18"
          fontWeight="bold"
          className="pointer-events-none"
        >
          Donation Flow
        </text>
      </svg>
    </div>
  );
};

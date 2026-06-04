import React from 'react';
import { Tool, CATEGORIES } from '../data/tools';

interface Props {
  tool: Tool;
}

export default function ToolCard({ tool }: Props) {
  const cat = CATEGORIES[tool.category];

  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <span style={styles.icon}>{tool.icon}</span>
        <div>
          <div style={styles.name}>{tool.name}</div>
          <span style={{ ...styles.badge, background: cat.bg, color: cat.color }}>
            {cat.label}
          </span>
        </div>
        {tool.free ? (
          <span style={styles.free}>Free</span>
        ) : (
          <span style={styles.paid}>Paid</span>
        )}
      </div>
      <p style={styles.desc}>{tool.description}</p>
      <div style={styles.tags}>
        {tool.tags.map(t => (
          <span key={t} style={styles.tag}>{t}</span>
        ))}
      </div>
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.launch}
      >
        Open Tool →
      </a>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: '#FEFAF4',
    border: '1px solid #E8D8C0',
    borderRadius: '12px',
    padding: '1.2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
    transition: 'box-shadow 0.15s',
  },
  top: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
  },
  icon: {
    fontSize: '1.8rem',
    lineHeight: 1,
    flexShrink: 0,
  },
  name: {
    fontWeight: 700,
    fontSize: '1rem',
    color: '#2D1A0A',
    marginBottom: '3px',
  },
  badge: {
    fontSize: '0.65rem',
    fontWeight: 600,
    padding: '2px 8px',
    borderRadius: '99px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  free: {
    marginLeft: 'auto',
    background: '#D4EDDA',
    color: '#155724',
    fontSize: '0.7rem',
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: '99px',
  },
  paid: {
    marginLeft: 'auto',
    background: '#FFF3CD',
    color: '#856404',
    fontSize: '0.7rem',
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: '99px',
  },
  desc: {
    fontSize: '0.85rem',
    color: '#4A3020',
    lineHeight: 1.5,
    margin: 0,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.3rem',
  },
  tag: {
    background: '#EFE4D6',
    color: '#7A4A20',
    fontSize: '0.7rem',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  launch: {
    display: 'inline-block',
    marginTop: '0.25rem',
    color: '#8B3A0A',
    fontWeight: 600,
    fontSize: '0.85rem',
    textDecoration: 'none',
  },
};

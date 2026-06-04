import React from 'react';
import { Project, STATUS_CONFIG } from '../data/projects';

interface Props {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  const statusCfg = STATUS_CONFIG[project.status];

  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>{project.title}</div>
          <div style={styles.type}>{project.type.toUpperCase()} · {project.tracks.length} track{project.tracks.length !== 1 ? 's' : ''}</div>
        </div>
        <span style={{ ...styles.status, background: statusCfg.bg, color: statusCfg.color }}>
          {statusCfg.label}
        </span>
      </div>
      {project.notes && <p style={styles.notes}>{project.notes}</p>}
      <div style={styles.tracks}>
        {project.tracks.map(t => {
          const ts = STATUS_CONFIG[t.status];
          return (
            <div key={t.id} style={styles.trackRow}>
              <span style={styles.trackDot(ts.color)} />
              <span style={styles.trackTitle}>{t.title}</span>
              {t.bpm && <span style={styles.meta}>{t.bpm} BPM</span>}
              {t.key && <span style={styles.meta}>Key of {t.key}</span>}
              <span style={{ ...styles.trackBadge, background: ts.bg, color: ts.color }}>{ts.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles: Record<string, any> = {
  card: {
    background: '#FEFAF4',
    border: '1px solid #E8D8C0',
    borderRadius: '12px',
    padding: '1.25rem',
    cursor: 'pointer',
    boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
    transition: 'box-shadow 0.15s',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  title: {
    fontWeight: 700,
    fontSize: '1.1rem',
    color: '#2D1A0A',
  },
  type: {
    fontSize: '0.7rem',
    color: '#9A7A5A',
    fontWeight: 600,
    letterSpacing: '0.06em',
    marginTop: '2px',
  },
  status: {
    fontSize: '0.7rem',
    fontWeight: 700,
    padding: '4px 12px',
    borderRadius: '99px',
    whiteSpace: 'nowrap',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  notes: {
    fontSize: '0.83rem',
    color: '#6A4A2A',
    margin: 0,
    lineHeight: 1.5,
    fontStyle: 'italic',
  },
  tracks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  trackRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.83rem',
  },
  trackDot: (color: string): React.CSSProperties => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: color,
    flexShrink: 0,
  }),
  trackTitle: {
    color: '#3A2010',
    fontWeight: 500,
    flex: 1,
  },
  meta: {
    color: '#9A7A5A',
    fontSize: '0.75rem',
  },
  trackBadge: {
    fontSize: '0.65rem',
    fontWeight: 600,
    padding: '1px 8px',
    borderRadius: '99px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    whiteSpace: 'nowrap',
  },
};

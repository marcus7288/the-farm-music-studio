import React from 'react';
import { Link } from 'react-router-dom';
import { DEMO_PROJECTS, STATUS_CONFIG } from '../data/projects';
import { TOOLS, CATEGORIES } from '../data/tools';

const QUICK_LINKS = [
  { icon: '🎼', label: 'Write a Song',       url: 'https://www.hooktheory.com/hookpad', tip: 'Hookpad' },
  { icon: '🎙️', label: 'Start Recording',    url: 'https://www.bandlab.com',            tip: 'BandLab' },
  { icon: '✨',  label: 'Master a Track',     url: 'https://www.landr.com',              tip: 'LANDR' },
  { icon: '🚀', label: 'Release Music',       url: 'https://distrokid.com',              tip: 'DistroKid' },
  { icon: '🎨', label: 'Design Artwork',      url: 'https://www.canva.com',              tip: 'Canva' },
  { icon: '📨', label: 'Submit to Playlists', url: 'https://www.submithub.com',          tip: 'SubmitHub' },
];

export default function Dashboard() {
  const activeProjects = DEMO_PROJECTS.filter(p => p.status !== 'released');
  const totalTracks    = DEMO_PROJECTS.reduce((sum, p) => sum + p.tracks.length, 0);
  const toolCount      = TOOLS.length;
  const freeToolCount  = TOOLS.filter(t => t.free).length;

  return (
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.hero}>
        <div className="hero-overlay">
          <div>
            <h1 className="hero-title" style={styles.heroTitle}>Welcome to The Farm</h1>
            <p style={styles.heroSub}>
              Bryan Lewis · Your AI-powered music studio for writing, recording, and releasing music.
            </p>
          </div>
          <div className="hero-decor" style={styles.heroDecor}>🌾🎸🌾</div>
        </div>
      </div>

      <div className="page-content">
        {/* Stats */}
        <div className="stats-grid">
          {[
            { label: 'Active Projects',    value: activeProjects.length, icon: '📁' },
            { label: 'Tracks in Progress', value: totalTracks,           icon: '🎵' },
            { label: 'Recommended Tools',  value: toolCount,             icon: '🛠️' },
            { label: 'Free Tools',         value: freeToolCount,         icon: '✅' },
          ].map(stat => (
            <div key={stat.label} style={styles.statCard}>
              <div style={styles.statIcon}>{stat.icon}</div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Launch */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Quick Launch</h2>
          <div className="quick-grid">
            {QUICK_LINKS.map(ql => (
              <a key={ql.label} href={ql.url} target="_blank" rel="noopener noreferrer" style={styles.quickCard}>
                <span style={styles.quickIcon}>{ql.icon}</span>
                <span style={styles.quickLabel}>{ql.label}</span>
                <span style={styles.quickTip}>{ql.tip}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Current Projects Snapshot */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Current Projects</h2>
            <Link to="/projects" style={styles.viewAll}>View All →</Link>
          </div>
          <div className="snap-grid">
            {DEMO_PROJECTS.map(project => {
              const cfg = STATUS_CONFIG[project.status];
              return (
                <div key={project.id} style={styles.snapCard}>
                  <div style={styles.snapTitle}>{project.title}</div>
                  <div style={styles.snapMeta}>
                    {project.type.toUpperCase()} · {project.tracks.length} tracks
                  </div>
                  <span style={{ ...styles.snapStatus, background: cfg.bg, color: cfg.color }}>
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Workflow Preview */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Production Workflow</h2>
            <Link to="/workflow" style={styles.viewAll}>Full Guide →</Link>
          </div>
          <div className="workflow-strip">
            {(['compose', 'record', 'mix', 'master', 'distribute', 'promote'] as const).map((stage, i) => (
              <React.Fragment key={stage}>
                <div style={styles.wfStep}>
                  <div style={{ ...styles.wfDot, background: CATEGORIES[stage].color }} />
                  <div style={styles.wfLabel}>{CATEGORIES[stage].label}</div>
                </div>
                {i < 5 && <div style={styles.wfArrow}>→</div>}
              </React.Fragment>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#FAF3E8' },
  hero: {
    background: 'linear-gradient(160deg, #3B1F0A 0%, #7A4A1A 50%, #5A3010 100%)',
    padding: '3rem 1.5rem',
    overflow: 'hidden',
  },
  heroTitle: {
    color: '#F5E6C8',
    fontWeight: 800,
    margin: 0,
    letterSpacing: '-0.02em',
  },
  heroSub: {
    color: '#C8A87A',
    fontSize: '1rem',
    marginTop: '0.5rem',
    maxWidth: '520px',
  },
  heroDecor: { fontSize: '3rem', opacity: 0.4 },
  statCard: {
    background: '#FEFAF4',
    border: '1px solid #E8D8C0',
    borderRadius: '12px',
    padding: '1.25rem',
    textAlign: 'center',
  },
  statIcon:  { fontSize: '1.5rem', marginBottom: '0.5rem' },
  statValue: { fontSize: '2rem', fontWeight: 800, color: '#3B1F0A' },
  statLabel: { fontSize: '0.78rem', color: '#9A7A5A', marginTop: '0.25rem', fontWeight: 500 },
  section:   { display: 'flex', flexDirection: 'column', gap: '1rem' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: '1.2rem', fontWeight: 700, color: '#3B1F0A', margin: 0 },
  viewAll: { color: '#8B3A0A', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' },
  quickCard: {
    background: '#FEFAF4',
    border: '1px solid #E8D8C0',
    borderRadius: '10px',
    padding: '1rem 1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
  },
  quickIcon:  { fontSize: '1.5rem' },
  quickLabel: { fontWeight: 600, color: '#3B1F0A', fontSize: '0.9rem', flex: 1 },
  quickTip:   { fontSize: '0.72rem', color: '#9A7A5A' },
  snapCard: {
    background: '#FEFAF4',
    border: '1px solid #E8D8C0',
    borderRadius: '10px',
    padding: '1rem',
  },
  snapTitle:  { fontWeight: 700, color: '#2D1A0A', fontSize: '0.95rem' },
  snapMeta:   { fontSize: '0.72rem', color: '#9A7A5A', marginTop: '3px', marginBottom: '8px' },
  snapStatus: {
    display: 'inline-block',
    fontSize: '0.65rem',
    fontWeight: 700,
    padding: '2px 10px',
    borderRadius: '99px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
  },
  wfStep:  { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' },
  wfDot:   { width: '14px', height: '14px', borderRadius: '50%' },
  wfLabel: { fontSize: '0.78rem', fontWeight: 600, color: '#4A3020', whiteSpace: 'nowrap' as const },
  wfArrow: { color: '#C8A87A', fontSize: '1.2rem', flexShrink: 0 },
};

import React, { useState } from 'react';
import { DEMO_PROJECTS, STATUS_CONFIG, Project, ProjectStatus } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const WORKFLOW_STAGES: { key: string; label: string }[] = [
  { key: 'idea',      label: 'Idea' },
  { key: 'writing',   label: 'Writing' },
  { key: 'recording', label: 'Recording' },
  { key: 'mixing',    label: 'Mixing' },
  { key: 'mastering', label: 'Mastering' },
  { key: 'released',  label: 'Released' },
];

export default function ProjectsPage() {
  const [projects, setProjects]     = useState<Project[]>(DEMO_PROJECTS);
  const [selected, setSelected]     = useState<Project | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTitle, setNewTitle]     = useState('');
  const [newType, setNewType]       = useState<'single' | 'ep' | 'album'>('single');

  const addProject = () => {
    if (!newTitle.trim()) return;
    const p: Project = {
      id: `p${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      status: 'idea',
      tracks: [],
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setProjects(prev => [p, ...prev]);
    setNewTitle('');
    setShowNewForm(false);
  };

  const advanceStatus = (projectId: string) => {
    const order: ProjectStatus[] = ['idea', 'writing', 'recording', 'mixing', 'mastering', 'ready', 'released'];
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      const idx = order.indexOf(p.status);
      return idx < order.length - 1 ? { ...p, status: order[idx + 1] } : p;
    }));
    setSelected(prev => {
      if (!prev || prev.id !== projectId) return prev;
      const order: ProjectStatus[] = ['idea', 'writing', 'recording', 'mixing', 'mastering', 'ready', 'released'];
      const idx = order.indexOf(prev.status);
      return idx < order.length - 1 ? { ...prev, status: order[idx + 1] } : prev;
    });
  };

  const byStatus = (status: ProjectStatus) => projects.filter(p => p.status === status);

  return (
    <div style={styles.page}>
      <div className="page-content" style={{ maxWidth: '1200px' }}>
        <div style={styles.titleRow}>
          <div>
            <h1 style={styles.title}>Projects</h1>
            <p style={styles.subtitle}>Track every song and release from idea to release.</p>
          </div>
          <button onClick={() => setShowNewForm(v => !v)} style={styles.newBtn}>
            + New Project
          </button>
        </div>

        {showNewForm && (
          <div className="new-form" style={styles.newForm}>
            <input
              type="text"
              placeholder="Project title (e.g. 'Summer Single')"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              style={styles.input}
              onKeyDown={e => e.key === 'Enter' && addProject()}
              autoFocus
            />
            <select value={newType} onChange={e => setNewType(e.target.value as any)} style={styles.select}>
              <option value="single">Single</option>
              <option value="ep">EP</option>
              <option value="album">Album</option>
            </select>
            <button onClick={addProject} style={styles.createBtn}>Create</button>
            <button onClick={() => setShowNewForm(false)} style={styles.cancelBtn}>Cancel</button>
          </div>
        )}

        {/* Kanban Board */}
        <div className="kanban-board">
          {WORKFLOW_STAGES.map(stage => (
            <div key={stage.key} className="kanban-col" style={styles.kanbanCol}>
              <div style={styles.colHeader}>
                <span style={styles.colLabel}>{STATUS_CONFIG[stage.key as ProjectStatus].label}</span>
                <span style={styles.colCount}>{byStatus(stage.key as ProjectStatus).length}</span>
              </div>
              <div style={styles.colCards}>
                {byStatus(stage.key as ProjectStatus).map(p => (
                  <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
                ))}
                {byStatus(stage.key as ProjectStatus).length === 0 && (
                  <div style={styles.emptyCol}>No projects here</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Detail Slide-over */}
        {selected && (
          <div style={styles.detailOverlay} onClick={() => setSelected(null)}>
            <div style={styles.detailPanel} onClick={e => e.stopPropagation()}>
              <button style={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>
              <div style={styles.detailTitle}>{selected.title}</div>
              <div style={styles.detailMeta}>{selected.type.toUpperCase()} · Created {selected.createdAt}</div>
              {selected.notes && <p style={styles.detailNotes}>{selected.notes}</p>}

              <div style={styles.detailStatusRow}>
                <div>
                  <div style={styles.detailSectionLabel}>Status</div>
                  <span style={{
                    ...styles.detailStatus,
                    background: STATUS_CONFIG[selected.status].bg,
                    color: STATUS_CONFIG[selected.status].color,
                  }}>
                    {STATUS_CONFIG[selected.status].label}
                  </span>
                </div>
                {selected.status !== 'released' && (
                  <button style={styles.advanceBtn} onClick={() => advanceStatus(selected.id)}>
                    Advance →
                  </button>
                )}
              </div>

              <div>
                <div style={styles.detailSectionLabel}>Tracks ({selected.tracks.length})</div>
                {selected.tracks.length === 0 && <div style={styles.emptyCol}>No tracks yet</div>}
                {selected.tracks.map(t => (
                  <div key={t.id} style={styles.detailTrack}>
                    <span style={styles.trackName}>{t.title}</span>
                    {t.bpm && <span style={styles.trackMeta}>{t.bpm} BPM</span>}
                    {t.key  && <span style={styles.trackMeta}>Key of {t.key}</span>}
                    <span style={{
                      ...styles.trackBadge,
                      background: STATUS_CONFIG[t.status].bg,
                      color: STATUS_CONFIG[t.status].color,
                    }}>
                      {STATUS_CONFIG[t.status].label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page:      { background: '#FAF3E8', minHeight: '100vh' },
  titleRow:  { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' as const },
  title:     { fontSize: '1.8rem', fontWeight: 800, color: '#3B1F0A', margin: '0 0 0.25rem' },
  subtitle:  { color: '#7A5A3A', margin: 0, fontSize: '0.95rem' },
  newBtn:    { background: '#3B1F0A', color: '#F5E6C8', border: 'none', borderRadius: '8px', padding: '0.6rem 1.25rem', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', whiteSpace: 'nowrap' as const },
  newForm:   { background: '#FEFAF4', border: '1px solid #E8D8C0', borderRadius: '10px', padding: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' as const },
  input:     { border: '1px solid #DFC9A8', borderRadius: '8px', padding: '0.6rem 1rem', fontSize: '0.9rem', flex: '1 1 200px', background: '#fff', outline: 'none' },
  select:    { border: '1px solid #DFC9A8', borderRadius: '8px', padding: '0.6rem 1rem', fontSize: '0.9rem', background: '#fff', cursor: 'pointer' },
  createBtn: { background: '#4A7C59', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.6rem 1.25rem', fontWeight: 700, cursor: 'pointer' },
  cancelBtn: { background: 'transparent', color: '#9A7A5A', border: '1px solid #DFC9A8', borderRadius: '8px', padding: '0.6rem 1rem', cursor: 'pointer' },
  kanbanCol: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  colHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' },
  colLabel:  { fontSize: '0.72rem', fontWeight: 700, color: '#7A5A3A', textTransform: 'uppercase' as const, letterSpacing: '0.06em' },
  colCount:  { background: '#EFE4D6', color: '#7A4A20', fontSize: '0.68rem', fontWeight: 700, padding: '1px 7px', borderRadius: '99px' },
  colCards:  { display: 'flex', flexDirection: 'column', gap: '0.5rem', minHeight: '60px' },
  emptyCol:  { fontSize: '0.75rem', color: '#C8A87A', fontStyle: 'italic', padding: '0.5rem 0' },
  detailOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'flex-end', zIndex: 200 },
  detailPanel:   { background: '#FEFAF4', width: '420px', maxWidth: '100%', padding: '2rem', overflowY: 'auto' as const, position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  closeBtn:      { position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#7A5A3A' },
  detailTitle:   { fontSize: '1.4rem', fontWeight: 800, color: '#2D1A0A' },
  detailMeta:    { fontSize: '0.75rem', color: '#9A7A5A', marginTop: '-0.75rem' },
  detailNotes:   { color: '#5A3A1A', fontSize: '0.88rem', fontStyle: 'italic', margin: 0 },
  detailSectionLabel: { fontSize: '0.7rem', fontWeight: 700, color: '#9A7A5A', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '0.4rem' },
  detailStatusRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' as const, gap: '0.75rem' },
  detailStatus:    { display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, padding: '4px 14px', borderRadius: '99px', textTransform: 'uppercase' as const, letterSpacing: '0.04em' },
  advanceBtn:      { background: '#3B1F0A', color: '#F5E6C8', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' },
  detailTrack:     { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0', borderBottom: '1px solid #EFE4D6', fontSize: '0.85rem', flexWrap: 'wrap' as const },
  trackName:       { flex: 1, fontWeight: 600, color: '#3A2010', minWidth: '100px' },
  trackMeta:       { color: '#9A7A5A', fontSize: '0.75rem' },
  trackBadge:      { fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', textTransform: 'uppercase' as const, letterSpacing: '0.04em', whiteSpace: 'nowrap' as const },
};

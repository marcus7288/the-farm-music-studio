import React, { useState } from 'react';
import { TOOLS, CATEGORIES } from '../data/tools';
import ToolCard from '../components/ToolCard';

const ALL = 'all';

export default function ToolsPage() {
  const [filter, setFilter] = useState<string>(ALL);
  const [freeOnly, setFreeOnly] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = TOOLS.filter(t => {
    if (filter !== ALL && t.category !== filter) return false;
    if (freeOnly && !t.free) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.tags.join(' ').toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={styles.page}>
      <div style={styles.content}>
        <div style={styles.titleBlock}>
          <h1 style={styles.title}>Tool Library</h1>
          <p style={styles.subtitle}>Recommended online tools for every stage of Bryan's music production workflow.</p>
        </div>

        {/* Filters */}
        <div style={styles.filterBar}>
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <div style={styles.catButtons}>
            <button
              onClick={() => setFilter(ALL)}
              style={{ ...styles.catBtn, ...(filter === ALL ? styles.catBtnActive : {}) }}
            >
              All ({TOOLS.length})
            </button>
            {Object.entries(CATEGORIES).map(([key, cat]) => {
              const count = TOOLS.filter(t => t.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  style={{
                    ...styles.catBtn,
                    ...(filter === key ? { background: cat.color, color: '#fff', borderColor: cat.color } : {}),
                  }}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>
          <label style={styles.freeToggle}>
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={e => setFreeOnly(e.target.checked)}
              style={{ marginRight: '0.4rem' }}
            />
            Free only
          </label>
        </div>

        <div style={styles.resultCount}>{filtered.length} tool{filtered.length !== 1 ? 's' : ''}</div>

        <div style={styles.grid}>
          {filtered.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
          {filtered.length === 0 && (
            <div style={styles.empty}>No tools match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { background: '#FAF3E8', minHeight: '100vh' },
  content: { maxWidth: '1000px', margin: '0 auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  titleBlock: {},
  title: { fontSize: '1.8rem', fontWeight: 800, color: '#3B1F0A', margin: '0 0 0.25rem' },
  subtitle: { color: '#7A5A3A', margin: 0, fontSize: '0.95rem' },
  filterBar: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  searchInput: {
    border: '1px solid #DFC9A8',
    borderRadius: '8px',
    padding: '0.6rem 1rem',
    fontSize: '0.9rem',
    background: '#FEFAF4',
    color: '#3B1F0A',
    outline: 'none',
    width: '280px',
  },
  catButtons: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap' as const },
  catBtn: {
    border: '1px solid #DFC9A8',
    borderRadius: '99px',
    padding: '0.35rem 0.9rem',
    fontSize: '0.78rem',
    fontWeight: 600,
    cursor: 'pointer',
    background: '#F5EAD8',
    color: '#6A4A2A',
    transition: 'all 0.15s',
  },
  catBtnActive: {
    background: '#3B1F0A',
    color: '#F5E6C8',
    borderColor: '#3B1F0A',
  },
  freeToggle: { fontSize: '0.85rem', color: '#6A4A2A', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center' },
  resultCount: { fontSize: '0.8rem', color: '#9A7A5A', fontWeight: 500 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
  },
  empty: { color: '#9A7A5A', fontSize: '0.9rem', gridColumn: '1/-1' },
};

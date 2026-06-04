import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV = [
  { path: '/',           label: 'Studio' },
  { path: '/workflow',   label: 'Workflow' },
  { path: '/tools',      label: 'Tools' },
  { path: '/projects',   label: 'Projects' },
];

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header style={styles.header}>
      <div style={styles.logoArea}>
        <span style={styles.barnIcon}>🌾</span>
        <div>
          <div style={styles.studioName}>The Farm</div>
          <div style={styles.studioSub}>Music Studio · Bryan Lewis</div>
        </div>
      </div>
      <nav style={styles.nav}>
        {NAV.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            style={{
              ...styles.link,
              ...(pathname === path ? styles.activeLink : {}),
            }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    background: 'linear-gradient(135deg, #3B1F0A 0%, #6B3A1F 100%)',
    color: '#F5E6C8',
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '72px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  barnIcon: {
    fontSize: '2rem',
    lineHeight: 1,
  },
  studioName: {
    fontSize: '1.4rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    color: '#F5E6C8',
    lineHeight: 1.1,
  },
  studioSub: {
    fontSize: '0.7rem',
    color: '#C8A87A',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  nav: {
    display: 'flex',
    gap: '0.25rem',
  },
  link: {
    color: '#C8A87A',
    textDecoration: 'none',
    padding: '0.4rem 1rem',
    borderRadius: '6px',
    fontWeight: 500,
    fontSize: '0.9rem',
    transition: 'all 0.15s',
  },
  activeLink: {
    background: 'rgba(245,230,200,0.15)',
    color: '#F5E6C8',
  },
};

import React, { useState } from 'react';
import { TOOLS, CATEGORIES, WORKFLOW_STAGES } from '../data/tools';
import ToolCard from '../components/ToolCard';

export default function WorkflowPage() {
  const [activeStage, setActiveStage] = useState<string>('compose');
  const stageCat = activeStage as keyof typeof CATEGORIES;
  const stageTools = TOOLS.filter(t => t.category === activeStage);

  const STAGE_TIPS: Record<string, { heading: string; body: string; steps: string[] }> = {
    compose: {
      heading: 'Writing Your Song',
      body: 'Start with a chord progression or melody idea. Use Hookpad to experiment with theory-guided progressions, then flesh out lyrics and notation.',
      steps: [
        'Hum or record a voice memo of your initial idea',
        'Build chord progressions in Hookpad',
        'Write lyrics using a rhyme/syllable tool',
        'Notate the full chart in Noteflight for bandmates',
      ],
    },
    record: {
      heading: 'Capturing Your Performance',
      body: 'Record vocals, guitar, and instruments. BandLab gives you a free cloud DAW right in the browser — no software download needed.',
      steps: [
        'Set up your microphone and interface',
        'Record a scratch track (click/guide track)',
        'Overdub instruments one at a time',
        'Capture multiple takes and comp the best',
      ],
    },
    mix: {
      heading: 'Mixing Your Tracks',
      body: 'Balance levels, add EQ and compression, and shape the sound of each instrument so everything sits together.',
      steps: [
        'Set a rough level balance (no FX)',
        'EQ each track to carve its frequency space',
        'Add compression for dynamics control',
        'Apply reverb/delay for space and depth',
        'Automate volume and panning for movement',
      ],
    },
    master: {
      heading: 'Mastering for Release',
      body: 'Mastering makes your song loud and competitive across all playback systems. LANDR or CloudBounce handle this in minutes with AI.',
      steps: [
        'Export your mix as a 24-bit WAV (no limiting)',
        'Upload to LANDR or CloudBounce',
        'Choose a mastering style (warm, balanced, etc.)',
        'Download and compare against reference tracks',
        'Approve the master when it sounds right',
      ],
    },
    distribute: {
      heading: 'Releasing Your Music',
      body: 'DistroKid is the fastest and most affordable way to get on Spotify, Apple Music, and 150+ platforms. Bandcamp is perfect for direct fan sales.',
      steps: [
        'Prepare metadata: title, artist, genre, ISRC',
        'Design album artwork (3000×3000 px, JPEG)',
        'Upload WAV master + artwork to DistroKid',
        'Set a release date (at least 1–2 weeks out)',
        'Claim your Spotify for Artists profile',
        'Add music to Bandcamp for direct sales',
      ],
    },
    collaborate: {
      heading: 'Working with Others',
      body: 'Share stems and sessions in the cloud. Use Google Drive for large audio files and Notion to keep song notes and to-dos organized.',
      steps: [
        'Store stems and mixes in a shared Google Drive folder',
        'Use Splice for co-producing DAW sessions',
        'Keep song status and notes in a Notion page',
        'Schedule sessions with a shared calendar',
      ],
    },
    promote: {
      heading: 'Promoting Your Release',
      body: 'Pitch your music to playlist curators and blogs before release day. Design strong visuals to back the launch.',
      steps: [
        'Create artwork and social assets in Canva',
        'Submit to Spotify editorial at least 7 days before release via Spotify for Artists',
        'Pitch to independent curators via SubmitHub',
        'Build a Linktree with all listening links',
        'Post consistently on social media leading up to release',
      ],
    },
  };

  const tip = STAGE_TIPS[activeStage];

  return (
    <div style={styles.page}>
      <div style={styles.content}>
        <div style={styles.titleBlock}>
          <h1 style={styles.title}>Production Workflow</h1>
          <p style={styles.subtitle}>Bryan's step-by-step guide from idea to release.</p>
        </div>

        {/* Stage Tabs */}
        <div style={styles.tabs}>
          {WORKFLOW_STAGES.map(stage => {
            const cat = CATEGORIES[stage.key as keyof typeof CATEGORIES];
            const isActive = activeStage === stage.key;
            return (
              <button
                key={stage.key}
                onClick={() => setActiveStage(stage.key)}
                style={{
                  ...styles.tab,
                  background: isActive ? cat.color : '#F5EAD8',
                  color: isActive ? '#fff' : '#6A4A2A',
                  borderColor: isActive ? cat.color : '#E8D0B0',
                }}
              >
                <span style={styles.tabStep}>{stage.step}</span>
                {stage.label}
              </button>
            );
          })}
        </div>

        {/* Stage Detail */}
        <div style={styles.stagePanel}>
          <div style={{ ...styles.stagePanelBar, background: CATEGORIES[stageCat].color }} />
          <div style={styles.stagePanelContent}>
            <h2 style={styles.stageTitle}>{tip.heading}</h2>
            <p style={styles.stageBody}>{tip.body}</p>
            <div style={styles.stepsGrid}>
              <div>
                <div style={styles.stepsHeading}>Steps</div>
                <ol style={styles.stepsList}>
                  {tip.steps.map((s, i) => (
                    <li key={i} style={styles.step}>{s}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Tools for Stage */}
        <div>
          <h2 style={styles.toolsHeading}>
            Tools for {CATEGORIES[stageCat].label}
            <span style={styles.toolsCount}>{stageTools.length} tools</span>
          </h2>
          <div style={styles.toolsGrid}>
            {stageTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { background: '#FAF3E8', minHeight: '100vh' },
  content: { maxWidth: '1000px', margin: '0 auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' },
  titleBlock: {},
  title: { fontSize: '1.8rem', fontWeight: 800, color: '#3B1F0A', margin: '0 0 0.25rem' },
  subtitle: { color: '#7A5A3A', margin: 0, fontSize: '0.95rem' },
  tabs: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' as const },
  tab: {
    border: '1px solid',
    borderRadius: '8px',
    padding: '0.5rem 1.1rem',
    fontWeight: 600,
    fontSize: '0.85rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    transition: 'all 0.15s',
  },
  tabStep: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    fontWeight: 800,
  },
  stagePanel: {
    background: '#FEFAF4',
    border: '1px solid #E8D8C0',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
  },
  stagePanelBar: { width: '6px', flexShrink: 0 },
  stagePanelContent: { padding: '1.5rem', flex: 1 },
  stageTitle: { fontSize: '1.2rem', fontWeight: 700, color: '#2D1A0A', margin: '0 0 0.5rem' },
  stageBody: { color: '#5A3A1A', fontSize: '0.9rem', margin: '0 0 1rem', lineHeight: 1.6 },
  stepsGrid: {},
  stepsHeading: { fontSize: '0.75rem', fontWeight: 700, color: '#9A7A5A', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '0.5rem' },
  stepsList: { paddingLeft: '1.25rem', margin: 0 },
  step: { color: '#4A3020', fontSize: '0.88rem', marginBottom: '0.4rem', lineHeight: 1.5 },
  toolsHeading: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#3B1F0A',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    margin: '0 0 1rem',
  },
  toolsCount: {
    fontSize: '0.72rem',
    fontWeight: 600,
    background: '#EFE4D6',
    color: '#7A4A20',
    padding: '2px 10px',
    borderRadius: '99px',
  },
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
  },
};

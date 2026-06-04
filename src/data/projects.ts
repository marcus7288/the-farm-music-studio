export type ProjectStatus = 'idea' | 'writing' | 'recording' | 'mixing' | 'mastering' | 'ready' | 'released';

export interface Track {
  id: string;
  title: string;
  status: ProjectStatus;
  bpm?: number;
  key?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  type: 'single' | 'ep' | 'album';
  status: ProjectStatus;
  tracks: Track[];
  notes?: string;
  createdAt: string;
}

export const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; bg: string }> = {
  idea:      { label: 'Idea',      color: '#9E6B2F', bg: '#FDF3E3' },
  writing:   { label: 'Writing',   color: '#2F7A4A', bg: '#E6F7EE' },
  recording: { label: 'Recording', color: '#1A5FA0', bg: '#E3EEF9' },
  mixing:    { label: 'Mixing',    color: '#6B2FA0', bg: '#F3E6FA' },
  mastering: { label: 'Mastering', color: '#A04E2F', bg: '#FAF0E6' },
  ready:     { label: 'Ready',     color: '#2F7A7A', bg: '#E6F7F7' },
  released:  { label: 'Released',  color: '#4A7A2F', bg: '#EAF5E6' },
};

export const DEMO_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Harvest Moon Sessions',
    type: 'ep',
    status: 'recording',
    notes: 'Acoustic EP recorded in the barn. Fiddle, guitar, and vocals.',
    createdAt: '2026-04-01',
    tracks: [
      { id: 't1', title: 'Old Red Barn', status: 'mixing', bpm: 88, key: 'G', createdAt: '2026-04-01', updatedAt: '2026-05-15' },
      { id: 't2', title: 'Creek Side', status: 'recording', bpm: 72, key: 'D', createdAt: '2026-04-10', updatedAt: '2026-06-01' },
      { id: 't3', title: 'Porch Light', status: 'writing', bpm: 96, key: 'C', createdAt: '2026-05-01', updatedAt: '2026-06-04' },
    ],
  },
  {
    id: 'p2',
    title: 'Wide Open Fields',
    type: 'single',
    status: 'mastering',
    notes: 'Country rock single. Ready for LANDR mastering.',
    createdAt: '2026-03-15',
    tracks: [
      { id: 't4', title: 'Wide Open Fields', status: 'mastering', bpm: 104, key: 'A', createdAt: '2026-03-15', updatedAt: '2026-06-02' },
    ],
  },
  {
    id: 'p3',
    title: 'Summer Ideas',
    type: 'album',
    status: 'idea',
    notes: 'Rough ideas for a summer album. Jot down voice memos.',
    createdAt: '2026-06-01',
    tracks: [
      { id: 't5', title: 'Firefly Night', status: 'idea', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
      { id: 't6', title: 'Hay Ride', status: 'idea', createdAt: '2026-06-02', updatedAt: '2026-06-02' },
    ],
  },
];

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import WorkflowPage from './pages/WorkflowPage';
import ToolsPage from './pages/ToolsPage';
import ProjectsPage from './pages/ProjectsPage';

export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", minHeight: '100vh', background: '#FAF3E8' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workflow" element={<WorkflowPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

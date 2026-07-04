import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GeneratePage from './pages/GeneratePage';
import ProposalPage from './pages/ProposalPage';

/** Scrolls to the top of the page on route change (anchors excepted). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/proposal" element={<ProposalPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

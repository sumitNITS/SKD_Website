import { Routes, Route } from 'react-router-dom';
import { usePageTracking } from './components/Analytics';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import NotFound from './components/NotFound';

function App() {
  usePageTracking();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

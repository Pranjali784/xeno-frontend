import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CampaignCreationPage from './pages/CampaignCreationPage';
import CampaignHistoryPage from './pages/CampaignHistoryPage';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Create Campaign</Link>
            </li>
            <li>
              <Link to="/history">Campaign History</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<CampaignCreationPage />} />
          <Route path="/history" element={<CampaignHistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

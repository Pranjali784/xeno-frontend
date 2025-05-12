import React, { useState } from 'react';
import RuleBuilder from '../components/RuleBuilder';
import type { RuleGroup } from '../types'; // Changed to type-only import
import '../styles/CampaignCreationPage.css'; // We'll create this for page-specific styles

const CampaignCreationPage: React.FC = () => {
  const [audienceLogic, setAudienceLogic] = useState<RuleGroup>({
    id: 'root',
    combinator: 'AND',
    rules: [],
  });
  const [campaignName, setCampaignName] = useState('');

  const handleLogicChange = (logic: RuleGroup) => {
    setAudienceLogic(logic);
    // Here you would typically call a service to preview audience size
    console.log('Current Logic:', JSON.stringify(logic, null, 2));
    // Placeholder for audience preview
    // fetchAudienceSize(logic).then(size => setAudienceSize(size));
  };

  const handleSaveSegment = () => {
    if (!campaignName.trim()) {
      alert('Please enter a campaign name.');
      return;
    }
    // In a real app, you'd save the campaignName and audienceLogic to a backend
    console.log('Saving Segment for campaign:', campaignName);
    console.log('Audience Logic:', JSON.stringify(audienceLogic, null, 2));
    alert(`Campaign "${campaignName}" segment definition saved! (Check console for details)\nRedirecting to history page...`);
    // Redirect to history page - using window.location for simplicity here
    // In a real SPA, you'd use react-router's navigation methods
    window.location.href = '/history';
  };

  return (
    <div className="campaign-creation-page">
      <h1>Create New Campaign</h1>

      <div className="campaign-name-section">
        <label htmlFor="campaignName">Campaign Name:</label>
        <input
          type="text"
          id="campaignName"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          placeholder="e.g., Q3 Product Launch Promo"
        />
      </div>

      <RuleBuilder initialLogic={audienceLogic} onLogicChange={handleLogicChange} />

      <div className="audience-preview-section">
        <h2>Audience Preview</h2>
        <p>Estimated Audience Size: <strong> {/* Placeholder */}1,234 users</strong></p>
        {/* This would be updated based on the rules */}
      </div>

      <button onClick={handleSaveSegment} className="save-segment-button">
        Save Segment & View History
      </button>
    </div>
  );
};

export default CampaignCreationPage;

import React, { useState, useEffect } from 'react';
import type { Campaign } from '../types'; // Use type-only import
import '../styles/CampaignHistoryPage.css';

// Mock data for campaigns - in a real app, this would come from an API
const MOCK_CAMPAIGNS: Campaign[] = [
	{
		id: 'campaign1',
		name: 'Q2 Summer Sale',
		creationDate: '2025-05-10T10:00:00Z',
		audienceLogic: {
			id: 'root',
			combinator: 'AND',
			rules: [{ id: 'r1', field: 'spend', operator: '>', value: 500 }],
		},
		status: 'Sent',
		stats: {
			audienceSize: 1250,
			sent: 1245,
			failed: 5,
		},
	},
	{
		id: 'campaign2',
		name: 'New Product Launch Teaser',
		creationDate: '2025-04-22T14:30:00Z',
		audienceLogic: {
			id: 'root',
			combinator: 'OR',
			rules: [{ id: 'r1', field: 'visits', operator: '>', value: 10 }],
		},
		status: 'Sent',
		stats: {
			audienceSize: 8500,
			sent: 8490,
			failed: 10,
		},
	},
	{
		id: 'campaign3',
		name: 'Inactive User Re-engagement',
		creationDate: '2025-05-12T09:15:00Z', // Most recent based on current date
		audienceLogic: {
			id: 'root',
			combinator: 'AND',
			rules: [
				{
					id: 'r1',
					field: 'last_active_date',
					operator: 'inactive_for_days',
					value: 90,
				},
			],
		},
		status: 'Sending',
		stats: {
			audienceSize: 500,
			sent: 150, // Partially sent
			failed: 2,
		},
	},
	{
		id: 'campaign4',
		name: 'Early Bird Special - Webinar',
		creationDate: '2025-03-15T11:00:00Z',
		audienceLogic: {
			id: 'root',
			combinator: 'AND',
			rules: [
				{
					id: 'r1',
					field: 'segment_membership',
					operator: 'is_member_of',
					value: 'Prospects',
				},
			],
		}, // Example field
		status: 'Failed',
		stats: {
			audienceSize: 200,
			sent: 0,
			failed: 200, // Entire campaign failed
		},
	},
];

const CampaignHistoryPage: React.FC = () => {
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);

	useEffect(() => {
		// Simulate fetching data and sorting
		const sortedCampaigns = [...MOCK_CAMPAIGNS].sort(
			(a, b) =>
				new Date(b.creationDate).getTime() -
				new Date(a.creationDate).getTime()
		);
		setCampaigns(sortedCampaigns);
	}, []);

	return (
		<div className="campaign-history-page">
			<h1>Campaign History</h1>
			{campaigns.length === 0 ? (
				<p className="no-campaigns-message">
					No campaigns found. Create your first one!
				</p>
			) : (
				<table className="campaign-table">
					<thead>
						<tr>
							<th>Campaign Name</th>
							<th>Creation Date</th>
							<th>Status</th>
							<th>Audience Size</th>
							<th>Sent</th>
							<th>Failed</th>
						</tr>
					</thead>
					<tbody>
						{campaigns.map((campaign) => (
							<tr
								key={campaign.id}
								className={`status-row-${campaign.status.toLowerCase()}`}
							>
								<td data-label="Campaign Name">{campaign.name}</td>
								<td data-label="Creation Date">
									{new Date(campaign.creationDate).toLocaleDateString()}
								</td>
								<td data-label="Status">
									<span
										className={`status-badge status-${campaign.status.toLowerCase()}`}
									>
										{campaign.status}
									</span>
								</td>
								<td data-label="Audience Size">
									{campaign.stats.audienceSize.toLocaleString()}
								</td>
								<td data-label="Sent">
									{campaign.stats.sent.toLocaleString()}
								</td>
								<td data-label="Failed">
									{campaign.stats.failed.toLocaleString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default CampaignHistoryPage;

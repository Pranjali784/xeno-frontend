export interface Rule {
  id: string;
  field: string; // e.g., 'spend', 'visits', 'last_active_date'
  operator: string; // e.g., '>', '<', '==', 'inactive_for_days'
  value: any;
}

export interface RuleGroup {
  id: string;
  combinator: 'AND' | 'OR'; // How rules/groups within this group are combined
  rules: (Rule | RuleGroup)[];
}

// Example of a more complex rule structure:
// const exampleRule: RuleGroup = {
//   id: 'root',
//   combinator: 'AND',
//   rules: [
//     { id: 'r1', field: 'spend', operator: '>', value: 10000 },
//     {
//       id: 'g1',
//       combinator: 'OR',
//       rules: [
//         { id: 'r2', field: 'visits', operator: '<', value: 3 },
//         { id: 'r3', field: 'last_active_date', operator: 'inactive_for_days', value: 90 },
//       ],
//     },
//   ],
// };

export interface Campaign {
  id: string;
  name: string;
  creationDate: string; // ISO date string for easy sorting
  audienceLogic: RuleGroup;
  status: 'Sent' | 'Draft' | 'Failed' | 'Sending'; // Example statuses
  stats: {
    audienceSize: number;
    sent: number;
    failed: number;
    // Potentially add open rates, click rates etc. later
  };
}

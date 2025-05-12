import React from 'react';
import type { Rule } from '../types'; // Changed to type-only import

interface RuleProps {
  rule: Rule;
  onChange: (updatedRule: Rule) => void;
  onRemove: () => void;
  path: (string | number)[]; // For context, if needed later
}

// Define available fields and their compatible operators/input types
const FIELD_CONFIG: Record<string, { label: string; operators: string[]; inputType?: string; options?: string[] }> = {
  spend: { label: 'Spend', operators: ['>', '<', '==', '!='], inputType: 'number' },
  visits: { label: 'Visits', operators: ['>', '<', '==', '!='], inputType: 'number' },
  last_active_date: { label: 'Last Active', operators: ['inactive_for_days', 'active_in_last_days'], inputType: 'number' },
  // Add more fields as needed, e.g., for tags, location, etc.
  // Example with options:
  // segment_membership: { 
  //   label: 'Segment Membership', 
  //   operators: ['is_member_of', 'is_not_member_of'], 
  //   options: ['VIP Customers', 'New Subscribers', 'Churn Risks'] 
  // },
};

const OPERATOR_LABELS: Record<string, string> = {
  '>': 'Greater than',
  '<': 'Less than',
  '==': 'Equal to',
  '!=': 'Not equal to',
  inactive_for_days: 'Inactive for (days)',
  active_in_last_days: 'Active in last (days)',
  // is_member_of: 'Is member of',
  // is_not_member_of: 'Is not member of',
};

const RuleComponent: React.FC<RuleProps> = ({ rule, onChange, onRemove }) => {
  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newField = e.target.value;
    // Reset operator and value when field changes, as they might not be compatible
    const newOperator = FIELD_CONFIG[newField]?.operators[0] || '';
    let newValue: any = '';
    if (FIELD_CONFIG[newField]?.inputType === 'number') newValue = 0;
    // if (FIELD_CONFIG[newField]?.options) newValue = FIELD_CONFIG[newField]?.options?.[0] || '';

    onChange({ ...rule, field: newField, operator: newOperator, value: newValue });
  };

  const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...rule, operator: e.target.value });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const inputType = FIELD_CONFIG[rule.field]?.inputType;
    let newValue = e.target.value;
    if (inputType === 'number') {
      newValue = e.target.value === '' ? '' : parseFloat(e.target.value);
    }
    onChange({ ...rule, value: newValue });
  };

  const currentFieldConfig = FIELD_CONFIG[rule.field];

  return (
    <div className="rule-component">
      <select value={rule.field} onChange={handleFieldChange}>
        {Object.keys(FIELD_CONFIG).map(fieldKey => (
          <option key={fieldKey} value={fieldKey}>{FIELD_CONFIG[fieldKey].label}</option>
        ))}
      </select>

      {currentFieldConfig && (
        <select value={rule.operator} onChange={handleOperatorChange}>
          {currentFieldConfig.operators.map(op => (
            <option key={op} value={op}>{OPERATOR_LABELS[op] || op}</option>
          ))}
        </select>
      )}

      {currentFieldConfig && currentFieldConfig.inputType && !currentFieldConfig.options && (
        <input
          type={currentFieldConfig.inputType}
          value={rule.value}
          onChange={handleValueChange}
          placeholder={currentFieldConfig.inputType === 'number' ? '0' : 'Enter value'}
        />
      )}
      {/* Example for select/options based value - uncomment and adapt if needed
      {currentFieldConfig && currentFieldConfig.options && (
        <select value={rule.value} onChange={handleValueChange}>
          {currentFieldConfig.options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}
      */}

      <button onClick={onRemove} className="remove-rule-btn">X</button>
    </div>
  );
};

export default RuleComponent;

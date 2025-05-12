import React from 'react';
import type { Rule, RuleGroup } from '../types'; // Changed to type-only import
import RuleComponent from './RuleComponent'; // Will create this next

interface RuleGroupProps {
  group: RuleGroup;
  onChange: (updatedGroup: RuleGroup) => void;
  path: (string | number)[]; // To help identify the part of the logic being changed
}

const RuleGroupComponent: React.FC<RuleGroupProps> = ({ group, onChange, path }) => {
  const handleCombinatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...group, combinator: e.target.value as 'AND' | 'OR' });
  };

  const handleAddRule = () => {
    const newRule: Rule = {
      id: `r${Date.now()}`,
      field: 'spend', // Default field
      operator: '>',
      value: 0,
    };
    onChange({ ...group, rules: [...group.rules, newRule] });
  };

  const handleAddGroup = () => {
    const newGroup: RuleGroup = {
      id: `g${Date.now()}`,
      combinator: 'AND',
      rules: [],
    };
    onChange({ ...group, rules: [...group.rules, newGroup] });
  };

  const handleRuleChange = (index: number, updatedRuleOrGroup: Rule | RuleGroup) => {
    const newRules = [...group.rules];
    newRules[index] = updatedRuleOrGroup;
    onChange({ ...group, rules: newRules });
  };

  const handleRemoveRule = (index: number) => {
    const newRules = group.rules.filter((_, i) => i !== index);
    onChange({ ...group, rules: newRules });
  };

  return (
    <div className="rule-group">
      <div className="group-controls">
        <select value={group.combinator} onChange={handleCombinatorChange}>
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
        <button onClick={handleAddRule}>+ Add Rule</button>
        <button onClick={handleAddGroup}>+ Add Group</button>
      </div>
      <div className="rules-list">
        {group.rules.map((ruleOrGroup, index) => (
          <div key={ruleOrGroup.id} className="rule-item-container">
            { 'rules' in ruleOrGroup ? (
              <RuleGroupComponent
                group={ruleOrGroup as RuleGroup}
                onChange={(updatedSubGroup) => handleRuleChange(index, updatedSubGroup)}
                path={[...path, index]}
              />
            ) : (
              <RuleComponent
                rule={ruleOrGroup as Rule}
                onChange={(updatedRule) => handleRuleChange(index, updatedRule)}
                onRemove={() => handleRemoveRule(index)}
                path={[...path, index]}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RuleGroupComponent;

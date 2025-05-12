import React, { useState } from 'react';
import type { RuleGroup } from '../types'; // Changed to type-only import
import RuleGroupComponent from './RuleGroupComponent';
import '../styles/RuleBuilder.css'; // We'll create this file next

interface RuleBuilderProps {
  initialLogic?: RuleGroup;
  onLogicChange: (logic: RuleGroup) => void;
}

const RuleBuilder: React.FC<RuleBuilderProps> = ({ initialLogic, onLogicChange }) => {
  const [logic, setLogic] = useState<RuleGroup>(
    initialLogic || { id: 'root', combinator: 'AND', rules: [] }
  );

  const handleLogicChange = (updatedLogic: RuleGroup) => {
    setLogic(updatedLogic);
    onLogicChange(updatedLogic);
  };

  return (
    <div className="rule-builder">
      <h3>Audience Rules</h3>
      <RuleGroupComponent group={logic} onChange={handleLogicChange} path={['root']} />
      <button onClick={() => console.log(JSON.stringify(logic, null, 2))}>
        Preview Logic (Console)
      </button>
      {/* Audience size preview will go here */}
    </div>
  );
};

export default RuleBuilder;

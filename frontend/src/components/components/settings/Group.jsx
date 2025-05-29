import { useState, useEffect } from "react";

function Group() {
  const groups = ["208", "209"];
  const [selectedGroup, setSelectedGroup] = useState(() => {
    return localStorage.getItem('selectedGroup') || '208';
  });

  useEffect(() => {
    if (selectedGroup) {
      localStorage.setItem('selectedGroup', selectedGroup);
    }
  }, [selectedGroup]);

  return (
    <div className="flex flex-row justify-between">
      <p>Група</p>
      <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
        <option value="" disabled>Оберіть групу</option>
        {groups.map(group => (
          <option key={group} value={group}>{group}</option>
        ))}
      </select>
    </div>
  );
}

export default Group;
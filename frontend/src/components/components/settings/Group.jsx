import { useState, useEffect } from "react";
import axios from 'axios';

function Group() {
  const groups = ["208", "209"];
  const [selectedGroup, setSelectedGroup] = useState("208");

  useEffect(() => {
    if (selectedGroup) {
      
    }
  }, [selectedGroup]);

  return (
    <div className="flex flex-row justify-between pt-5">
      <p>Choose group</p>
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
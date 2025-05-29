import { useState, useEffect } from "react";

function Subgroup() {
  const subgroups = ["1", "2"];
  const [selectedSubgroup, setSelectedSubgroup] = useState(() => {
    return localStorage.getItem('selectedSubgroup') || '208';
  });

  useEffect(() => {
    if (selectedSubgroup) {
      localStorage.setItem('selectedSubgroup', selectedSubgroup);
    }
  }, [selectedSubgroup]);

  return (
    <div className="flex flex-row justify-between">
      <p>Підгрупа</p>
      <select value={selectedSubgroup} onChange={e => setSelectedSubgroup(e.target.value)}>
        <option value="" disabled>Оберіть підгрупу</option>
        {subgroups.map(subgroup => (
          <option key={subgroup} value={subgroup}>{subgroup}</option>
        ))}
      </select>
    </div>
  );
}

export default Subgroup;
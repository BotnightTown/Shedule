import { useState, useEffect } from "react";

function WeekType() {
  const weekTypes = [
    { label: "Над рискою", value: 'upper' },
    { label: "Під рискою", value: 'lower' }
  ];
  const [weekType, setWeekType] = useState(() => {
    return localStorage.getItem('weekType') || 'upper';
  });

  useEffect(() => {
    if (weekType) {
      localStorage.setItem('weekType', weekType);
    }
  }, [weekType]);

  return (
    <div className="flex flex-row justify-between">
      <p>Тиждень</p>
      <select value={weekType} onChange={e => setWeekType(e.target.value)}>
        <option value="" disabled>Оберіть тиждень</option>
        {weekTypes.map(week => (
          <option key={week.label} value={week.value}>{week.label}</option>
        ))}
      </select>
    </div>
  );
}

export default WeekType;
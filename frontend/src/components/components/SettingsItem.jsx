import { useState } from "react";

function ToggleSwitch() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div
      onClick={() => setEnabled(!enabled)}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300
        ${enabled ? 'bg-slate-500' : 'bg-gray-300'}
      `}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300
          ${enabled ? 'translate-x-6' : 'translate-x-0'}
        `}
      />
    </div>
  );
}

function SettingsItem(){
  return(
    <div>
      <ToggleSwitch />
    </div>
  )
}

export default SettingsItem;
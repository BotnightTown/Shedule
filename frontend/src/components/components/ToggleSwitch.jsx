function ToggleSwitch({ checked, onToggle }) {

  return (
    <div
      onClick={onToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300
        ${checked ? 'bg-slate-700' : 'bg-cyan-300'}
      `}
    >
      <div
        className={`bg-cyan-50 w-4 h-4 rounded-full shadow-md transform transition-transform duration-300
          ${checked ? 'translate-x-6' : 'translate-x-0'}
        `}
      />
    </div>
  );
}

export default ToggleSwitch;
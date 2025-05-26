import DarkMode from "../components/settings/DarkMode";

function SettingsPage({ sidebarOpen }){
  return(
    <div className={`h-full flex flex-col gap-5 text-gray-950 dark:text-gray-200 transition-all duration-300 ${!sidebarOpen ? 'p-5 pt-0' : ''}`}>
      <div className="h-max flex flex-row justify-between items-center ">
        <p className="text-2xl md:text-3xl font-medium">Settings</p>
      </div>
      <div className="text-base md:text-lg font-normal" >
        <DarkMode />
      </div>

    </div>
  )
}

export default SettingsPage;
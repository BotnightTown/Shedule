import { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import Header from './components/Header';
import MainApp from './components/MainApp';
import { useTranslation } from 'react-i18next';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const userContext = useContext(UserContext);
  if (!userContext) return null
  const { loading } = userContext;
  const { t } = useTranslation();
  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      themeColorMeta?.setAttribute('content', '#0f172a');
    } else {
      document.documentElement.classList.remove('dark');
      themeColorMeta?.setAttribute('content', '#ffffff');
    }
  }, [])
  
  
  return (
    <div className='h-screen flex flex-col bg-white dark:bg-slate-950 text-cyan-950 dark:text-slate-400'>
      <Header onSidebarToggle={handleSidebarToggle} />
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p>{t("Loading")}...</p>
        </div>
      ) : (
        <MainApp sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
    </div>
  )
}

export default App

import { useState, useEffect, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from './UserContext';
import Header from './components/header';
import MainApp from './components/MainApp';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loading } = useContext(UserContext);
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
  }, []);

  return (
    <div className='h-screen flex flex-col bg-white dark:bg-slate-950 text-cyan-950 dark:text-slate-400'>
      <BrowserRouter>
        <Header onSidebarToggle={handleSidebarToggle} />
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p>Завантаження...</p>
          </div>
        ) : (
          <MainApp sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App

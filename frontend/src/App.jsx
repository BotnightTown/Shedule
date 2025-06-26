import Header from './components/header';
import Main from './components/main';
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      themeColorMeta?.setAttribute('content', '#0f172a'); // темний
    } else {
      document.documentElement.classList.remove('dark');
      themeColorMeta?.setAttribute('content', '#ffffff'); // світлий
    }
  }, []);

  return (
    <div className='h-screen flex flex-col bg-cyan-100 dark:bg-slate-950 text-cyan-950 dark:text-slate-400'>
      <BrowserRouter>
        <Header onSidebarToggle={handleSidebarToggle} />
        <Main sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </BrowserRouter>
    </div>
  );
}

export default App

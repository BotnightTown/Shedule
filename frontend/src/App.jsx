import Header from './components/header';
import Main from './components/main';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);

  return (
    <div className='h-screen flex flex-col'>
      <BrowserRouter>
        <Header onSidebarToggle={handleSidebarToggle} />
        <Main sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </BrowserRouter>
    </div>
  );
}

export default App

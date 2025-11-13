import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div>
    
      <Navbar />

     
      <div className="min-h-[calc(100vh-340px)]">
        <Outlet />
      </div>

     
      <Footer />
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <div>
        <Router>
            <main className="container mx-auto px-3 pd-12">
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/home' element={<Home/>} />
            </Routes>
            </main>
        </Router>
        </div>
        <ToastContainer />
    </div>
  );
}

export default App;

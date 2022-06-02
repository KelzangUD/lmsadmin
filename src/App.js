import { BooksProvider } from './context/BooksContext';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Header from './layout/Header';
import Home from './pages/Home';
import BookRequested from './pages/BooksRequested';
import BooksAssigned from './pages/BooksAssigned';
import AddBook from './pages/AddBook';
import {useAuthStatus} from './hooks/useAuthStatus';

function App() {
  const {loggedIn} = useAuthStatus();
  return (
    <BooksProvider>
    <div className="App">
      <div>
        <Router>
            <main className="container mx-auto px-3 pd-12">
              {
                loggedIn && <Header />
              }
            <main className='container relative overflow-x-auto'>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/booksRequested' element={<BookRequested/>}/>
                <Route path='/booksAssigned' element={<BooksAssigned/>}/>
                <Route path='/addBook' element={<AddBook/>}/>
            </Routes>      
            </main>
            </main>
        </Router>
        </div>
        <ToastContainer />
    </div>
    </BooksProvider>
  );
}

export default App;

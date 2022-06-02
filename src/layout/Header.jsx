import { getAuth } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import {IoIosLogOut} from 'react-icons/io';
const Header = ()=>{
    const auth = getAuth();
    const navigate = useNavigate();
    const logoutHandle = ()=>{
        auth.signOut();
        navigate('/');
        toast.success("You Have Logout from the Application");
    }
    return (
        <>
            <header className="mb-8">
                <div className='float-left'>
                <Link to="/home" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-2">Home</Link>
                </div>
                <div className='flex float-right'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-2">Add Book</button>
                <Link to="/booksRequested" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-2">Requested Book</Link>
                <Link to="/booksAssigned" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-2">Assigned Book</Link>
                <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center" onClick={logoutHandle}><IoIosLogOut className='mr-2'/>Log Out</button>
                </div>
            </header>
        </>
    )
}
export default Header;
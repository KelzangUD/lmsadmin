import { getAuth } from 'firebase/auth';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import LinkUi from '../ui/LinkUi';

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
                <LinkUi to={"/home"} title={"Home"}/>
                </div>
                <div className='flex float-right'>
                <LinkUi to={"/addbook"} title={"Add Book"}/>
                <LinkUi to={"/booksRequested"} title={"Requested Book"}/>
                <LinkUi to={"/booksAssigned"} title={"Assigned Book"}/>
                <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center" onClick={logoutHandle}><IoIosLogOut className='mr-2'/>Log Out</button>
                </div>
            </header>
        </>
    )
}
export default Header;
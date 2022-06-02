import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = ({usersData})=>{
    const [formData, setFormData] = useState([]);
    const auth = getAuth();
    const navigate = useNavigate();
    const changeHandle = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setFormData(prevValue=>({...prevValue, [name]:value}))
    }
    const submitHandle=(e)=>{
        e.preventDefault();
        const {email, password}= formData;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                const user = userCredential.user;
                let useremail = user.email;
                usersData.map((item)=>{
                    if(item.email===useremail){
                        // console.log("email matched");
                        if(item.role==="admin"){
                            navigate("/home");
                            toast.success("Login Successful");
                        }
                        else{
                            toast.error("You are not Admin");
                        }
                    }
                })
            }).catch(err=>{
                toast.error(err);
            })
    }

    return (
        <>
            <form className="shadow-md rounded bg-gray-200 px-8 pb-8 mb-4" onSubmit={submitHandle}>
                    <div className="mb-4 pt-2 flex justify-center">
                        <h1 className='text-2xl font-bold'>Login Form</h1>
                    </div>
                    <hr/>
                    <div className="mb-4">
                        <label className="font-semibold">Email</label>
                        <input onChange={changeHandle} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='email' type="text" placeholder='Enter User Name'/>
                    </div>
                    <div className="mb-4">
                        <label className="font-semibold">Password</label>
                        <input onChange={changeHandle} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name='password' type="password" placeholder="Enter Password"/>
                    </div>
                    <div className="grid content-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Login
                        </button>
                    </div>
                </form>
        </>
    )
}
export default LoginForm;
import { useState, useEffect } from "react";
import LoginService from "../services/LoginService";
import LoginImage from "../components/LoginImage";
import LoginForm from "../components/LoginForm";
const Login = ()=>{
    const [usersData, setUsersData] = useState([]);
    useEffect(()=>{
        getUserDetails();
    },[]);
    const getUserDetails = async () => {
        const data = await LoginService.getAdminUserDetails();
        console.log(data.docs);
        setUsersData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
    return (
        <div className='grid grid-cols-2 pt-40 gap-2'>
            <div className=''>
                <LoginImage />
            </div>
            <div>
                <LoginForm usersData={usersData}/>
            </div>
        </div>
    )
}
export default Login;
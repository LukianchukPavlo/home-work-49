import { useState, useEffect, useCallback, memo } from "react";
import axios from 'axios';
import { Fa1 } from "react-icons/fa6";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { ToastContainer, toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { GoQuestion } from "react-icons/go";

export type UserType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
};
export type FirstUser = {
  text: string
}

const FirstUser = memo(function FirstUser({text}: FirstUser)  {
      return <div className="container">
        <Fa1 id="number" />
        {text}
        </div>
    })
export default function User(){
    const [user, setUser] = useState<UserType | null >(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(1)
    
    const notify = useCallback(() => {
      toast(" Наступний користувач ")
    },[])
    const nextUser = useCallback(() => {
      setUserId(id => id < 10 ? id + 1 : 1);
    }, [])
    const handleClick = useCallback(() => {
      nextUser();
      notify()
    }, [nextUser, notify])


useEffect (() => {
        let isMounted = true;
        const loadUser = async () => {
        try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (isMounted) setUser(response.data);
        }  catch {
        if (isMounted) setError("Error loading user");
        }  finally {
        if (isMounted) setLoading(false);
        }
    }
        loadUser();

        return () => {
            isMounted = false;
        }
    }, [userId]);

    if (error) return <h1>{error}</h1>
    if (loading) return <h1>Loading...</h1>
    if (!user) return null;
    

    return (
    <div>
      <h2>User data:</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p className="phone-image"><HiDevicePhoneMobile style={{ fontSize: "24px"}}/>: {user.phone}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <div className="container">
        <button onClick={handleClick} >Next User</button>
        <GoQuestion className="question-image" data-tooltip-id="my-tooltip" data-tooltip-content="Наступний користувач" />
      </div>
      <Tooltip id="my-tooltip" place="top"/>
      <ToastContainer/>
      <p>User {userId}</p>
      <FirstUser text=" User was Leanne Graham"/>
    </div>
  )
}
;

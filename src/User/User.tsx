import { useState, useEffect, useCallback, memo } from "react";
import axios from 'axios';

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
      return <div>{text}</div>
    })
export default function User(){
    const [user, setUser] = useState<UserType | null >(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(1)

    
    const nextUser = useCallback(() => {
      setUserId(id => id < 10 ? id + 1 : 1);
    }, [])

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
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <button onClick={nextUser}>Next User</button>
      <p>User {userId}</p>
      <FirstUser text="first User was Leanne Graham"/>
    </div>
  )
}
;

import React, {useContext, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {UserContext} from '../UserContext.jsx';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try
        {
            await fetch(
                'http://localhost:4000/login',
                {
                    method: 'POST',
                    credentials: 'include',
                    mode: 'cors',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            )
            .then(response => response.json())
            .then(data => {
                console.log();
                
                if(data !== 'password wrong')
                {
                    setRedirect(true);
                    setUser(data);
                    alert(`--> Login success : ${redirect}`);
                }
                else
                {
                    alert(`--> Login failed: ${data}`);
                }
            });
        }
        catch(exception){
            alert(`--> Failed to login, Error: ${exception}`);
        }
    };

    if(redirect)
    {
        return <Navigate to={'/'} />
    }

    return(
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={ev => handleLoginSubmit(ev)}>
                    <input type='email' placeholder={'your@mail.com'} value={email} onChange={ev => setEmail(ev.target.value)}></input>
                    <input type='password' placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)}></input>
                    <button className='primary'>Login</button>

                    <div className='text-center py-2 text-gray-300'>
                        Don't have an account yet? <Link className='underline text' to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default LoginPage;
import React from 'react';
import {Link} from 'react-router-dom';
import {useState} from 'react';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async (ev) => {
        ev.preventDefault()

        await fetch(
            'http://localhost:4000/register',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );

        alert('Registration successful... Now you can login');
    }; 

    return(
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form className='max-w-md mx-auto' onSubmit={registerUser}>
                    <input type='text' placeholder="John Doe"
                        value={name} 
                        onChange={ev => setName(ev.target.value)}></input>

                    <input type='email' placeholder={'your@mail.com'}
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}></input>

                    <input type='password' placeholder='password'
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}></input>

                    <button className='primary'>Register</button>

                    <div className='text-center py-2 text-gray-300'>
                        Already a member? <Link className='underline text' to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default RegisterPage
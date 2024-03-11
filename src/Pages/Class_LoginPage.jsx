import React, {useContext, Component} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {UserContext} from '../UserContext.jsx';

class Class_LoginPage extends Component{
    constructor(){
        super();

        this.state = {
            email: '',
            password: '',
            isRedirect: false,
            
        }
    }

    setEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    };

    setRedirect = (isRedirectAttr) => {
        this.setState({
            isRedirect: isRedirectAttr
        });
    };


    setPassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    handleLoginSubmit = async (e) => {
        e.preventDefault();

        const {email, password} = this.state;
        const serUser = useContext(UserContext);

        try
        {
            await fetch(
                'http://localhost:4000/login',
                {
                    method: 'POST',
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
            // .then(data => {
            //     //if(data == 'found')
            //     if(true)
            //     {
            //         this.setRedirect(true);
                    
            //         alert(`--> Login success : ${this.state.isRedirect}`);
            //     }
            //     else
            //     {
            //         alert(`--> Login failed: ${data}`);
            //     }

            //     this.handleRedirect();
            // });
        }
        catch(exception){
            alert(`--> Failed to login, Error: ${exception}`);
        }
    };

    handleRedirect = () => {
        //if(this.state.isRedirect)
        {
            return <Navigate to={'/'} />
        }
    };

    render(){
        

        return(
            <div className='mt-4 grow flex items-center justify-around'>
                <div className='mb-64'>
                    <h1 className='text-4xl text-center mb-4'>Login</h1>
                    <form className='max-w-md mx-auto' onSubmit = {this.handleLoginSubmit}>
                        <input type='email' placeholder={'your@mail.com'} value={this.state.email} onChange={this.setEmail}></input>
                        <input type='password' placeholder='password' value={this.state.password} onChange={this.setPassword}></input>
                        <button className='primary'>Login</button>
    
                        <div className='text-center py-2 text-gray-300'>
                            Don't have an account yet? <Link className='underline text' to={'/register'}>Register now</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Class_LoginPage;
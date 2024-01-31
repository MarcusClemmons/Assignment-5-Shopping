import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useGlobalContext } from './contexts/GlobalContext'; // Import the hook from where it's defined
import './Login.css';
import user_icon from './Assets/person.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';

function Login() {
    const [action, setAction] = useState('Log In');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate(); // Call useNavigate
    const { signup, login, isLoading, error } = useGlobalContext();

    const handleAction = async (event) => {
        event.preventDefault(); // Prevent the form from submitting traditionally
        try {
            if (action === 'Sign Up') {
                await signup(email, password, name); // Use the signup function from the context
            } else {
                await login(email, password); // Use the login function from the context
            }
            navigate('/'); // Redirect to home page upon successful login/signup
        } catch (error) {
            console.error("Login/Signup error:", error);
        }
    };
    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <form className='inputs' onSubmit={handleAction}> {/* Converted div to form and added onSubmit */}
                {action === "Sign Up" && (
                    <>
                        <div className='input'>
                            <img src={user_icon} alt='' />
                            <input type='text' placeholder='Username' value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        {/* Email and Password inputs remain common for both actions */}
                    </>
                )}
                <div className='input'>
                    <img src={email_icon} alt='' />
                    <input type='email' placeholder='Email Id' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='input'>
                    <img src={password_icon} alt='' />
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button className='submit' type='submit' disabled={isLoading}>
                    {isLoading ? 'Processing...' : (action === 'Sign Up' ? 'Create Account' : 'Login')}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p className='action-link' onClick={() => setAction(prevAction => prevAction === "Log In" ? "Sign Up" : "Log In")}>
                {action === "Log In" ? "Not registered? Click Signup." : "Already have an account? Log In"}
            </p>
        </div>
    );
}

export default Login;

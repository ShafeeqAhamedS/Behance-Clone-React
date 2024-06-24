import React, { useState } from 'react';
import { login_background, behance_short } from '../../logos';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignupComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  // Function to generate a random 4 digit number
    const generateRandomNumber = () => {
        return Math.floor(1000 + Math.random() * 9000);
    };


  const handleSignup = (event) => {
    event.preventDefault();
    setNameError(!name);
    setEmailError(!email);
    setPasswordError(!password);

    if (!name || !email || !password) {
      return;
    }

    
    const userId = generateRandomNumber();

    // Create a new user object
    const newUser = {
      userId: userId,
      name: name,
      email: email,
      password: password,
      likedPosts: [] // Initialize likedPosts as an empty array
    };

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email is already registered
    const isEmailRegistered = existingUsers.some(user => user.email === email);
    if (isEmailRegistered) {
      toast.error('Email already exists');
      return;
    }

    // Add the new user to existing users array
    existingUsers.push(newUser);

    // Save updated users array back to localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));
    // Display success message
    toast.success('Signup successful!');

    // Clear form fields
    setName('');
    setEmail('');
    setPassword('');

    localStorage.setItem('user', JSON.stringify(userId));
    navigate('/');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${login_background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
      }}
      className="flex flex-col justify-center items-center sm:flex-row sm:justify-evenly"
    >
      <div className="sm:hidden flex flex-col items-center mb-6">
        <img src={behance_short} alt="Behance Logo" className="w-12 h-12" />
        <h1 className="text-3xl font-bold text-white">Behance</h1>
      </div>
      <div className="hidden sm:flex justify-center items-center mb-6">
        <img src={behance_short} alt="Behance Logo" className="w-12 h-12" />
        <h1 className="text-3xl font-bold text-white px-5">Behance</h1>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-7/12 sm:w-auto">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <ToastContainer />
        <form onSubmit={handleSignup} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(!e.target.value);
              }}
            />
            {nameError && <p className="text-red-500 text-xs italic">Please enter your name.</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              id="email"
              placeholder="mail@mail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(!e.target.value);
              }}
            />
            {emailError && <p className="text-red-500 text-xs italic">Please enter your email.</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              placeholder="*******"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(!e.target.value);
              }}
            />
            {passwordError && <p className="text-red-500 text-xs italic">Please enter your password.</p>}
          </div>
          <div className="flex items-center justify-between pb-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div className="flex items-center justify-evenly">
            <button
              className="text-[#0057ff] border-[#dee8ff] bg-[#f1f5ff] font-bold py-2 w-5/12 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 w-5/12 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate('/')}
            >
              Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupComponent;

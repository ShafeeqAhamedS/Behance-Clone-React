import React, { useState } from 'react';
import { login_background, behance_short } from '../../logos';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import userData from '../../userData';
import { useNavigate } from 'react-router-dom';


const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    setEmailError(!email);
    setPasswordError(!password);

    if (!email || !password) {
      return;
    }

    const loggedInUser = userData.find((user) => user.email === email);

    if (loggedInUser) {
      if (loggedInUser.password === password) {
        setUser(loggedInUser);
        toast.success('Login successful!', {
          autoClose: 1000,
          onClose: () => {
            localStorage.setItem('user', JSON.stringify(loggedInUser.userId));
            navigate('/');
          }
        });
      } else {
        toast.error('Incorrect Password');
      }
    } else {
      toast.error('Incorrect Email');
    }
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
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <ToastContainer />
        <form onSubmit={handleLogin} className="mt-4">
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
          <div className="flex items-center justify-between py-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline "
              type="submit"
            >
              Log In
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate('/')}
            >
              Go Back Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;

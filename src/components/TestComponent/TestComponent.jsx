import React, { useEffect, useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import { BiSolidBell } from 'react-icons/bi';
import { adobeLogo, behance_logo } from '../../data';
import './TestComponent.css';
import userData from '../../userData';

const HeaderComponent = () => {
  const [loginOverlay, setLoginOverlay] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [registeredUser, setRegisteredUser] = useState(null);

  const openLoginOverlay = () => {
    setLoginOverlay(true);
    document.body.classList.add('login-overlay-open');
  };

  const closeLoginOverlay = () => {
    setLoginOverlay(false);
    document.body.classList.remove('login-overlay-open');
  };

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission
    const loggedInUser = userData.find((user) => user.email === email && user.password === password);
    if (loggedInUser) {
      setUser(loggedInUser);
      console.log('Logged in successfully');
      closeLoginOverlay();
      localStorage.setItem('user', JSON.stringify(loggedInUser.userId));
      window.location.reload();
    } else {
      console.log('Incorrect email or password');
    }
  };

  const handleSignup = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Check if the email already exists
    const existingUser = userData.find((user) => user.email === signupEmail);
    if (existingUser) {
      console.log('Email already registered');
    } else {
      // Create new user object
      const newUser = {
        userId: userData.length, // Generate unique userId (this can be improved)
        name: 'New User', // Add more fields as needed
        email: signupEmail,
        password: signupPassword,
        likedPosts: [],
      };
      // Update userData (simulate server-side storage)
      userData.push(newUser);
      setRegisteredUser(newUser);
      console.log('Registered successfully');
    }
  };

  useEffect(() => {
    // Check if the user is already logged in
    const userId = localStorage.getItem('user');
    if (userId) {
      const loggedInUser = userData.find((user) => user.userId === parseInt(userId));
      setUser(loggedInUser);
    }
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27 && loginOverlay) {
        closeLoginOverlay();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [loginOverlay]);

  const handleLogout = () => {
    // Refersh the page to clear the state
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };


  return (
    <div>
      <header className='fixed w-full '>
        <div className="container-fluid bg-white">
          <div className="top-header py-2 px-5 border-b border flex justify-between ">
            <div className="navbar flex items-center ">
              <div className="brand-logo">
                <img src={behance_logo} alt={behance_logo} className='w-auto h-4'/>
              </div>
              <div className="page-links">
                <ul className='flex items-center ml-2'>
                  <li className='mx-2 text-sm relative'>
                    <a href="http://" target="_blank" rel="noopener noreferrer" className="active font-semibold">Explore <GoChevronDown className='inline' /> </a>
                    <div className="dropdown-content">
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='d-1 text-xs'>Search & Explore</a>
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='d-2 text-xs'>Curated Galleries</a>
                      <div className="dropdown-divider"></div>
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Best of Behance</a>
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Graphic Design</a>
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Illustration</a>
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Photography</a>
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>UI/UX</a>
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>3D Art</a>
                    </div>
                  </li>
                  <li className='mx-2 font-semibold text-sm'><a href="http://" target="_blank" rel="noopener noreferrer">Assets</a></li>
                  <li className='mx-2 font-semibold text-sm'><a href="http://" target="_blank" rel="noopener noreferrer">Jobs</a></li>
                  <li className='mx-2 font-semibold text-sm'>
                    <a href="http://" target="_blank" rel="noopener noreferrer" className='flex items-center'>
                      Behance
                      <a className="pro-btn rounded-md font-bold border mx-2" href="">PRO</a>
                    </a>                                    
                  </li>
                  <li className='mx-2 text-sm border-l pl-6 relative'>
                    <a href="http://" target="_blank" rel="noopener noreferrer" className="font-semibold">Hire Freelancers <GoChevronDown className='inline' /></a>
                    <div className="dropdown-content">
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='text-xs d-2-1'>Hiring on Behance</a>
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='text-xs d-2-1'>Find Creatives</a>
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='text-xs d-2-2'>My Freelance Projects</a>
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='text-xs d-2-3'>New Freelance Projects</a>
                      <div className="dropdown-divider"></div>
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Graphic Designers</a>
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Brand Designers</a>
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>UI/UX Designer</a>
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Illustrators</a>
                      <a href="http://" target="_blank" rel="noopener noreferrer" className='smaller-font'>Logo Designers</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="action-area flex items-center">
              <BiSolidBell className='mx-2'/>
              {user ? (
                <div className="user-profile flex items-center">
                  <img src={user.avatar} alt={user.name} className='w-8 h-8 rounded-full'/>
                  <p className='font-bold text-sm mx-2'>{user.name}</p>
                  <button className="logout-btn bg-red-500 text-white rounded-md px-3 py-1" onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <div>
                  <div className="signup-btn rounded-full font-bold border px-3 py-1 mx-1 sm:max-lg:text-xs lg:max-2xl:text-sm">
                    <a href="#">Sign Up</a>
                  </div>
                  <div className="login-btn rounded-full font-bold border px-3 py-1 mx-1 sm:max-lg:text-xs lg:max-2xl:text-sm">
                    <a href="#" onClick={openLoginOverlay}>Log In</a>
                  </div>
                </div>
              )}
              <div className="adobe-btn mx-3 sm:max-lg:text-xs lg:max-2xl:text-sm">
                <a href="http://" target="_blank" rel="noopener noreferrer" className='flex items-center hover:opacity-70'>
                  <img src={adobeLogo} alt={adobeLogo} className='w-4 h-4 mx-1'/>
                  <p className='font-bold text-xs'>Adobe</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        {loginOverlay && (
            <div className="login-overlay w-1/5 absolute right-20 px-10 py-5 bg-black bg-opacity-50">
              <div className="login-overlay-content">
                <div className="login-overlay-header flex justify-between items-center">
                  <h2 className='font-bold text-white'>Log In</h2>
                  <div className="close-btn text-white" onClick={closeLoginOverlay}>X</div>
                </div>
                <div className="login-overlay-body">
                  <div className="login-form">
                    <form onSubmit={handleLogin}>
                      <div className="form-group">
                        <label htmlFor="email" className="text-white">Email</label>
                        <input 
                          type="email" 
                          name="email" 
                          id="email" 
                          className='border border-gray-300 rounded-md w-full p-2'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password" className="text-white">Password</label>
                        <input 
                          type="password" 
                          name="password" 
                          id="password" 
                          className='border border-gray-300 rounded-md w-full p-2'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <button type="submit" className='bg-blue-500 text-white rounded-md w-full p-2'>Log In</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

      </header>
    </div>
  );
};

export default HeaderComponent;


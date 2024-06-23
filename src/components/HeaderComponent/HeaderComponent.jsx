import React, { useEffect, useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import { BiSolidBell } from 'react-icons/bi';
import { FaUserCircle } from "react-icons/fa";
import { adobeLogo, behance_logo } from '../../logos';
import './HeaderComponent.css';
import userData from '../../userData';


const HeaderComponent = () => {
    const [loginOverlay, setLoginOverlay] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const openLoginOverlay = () => {
        setLoginOverlay(true);
        document.body.classList.add('login-overlay-open');
    };
    
    const closeLoginOverlay = () => {
        setLoginOverlay(false);
        document.body.classList.remove('login-overlay-open');
    };

    const handleLogin = (event) => {
        event.preventDefault();
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
    
    const exploreDropdown = [
        ['Search & Explore', 'Curated Galleries'],
        ['Best of Behance', 'Graphic Design', 'Illustration', 'Photography', 'UI/UX', '3D Art']
    ]

    const hireDropdown = [
        ['Hiring on Behance', 'Find Creatives', 'My Freelance Projects', 'New Freelance Projects'],
        ['Graphic Designers', 'Brand Designers', 'UI/UX Designer', 'Illustrators', 'Logo Designers']
    ]
  return (
    <div>
        <header className='fixed w-full z-50'>
            <div className="container-fluid bg-white">
                <div className="top-header py-4 px-5 border-b border flex justify-between ">
                    <div className="navbar flex items-center ">
                        <div className="brand-logo mr-4">
                            <img src={behance_logo} alt={behance_logo} className='w-auto h-4'/>
                        </div>
                        <div className="page-links">
                            <ul className='flex items-center ml-2'>
                                <li className='mx-2 text-base relative hidden sm:block'>
                                    <a href="http://" target="_blank" rel="noopener noreferrer" className="active font-semibold">Explore <GoChevronDown className='inline' /> </a>
                                    <div className="dropdown-content absolute top-4">
                                        {exploreDropdown.map((group, index) => (
                                            <div key={index}>
                                                {group.map((item, idx) => (
                                                    <a key={idx} href="http://" target="_blank" rel="noopener noreferrer" className={index === 0 ? `d-${idx + 1} text-xs` : 'smaller-font'}>
                                                        {item}
                                                    </a>
                                                ))}
                                                {index === 0 && <div className="dropdown-divider"></div>}
                                            </div>
                                        ))}
                                    </div>
                                </li>
                                <li className='mx-2 font-semibold text-base hidden sm:block'><a href="http://" target="_blank" rel="noopener noreferrer">Assets</a></li>
                                <li className='mx-2 font-semibold text-base hidden sm:block'><a href="http://" target="_blank" rel="noopener noreferrer">Jobs</a></li>
                                <li className='mx-2 font-semibold text-base hidden md:block'>
                                    <a href="http://" target="_blank" rel="noopener noreferrer" className='flex items-center hidden sm:flex'>
                                        Behance
                                        <a className="pro-btn rounded-md font-bold border mx-2 flex items-center justify-center h-[20px] w-[30px] text-[0.65rem] text-center text-white" href="">PRO</a>
                                    </a>                                    
                                </li>
                                <li className='mx-2 text-base border-l pl-6 relative hidden lg:block'>
                                    <a href="http://" target="_blank" rel="noopener noreferrer" className="font-semibold">Hire Freelancers <GoChevronDown className='inline' /></a>
                                    <div className="dropdown-content absolute top-4 left-4">
                                        {hireDropdown[0].map((item, idx) => (
                                            <a key={idx} href="http://" target="_blank" rel="noopener noreferrer" className={`text-xs d-2-${idx + 1}`}>
                                                {item}
                                            </a>
                                        ))}
                                    <div className="dropdown-divider"></div>
                                        {hireDropdown[1].map((item, idx) => (
                                            <a key={idx} href="http://" target="_blank" rel="noopener noreferrer" className="smaller-font">
                                                {item}
                                            </a>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="action-area flex items-center">
                        <BiSolidBell className='mx-2 hidden lg:block'/>
                        {user ? (
                            <div className="user-profile flex items-center">
                                <div className="flex items-center justify-center bg-white rounded-full w-7 h-7 text-center cursor-pointer">
                                <FaUserCircle size={40}/>
                            </div>
                            <p className='font-bold text-sm mx-2'>{user.name}</p>
                            <button className="logout-btn rounded-full font-bold border px-3 py-1 mx-1 text-[13px] text-white bg-red-500" onClick={handleLogout}>Logout</button>
                        </div>
                        ) : (
                        <div className='action-area flex items-center'>
                            <div className="login-btn rounded-full font-bold border px-4 py-1 mx-1 text-[13px] text-[#0057ff] border-[#dee8ff] bg-[#f1f5ff]">
                                <div className='font-bold cursor-pointer'  onClick={openLoginOverlay}>Log In</div>
                            </div>
                            <div className="signup-btn rounded-full font-bold border px-3 py-1 mx-1 text-[13px] hidden md:block text-white bg-[#0057ff]">
                                <div className='font-bold cursor-pointer'>Sign Up</div>
                            </div>
                        </div>
                        )}
                        <div className="adobe-btn mx-3 sm:max-lg:text-xs lg:max-2xl:text-base hidden xl:block">
                            <a href="http://" target="_blank" rel="noopener noreferrer" className='flex items-center hover:opacity-70'>
                                <img src={adobeLogo} alt={adobeLogo} className='w-4 h-4 mx-1'/>
                                <p className='font-bold text-xs'>Adobe</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {loginOverlay && (
            <div className="login-overlay absolute m-5 sm:mx-16 right-0 px-10 py-5 bg-black bg-opacity-80 rounded-lg">
              <div className="login-overlay-content">
                <div className="login-overlay-header flex justify-between items-center">
                  <h2 className='font-bold text-white'>Log In</h2>
                  <div className="close-btn text-white" onClick={closeLoginOverlay}>X</div>
                </div>
                <div className="login-overlay-body">
                  <div className="login-form">
                    <form onSubmit={handleLogin}>
                      <div className="form-group mt-5">
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
                      <div className="form-group mt-5">
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
                      <div className="form-group mt-5">
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
  )
}

export default HeaderComponent
import React, { useState, useEffect } from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";

import { initialData } from '../../initialData';
import userData from '../../userData';
import './GalleryComponent.css';
import OverlayComponent from './OverlayComponent'
import SearchComponent from './SearchComponent';
import FooterComponent from './FooterComponent';

const sortItems = (items, criteria) => {
    if (criteria === 'recommended') {
        return [...items].sort(() => Math.random() - 0.5);
    } else if (criteria === 'mostliked') {
        return [...items].sort((a, b) => b.likes - a.likes);
    } else if (criteria === 'mostviewed') {
        return [...items].sort((a, b) => b.watches - a.watches);
    } else {
        return items;
    }
};

const GalleryComponent = () => {
    const [allItems, setAllItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortCriteria, setSortCriteria] = useState('recommended');
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [likedPosts, setLikedPosts] = useState([]);


    const fetchData = () => {
        const postsInLocalStorage = localStorage.getItem('posts');
        const usersInLocalStorage = localStorage.getItem('users');
    
        if (!postsInLocalStorage || !usersInLocalStorage) {
            localStorage.setItem('users', JSON.stringify(userData));
            localStorage.setItem('posts', JSON.stringify(initialData));
        }
    
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const users = JSON.parse(localStorage.getItem('users')) || [];
    
        const currentUserId = parseInt(localStorage.getItem('user'));
        const user = users.find(user => user.userId === currentUserId);
        setCurrentUser(user);
        setLikedPosts(user ? user.likedPosts : []);
        setAllItems(posts);
        setFilteredItems(posts);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = allItems.filter(item =>
            item.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(sortItems(filtered, sortCriteria));
    }, [allItems, searchTerm, sortCriteria]);

    const handleOnSearch = (string) => {
        if (string === '') {
            fetchData();
            setFilteredItems(allItems);
            setSearchTerm('');
            setSearchString('');
        } else {
            setSearchString(string);
        }
    };
    
    const handleOnSelect = (item) => {
        setSearchTerm(item.text);
    };

    const handleOnEnter = (string) => {
        setSearchTerm(string);
    };

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(searchString);
    };

    const handleOnHover = (result) => {
        console.log(result);
    };

    const openOverlay = (item) => {
        setSelectedItem(item);
        document.body.classList.add('overlay-open');
    };

    const closeOverlay = () => {
        setSelectedItem(null);
        document.body.classList.remove('overlay-open');
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeOverlay();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const toggleLike = (post) => {
        if(!currentUser) 
            return alert('Please login to like the post')

        const isLiked = likedPosts.includes(post.id);
        const updatedLikedPosts = isLiked
            ? likedPosts.filter(id => id !== post.id)
            : [...likedPosts, post.id];
    
        const updatedPost = {
            ...post,
            likes: isLiked ? parseInt(post.likes) - 1 : parseInt(post.likes) + 1
        };
    
        setLikedPosts(updatedLikedPosts);
    
        // Update filteredItems to reflect the change
        setFilteredItems(prevItems =>
            prevItems.map(item => item.id === post.id ? updatedPost : item)
        );
    
        // Update local storage
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                likedPosts: updatedLikedPosts
            };
    
            setCurrentUser(updatedUser);
    
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const updatedUsers = users.map(user => user.userId === currentUser.userId ? updatedUser : user);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
    
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            const updatedPosts = posts.map(item => item.id === post.id ? updatedPost : item);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
        }
    };
    

    return (
        <>
            <section>
                    <SearchComponent
                        extractedData={allItems.map(item => ({ id: item.id, text: item.text }))}
                        searchString={searchString}
                        handleOnSearch={handleOnSearch}
                        handleOnSelect={handleOnSelect}
                        handleOnEnter={handleOnEnter}
                        handleSortChange={handleSortChange}
                        sortCriteria={sortCriteria}
                        handleSearchSubmit={handleSearchSubmit}
                    />
                <div className="container-fluid mt-14 relative top-40 sm:top-24 mb-24">
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-3 mt-4 px-4">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <div key={item.id} className={`category-item cursor-pointer`} onClick={() => openOverlay(item)}>
                                    <div className="cat-img relative h-80 overflow-hidden">
                                        <div className="bg-overlay"></div>
                                        <img src={item.img_url} alt={item.text} />
                                    </div>
                                    <div className="cat-info flex justify-between py-3">
                                        <div className="cat-name cursor-pointer">
                                            <h4 className='font-medium text-xs hover:underline leading-[15px] text-ellipsis'>{item.text}</h4>
                                            <span className='text-xs hover:underline text-[#959595]'>{item.user}</span>
                                        </div>
                                        <div className="be-time flex">
                                            <button className={`be-like flex mr-2`} onClick={(e) => { e.stopPropagation(); toggleLike(item); }}>
                                                <div className="li-icon w-2 h-auto text-[#959595] mr-[10px] mt-[1px]">
                                                    {likedPosts.includes(item.id) 
                                                        ? <FcLike className='w-[14px] h-auto mt-[2px]'/>
                                                        : <GoHeart className='w-[14px] h-auto mt-[2px]' />
                                                    }                                            
                                                </div>
                                                <span 
                                                    className={`text-xs font-medium mt-[2px] ${likedPosts.includes(item.id) 
                                                        ?  'text-pink-800'
                                                        : 'text-[#959595]'
                                                    }`}>
                                                        {item.likes}
                                                </span>
                                            </button>
                                            <button className="be-watch flex mr-2">
                                                <div className="wa-icon text-[#959595] mr-1 mt-[2px]">
                                                    <IoEyeOutline className='w-[14px] h-auto mb-[8px]'/>
                                                </div>
                                                <span className='text-xs font-medium text-[#959595] mt-[2px]'>{item.watches}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center col-span-full text-lg text-gray-500">
                                No matching results found.
                            </div>
                        )}
                    </div>
                </div>

                {
                    filteredItems.length > 8  
                    ? 
                        <FooterComponent pos={"relative"}/> 
                    : 
                        <FooterComponent pos={"absolute"}/>
                }
                
            </section>

            {selectedItem && (
                <OverlayComponent selectedItem={selectedItem} closeOverlay={closeOverlay} />
            )}

            
        </>
    );
};

export default GalleryComponent;

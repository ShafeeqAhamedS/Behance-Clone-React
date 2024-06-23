import React, { useState, useEffect } from 'react';
import { PiEyeDuotone } from "react-icons/pi";
import { IoFilterSharp } from "react-icons/io5";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { AiTwotoneLike } from "react-icons/ai";
import './TestComponent.css';
import { GoShare } from "react-icons/go";
import { IoFolderOpen } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import OverlayComponent from './TestOverlayComponent';
import userData from '../../userData';
import { behanceItem } from '../../data';

const loadData = () => {
    localStorage.setItem('users', JSON.stringify(userData));
    localStorage.setItem('posts', JSON.stringify(behanceItem));
}

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

    // Load the data from userData & behanceItem into local storage using loadData function 

    const fetchData = () => {
        // Check if data already exists in local storage
        const postsInLocalStorage = localStorage.getItem('posts');
        const usersInLocalStorage = localStorage.getItem('users');
    
        if (!postsInLocalStorage || !usersInLocalStorage) {
            // If data doesn't exist, load it from static sources and set in local storage
            localStorage.setItem('users', JSON.stringify(userData));
            localStorage.setItem('posts', JSON.stringify(behanceItem));
        }
    
        // Now fetch the data from local storage
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const users = JSON.parse(localStorage.getItem('users')) || [];
    
        const currentUserId = parseInt(localStorage.getItem('user'));
        const user = users.find(user => user.userId === currentUserId);
        setCurrentUser(user);
        setLikedPosts(user ? user.likedPosts : []);
        setAllItems(posts);
        setFilteredItems(posts);
        console.log('posts fetched', posts);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log('allItems', allItems);
        const filtered = allItems.filter(item =>
            item.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(sortItems(filtered, sortCriteria));
    }, [allItems, searchTerm, sortCriteria]);

    // const handleOnSearch = (string) => {
    //     if (string === '') {
    //         fetchData();
    //     }
    //     setSearchString(string);
    // };

    const handleOnSearch = (string) => {
        if (string === '') {
            fetchData();
            // Reset maxResults to show all filteredItems
            setFilteredItems(allItems); // Reset filteredItems to allItems
            setSearchTerm(''); // Reset searchTerm
            setSearchString(''); // Reset searchString

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
            console.log('updatedUsers', updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
    
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            const updatedPosts = posts.map(item => item.id === post.id ? updatedPost : item);
            console.log('updatedPosts', updatedPosts);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
        }
    };
    

    return (
        <>
            <section>
                <div className="container-fluid px-4 mt-14">
                    <div className="flex items-center mt-16">
                        <div className="flex items-center border rounded-full px-7 py-2 w-fit text-center text-lg font-semibold">
                            <IoFilterSharp className='pr-3 w-max'/>
                            <span>Filter</span>
                        </div>
                        <div className='w-11/12 px-5'>
                            <form onSubmit={handleSearchSubmit}>
                                <ReactSearchAutocomplete
                                    items={allItems.map(item => ({ id: item.id, text: item.text }))}
                                    fuseOptions={{ keys: ["text"] }}
                                    resultStringKeyName="text"
                                    onSearch={handleOnSearch}
                                    onSelect={handleOnSelect}
                                    onClear={() => setSearchString('')}
                                    onEnter={handleOnEnter}
                                    maxResults={5}
                                    showIcon={true}
                                    placeholder={"Search the creative world at work"}
                                    styling={{
                                        zIndex: "100",
                                        height: "40px",
                                        border: "1px solid #dfe1e5",
                                        borderRadius: "24px",
                                        backgroundColor: "white",
                                        boxShadow: "none",
                                        hoverBackgroundColor: "#eee",
                                        color: "#212121",
                                        fontSize: "16px",
                                        fontFamily: "Poppins",
                                        iconColor: "grey",
                                        lineColor: "rgb(232, 234, 237)",
                                        placeholderColor: "black",
                                        clearIconMargin: '0px 10px',
                                        searchIconMargin: '0 0 0 20px'
                                    }}
                                    className='search'
                                />
                            </form>
                        </div>
                        <div className="recm-item dropdown">
                            <div className="flex items-center">
                                <span className='span-sort text-xs font-bold text-[#626161]'>Sort</span>
                                <div className="sort-wrapper">
                                    <select className="select-sort text-sm font-medium border rounded-full px-5 py-3" value={sortCriteria} onChange={handleSortChange}>
                                        <option value="recommended">Recommended</option>
                                        <option value="mostliked">Most Liked</option>
                                        <option value="mostviewed">Most Viewed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-3 mt-4">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <div key={item.id} className={`category-item cursor-pointer ${likedPosts.includes(item.id) ? 'bg-pink-500' : ''}`} onClick={() => openOverlay(item)}>
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
                                            <button className="be-like flex mr-2" onClick={(e) => { e.stopPropagation(); toggleLike(item); }}>
                                                <div className="li-icon w-2 h-auto text-[#959595] mr-[5px]">
                                                    <AiTwotoneLike className='w-3 h-auto'/>
                                                </div>
                                                <span className='text-xs font-medium text-black'>{item.likes}</span>
                                            </button>
                                            <button className="be-watch flex mr-2">
                                                <div className="wa-icon text-[#959595] mr-1 mt-[2px]">
                                                    <PiEyeDuotone className='w-3 h-auto'/>
                                                </div>
                                                <span className='text-xs font-medium text-[#959595]'>{item.watches}</span>
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
            </section>

            {selectedItem && (
                <OverlayComponent selectedItem={selectedItem} closeOverlay={closeOverlay} />
            )}
        </>
    );
};

export default GalleryComponent;

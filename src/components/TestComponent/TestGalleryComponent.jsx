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
import { openDB } from 'idb';

// Function to open IndexedDB
const initDB = async () => {
    return openDB('galleryDB', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('posts')) {
                db.createObjectStore('posts', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('users')) {
                db.createObjectStore('users', { keyPath: 'userId' });
            }
        },
    });
};

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
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortCriteria, setSortCriteria] = useState('recommended');
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [likedPosts, setLikedPosts] = useState([]);

    // Fetch data from IndexedDB
    const fetchData = async () => {
        const db = await initDB();
        const posts = await db.getAll('posts');
        const users = await db.getAll('users');
        // get logged in id from local storage
        
        const currrentUserId = parseInt(localStorage.getItem('user'));
        const user = users.find(user => user.userId === currrentUserId); // Replace with the logged-in user ID
        setCurrentUser(user);
        setLikedPosts(user ? user.likedPosts : []);
        setFilteredItems(posts);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateDB = async (store, key, value) => {
        const db = await initDB();
        await db.put(store, value);
    };

    useEffect(() => {
        const filtered = filteredItems.filter(item =>
            item.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(sortItems(filtered, sortCriteria));
    }, [searchTerm, sortCriteria]);

    const handleOnSearch = (string) => {
        if (string === '') {
            fetchData();
        }
        setSearchString(string);
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

    const toggleLike = async (post) => {
        const updatedLikedPosts = likedPosts.includes(post.id)
            ? likedPosts.filter(id => id !== post.id)
            : [...likedPosts, post.id];

        const updatedPost = {
            ...post,
            likes: likedPosts.includes(post.id) ? post.likes - 1 : post.likes + 1
        };

        setLikedPosts(updatedLikedPosts);
        setFilteredItems(
            filteredItems.map(item => item.id === post.id ? updatedPost : item)
        );

        console.log('updatedLikedPosts', updatedLikedPosts);

        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                likedPosts: updatedLikedPosts
            };
            setCurrentUser(updatedUser);
            await updateDB('users', currentUser.userId, updatedUser);
            await updateDB('posts', post.id, updatedPost);
        }
        console.log('updatedLikedPosts', currentUser);
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
                                    items={filteredItems.map(item => ({ id: item.id, text: item.text }))}
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

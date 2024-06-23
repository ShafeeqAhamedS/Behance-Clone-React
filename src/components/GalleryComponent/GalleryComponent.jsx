import React, { useState, useEffect } from 'react';
import { behanceItem } from '../../data';
import { PiEyeDuotone } from "react-icons/pi";
import { AiTwotoneLike } from "react-icons/ai";
import { GrLike } from "react-icons/gr";
import './GalleryComponent.css';
import { GoShare } from "react-icons/go";
import { IoFolderOpen } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import SearchComponent from './SearchComponent';

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
    const [filteredItems, setFilteredItems] = useState(behanceItem);
    const [searchString, setSearchString] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortCriteria, setSortCriteria] = useState('recommended');
    const [selectedItem, setSelectedItem] = useState(null);
    
    const extractedData = behanceItem.map(item => ({
        id: item.id,
        text: item.text
    }));

    useEffect(() => {
        const filtered = behanceItem.filter(item =>
            item.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(sortItems(filtered, sortCriteria));
    }, [searchTerm, sortCriteria]);

    const handleOnSearch = (string) => {
        if (string === '') {
            setFilteredItems(behanceItem);
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

    return (
        <>
            <section>
                    <SearchComponent
                        extractedData={extractedData}
                        searchString={searchString}
                        handleOnSearch={handleOnSearch}
                        handleOnSelect={handleOnSelect}
                        handleOnEnter={handleOnEnter}
                        handleSortChange={handleSortChange}
                        sortCriteria={sortCriteria}
                        handleSearchSubmit={handleSearchSubmit}
                    />
                <div className="container-fluid px-4 mt-14">
                    {/* <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-3 mt-4">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <div key={item.id} className="category-item cursor-pointer" onClick={() => openOverlay(item)}>
                                    <div className="cat-img relative h-80 overflow-hidden">
                                        <div className="bg-overlay"></div>
                                        <img src={item.img_url} alt={item.text} cla />
                                    </div>
                                    <div className="cat-info flex justify-between py-3">
                                        <div className="cat-name cursor-pointer">
                                            <h4 className='font-medium text-xs hover:underline leading-[15px] text-ellipsis'>{item.text}</h4>
                                            <span className='text-xs hover:underline text-[#959595]'>{item.user}</span>
                                        </div>
                                        <div className="be-time flex">
                                            <button className="be-like flex mr-2">
                                                <div className="li-icon w-2 h-auto text-[#959595] mr-[5px]">
                                                    <AiTwotoneLike className='w-3 h-auto'/>
                                                </div>
                                                <span className='text-xs font-medium text-[#959595]'>{item.likes}</span>
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
                    </div> */}
                </div>
            </section>

            {selectedItem && (
                <div className="overlay visible flex justify-end items-center w-full h-full fixed" onClick={closeOverlay}>
                    <div className="overlay-content h-full w-[95%] relative" onClick={(e) => e.stopPropagation()}>
                        <div className="overlay-sidebar flex flex-col items-center absolute right-0 top-0 py-20 justify-evenly px-3 rounded-full" onClick={(e) => e.stopPropagation()}>
                            <div className="sidebar-icon pb-4 flex flex-col items-center">
                                <div className="flex items-center justify-center bg-white rounded-full w-12 h-12 text-center cursor-pointer">
                                    <FaUserCircle size={40}/>
                                </div>
                                <p className='text-xs text-gray-400'>Follow</p>
                            </div>
                            <div className="sidebar-icon pb-4 flex flex-col items-center">
                                <div className="flex items-center justify-center bg-white rounded-full w-12 h-12 text-center cursor-pointer">
                                    <IoIosMail size={24} />
                                </div>
                                <p className='text-xs text-gray-400'>Hire</p>
                            </div>
                            <div className="sidebar-icon pb-4 flex flex-col items-center">
                                <div className="flex items-center justify-center bg-white rounded-full w-12 h-12 text-center cursor-pointer">
                                    <IoFolderOpen size={24}/>
                                </div>
                                <p className='text-xs text-gray-400'>Save</p>
                            </div>
                            <div className="sidebar-icon pb-4 flex flex-col items-center">
                                <div className="flex items-center justify-center bg-white rounded-full w-12 h-12 text-center cursor-pointer" >
                                    <GoShare size={24} />
                                </div>
                                <p className='text-xs text-gray-400'>Share</p>
                            </div>
                            <div className="sidebar-icon pb-4 flex flex-col items-center">
                                <div className="flex items-center justify-center bg-white rounded-full w-12 h-12 text-center cursor-pointer bg-blue-600">
                                    <GrLike size={24} style={{color:"white"}} />
                                </div>
                                <p className='text-xs text-gray-400'>Appreciate</p>
                            </div>
                        </div>
                        <div className="overlay-header flex items-center my-4">
                            <div className="flex items-center justify-center bg-gray-600 rounded-full w-8 h-8 text-center cursor-pointer absolute top-2 right-2" onClick={closeOverlay}>
                                <IoCloseSharp size={20} style={{color: "white"}}/>
                            </div>
                            <div className="overlay-user flex items-center justify-center bg-white w-12 h-12 rounded-full ">
                                <FaUserCircle size={40}/>
                            </div>
                            <div className="overlay-user-data ml-4">
                                <p className='text-base font-bold'>{selectedItem.text}</p>
                                <p className='text-xs'>{selectedItem.user} &nbsp; • &nbsp; Follow</p>
                            </div>
                        </div>
                        <div className="overlay-text flex justify-evenly"></div>
                        <div className="overlay-img flex justify-center align-center">
                            <div className="overlay-img-div">
                                <img src={selectedItem.img_url} alt={selectedItem.text} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GalleryComponent;

// OverlayComponent.js

import React from 'react';
import { GoShare } from "react-icons/go";
import { IoFolderOpen } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { GrLike } from "react-icons/gr";
import PropTypes from 'prop-types';

const OverlayComponent = ({ selectedItem, closeOverlay }) => {
    return (
        <div className="overlay visible flex justify-end items-center w-full h-full fixed" onClick={closeOverlay}>
            <div className="overlay-content h-full w-[95%] relative" onClick={(e) => e.stopPropagation()}>
                <div className="overlay-sidebar flex flex-col items-center absolute right-0 top-0 py-20 justify-evenly px-3 rounded-full hidden sm:flex" onClick={(e) => e.stopPropagation()}>
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
                    <div className="overlay-user flex items-center justify-center bg-white w-12 h-12 rounded-full "><FaUserCircle size={40}/></div>
                    <div className="overlay-user-data ml-4">
                        <p className='text-base font-bold'>{selectedItem.text}</p>
                        <p className='text-xs'>{selectedItem.user} &nbsp; • &nbsp; Follow</p>
                    </div>
                </div>
                <div className="overlay-img flex justify-center align-center">
                    <div className="overlay-img-div">
                        <img src={selectedItem.img_url} alt={selectedItem.text} />
                    </div>
                </div>
            </div>
        </div>
    );
};

OverlayComponent.propTypes = {
    selectedItem: PropTypes.object.isRequired,
    closeOverlay: PropTypes.func.isRequired
};

export default OverlayComponent;
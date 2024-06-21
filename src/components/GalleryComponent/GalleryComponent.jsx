import React, { useState } from 'react';
import { AiFillFolderOpen } from 'react-icons/ai';
import { behanceItem } from '../../data';
import { BiFilter, BiSearch, BiImage } from 'react-icons/bi';
import './GalleryComponent.css';
import { AiTwotoneLike } from "react-icons/ai";
import { PiEyeDuotone } from "react-icons/pi";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

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
    const [sortCriteria, setSortCriteria] = useState('recommended');

    const extractedData = behanceItem.map(item => ({
        id: item.id,
        text: item.text
    }));

    const handleOnSearch = (string) => {
        setSearchString(string);
    };

    const handleOnSelect = (item) => {
        const filtered = behanceItem.filter(i => 
            i.text.toLowerCase().includes(item.text.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const handleOnEnter = () => {
        const filtered = behanceItem.filter(item => 
            item.text.toLowerCase().includes(searchString.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const handleSortChange = (e) => {
        const newCriteria = e.target.value;
        setSortCriteria(newCriteria);
        setFilteredItems(sortItems(filteredItems, newCriteria));
    };

    const handleOnHover = (result) => {
        console.log(result);
    };

    return (
        <>
            <section>
                <div className="container-fluid px-4 mt-14">
                    <div className='w-2/6 px-14'>
                        <ReactSearchAutocomplete
                            items={extractedData}
                            fuseOptions={{ keys: ["text"] }}
                            resultStringKeyName="text"
                            onSearch={handleOnSearch}
                            onSelect={handleOnSelect}
                            onClear={() => setFilteredItems(behanceItem)}
                            maxResults={5}
                            showIcon={false}
                            placeholder={"Search the creative world at work"}
                            styling={{
                                zIndex: "100",
                                height: "40px",
                                border: "1px solid #dfe1e5",
                                borderRadius: "24px",
                                backgroundColor: "white",
                                boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
                                hoverBackgroundColor: "#eee",
                                color: "#212121",
                                fontSize: "16px",
                                fontFamily: "Arial",
                                iconColor: "grey",
                                lineColor: "rgb(232, 234, 237)",
                                placeholderColor: "grey",
                                clearIconMargin: '3px 14px 0 0',
                                searchIconMargin: '0 0 0 16px'
                            }}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') handleOnEnter();
                            }}
                        />
                    </div>
                    <div className="dropdown">
                        <label htmlFor="sortDropdown" className="mr-2">Sort By: </label>
                        <select id="sortDropdown" value={sortCriteria} onChange={handleSortChange}>
                            <option value="recommended">Recommended</option>
                            <option value="mostliked">Most Liked</option>
                            <option value="mostviewed">Most Viewed</option>
                        </select>
                    </div>
                    <div className="grid md:grid-cols-3 md:py-16 lg:grid-cols-5 sm:grid-cols-2 gap-3">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="category-item cursor-pointer">
                                <div className="cat-img relative overflow-hidden rounded-md">
                                    <div className="bg-overlay"></div>
                                    <img src={item.img_url} alt={item.text} />
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
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default GalleryComponent;

import React from 'react';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { IoFilterSharp } from "react-icons/io5";
import './GalleryComponent.css';

const SearchComponent = ({
  extractedData,
  searchString,
  handleOnSearch,
  handleOnSelect,
  handleOnEnter,
  handleSortChange,
  sortCriteria,
  handleSearchSubmit
}) => {
  return (
    <div className=" sm:flex items-center top-14 sm:top-14 sm:top-[3.8rem] h-[8.75rem] sm:h-20 fixed w-[98%] mx-4 z-10 bg-white">
      <div className="flex items-center border rounded-full px-7 py-2 w-fit text-center text-lg font-semibold hidden lg:flex">
        <IoFilterSharp className='pr-5 w-max'/>
        <span>Filter</span>
      </div>
      <div className='w-[100%] pt-5 sm:pt-0 pl-2 pr-7 sm:pr-0 lg:pl-7  '>
        <form onSubmit={handleSearchSubmit}>
          <ReactSearchAutocomplete
            items={extractedData}
            fuseOptions={{ keys: ["text"] }}
            resultStringKeyName="text"
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            onClear={() => handleOnSearch('')}
            onEnter={handleOnEnter}
            maxResults={5}
            showIcon={true}
            placeholder={"Search the creative world at work"}
            styling={{
              zIndex: "1",
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
      <div className="recm-item dropdown mr-10 relative top-5 sm:top-0 lg:pr-0 xl:pr-0">
        <div className="flex items-center">
          <span className='span-sort pl-8 text-md text-black sm:text-xs font-bold sm:text-[#626161] px-4 sm:relative'>Sort</span>
          <div className="sort-wrapper ">
            <select
              className="select-sort text-sm font-medium border rounded-full px-24 sm:px-5 py-3"
              value={sortCriteria}
              onChange={handleSortChange}
            >
              <option value="recommended">Recommended</option>
              <option value="mostliked">Most Liked</option>
              <option value="mostviewed">Most Viewed</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;

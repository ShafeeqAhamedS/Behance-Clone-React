import React from 'react';
import TextField from '@mui/material/TextField';
import { behanceItem } from '../../data';
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const TestComponent = () => {
  const extractedData = behanceItem.map(item => ({
      id: item.id,
      text: item.text
  }));

  console.log(extractedData);

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  return (
    <div className='w-2 px-14'>
      <h1>Test Component</h1>
      <ReactSearchAutocomplete
       items={extractedData}
       fuseOptions={{ keys: ["text"] }}
       // necessary, otherwise the results will be blank
       resultStringKeyName="text"
       onHover={handleOnHover}
       maxResults={5}
       showIcon={false}
       placeholder={"Search the creative world at work"}
       styling={
        {
             height: "40px",
             width: "50px",
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
          }
       }
     />
    </div>
  );
}

export default TestComponent;


import React, { useState,useEffect } from 'react';
import { serveEnrollForm } from '../services/user-service';
const MyTest = () => {
  // Sample data for select boxes
  const selectBoxesData = [
    {
      id: 'selectBox1',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ],
    },
    {
      id: 'selectBox2',
      options: [
        { value: 'optionA', label: 'Option A' },
        { value: 'optionB', label: 'Option B' },
        { value: 'optionC', label: 'Option C' },
      ],
    },
    // Add more select box configurations as needed
  ];

  // State to hold the selected values
  const [selectedValues, setSelectedValues] = useState({});
  const [st, setSt] = useState();

  // Function to handle value change for a specific select box
  const handleSelectChange = (e, selectId) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [selectId]: e.target.value,
    }));
  };
  const serveUrl=(uRoll)=>{
    serveEnrollForm(uRoll).then((data)=>{
      console.log("url: ")
      setSt(data)
      alert(data)
      window.location.href=data;
    }).catch((error)=>{
      console.log(error)
      if(error.response.status === 400 || error.response.status === 404)
        console.log(error.response.data)
    })
  }
  useEffect(()=>{
    
    serveUrl(201160100110049)
  },[]);
  return (
    <div>
      {/* Dynamic Select Boxes */}
     {JSON.stringify(st)}
    </div>
  );
}

export default MyTest




import './App.css';
import React, { useState } from 'react';
import TextBox from './TextBox';

import { useEffect } from 'react';
// import { Sapling } from "@saplingai/sapling-js/observer";

// $.ajax({
//   type: "POST",
//   url: "~/pythoncode.py",
//   data: { param: text}
// }).done(function( o ) {
//    // do something
// });

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

function App() {
  // useEffect(() => {
  //   Sapling.init({
  //     endpointHostname: 'http://127.0.0.1:5000',
  //     saplingPathPrefix: '/sapling',
  //     lang: 'en'
  //   });

  //   // Original
  //   const editor = document.getElementById('editor');
  //   Sapling.observe(editor);

  //   // New to reduce API usage
  //   // const editable = document.getElementById('editor');
  //   // Sapling.checkOnce(editable);
  // });

  const [textFileContent, setTextFileContent] = useState('');
  const [currentDate] = useState(getDate());

  useEffect(() => {
    const fetchTextFile = async () => {
      try {
        const response = await fetch('/today.txt');
        if (response.ok) {
          const content = await response.text();
          setTextFileContent(content);
        } else {
          console.error('Failed to fetch the text file.');
        }
      } catch (error) {
        console.error('Error fetching the text file:', error);
      }
    };

    fetchTextFile();
  }, []); // Empty dependency array to run the effect once on mount

  return (
    <div className='prompt'>
        <h1>Daily Italian Prompt</h1>
        <h2>{currentDate}</h2>
        <p>{textFileContent}</p>
        <TextBox />
    </div>
    // <div
    //   id="editor"
    //   sapling-ignore="true"
    //   contentEditable="true"
    //   style={{
    //     margin: '40px auto',
    //     padding: '10px',
    //     border: '2px solid black',
    //     width: '500px',
    //     height: '200px'
    //   }}>
    //   Lets get started!
    // </div>
  );
}

export default App;
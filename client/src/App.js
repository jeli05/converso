import './App.css';
import React, { useState } from 'react';
import TextBox from './TextBox';

import { useEffect } from 'react';
// import textFileContent from './today.txt';
// import { Sapling } from "@saplingai/sapling-js/observer";

// $.ajax({
//   type: "POST",
//   url: "~/pythoncode.py",
//   data: { param: text}
// }).done(function( o ) {
//    // do something
// });

// const response = await fetch('http://localhost/today.txt');
// const data = await response.text();
// console.log(data);

function App() {
  useEffect(() => {
    // Sapling.init({
    //   endpointHostname: 'http://127.0.0.1:5000',
    //   saplingPathPrefix: '/sapling',
    //   lang: 'it'
    // });

    // Original
    // const editor = document.getElementById('editor');
    // Sapling.observe(editor);

    // New to reduce API usage
    // const editable = document.getElementById('editor');
    // Sapling.checkOnce(editable);
  });

  const [textFileContent, setTextFileContent] = useState('');

  useEffect(() => {
    const fetchTextFile = async () => {
      try {
        const response = await fetch('/today.txt'); //('/static/media/today.04f179f71d91cc01da24.txt');
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
    <div>
        <h1>Daily Italian Prompt</h1>
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
import './App.css';
import React, { useState } from 'react';
import TextBox from './TextBox';
import { it_prompts, de_prompts } from './Prompts.js';

// import { useEffect } from 'react';
// import { Sapling } from "@saplingai/sapling-js/observer";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

let currLang = 'en';
let languages = {'en': 'English', 'fr': 'French', 'es': 'Spanish', 'it': 'Italian', 'de': 'German', 'pt': 'Portuguese'};

function setPrompts() {
  localStorage.setItem('it_prompts', JSON.stringify(it_prompts));
  localStorage.setItem('de_prompts', JSON.stringify(de_prompts));
}

function displayPrompt(lang) {
  console.log("display lang: ", lang);

  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  console.log(start);
  var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  console.log('Day of year: ' + day);

  if (lang === 'it') {
    return it_prompts[day];
  } else if (lang === 'de') {
    return de_prompts[day];
  } else {
    return "No prompt available";
  }
}

// initialize responses item in local storage
if (localStorage.getItem('currLang') === null) {
  localStorage.setItem('currLang', JSON.stringify('en'));
}

console.log("Initial currLang: ", localStorage.getItem('currLang'));
let today_prompt = displayPrompt(JSON.parse(localStorage.getItem('currLang')));

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

  // initialize local storage of prompts
  setPrompts();

  const [currentDate] = useState(getDate());

  const [currentLang, setLang] = useState(JSON.parse(localStorage.getItem('currLang'))); // important to parse first

  currLang = currentLang;
  console.log("Refreshed currLang: ", currLang);

  function changeLanguage(event) {
    setLang(event.target.value);
    currLang = event.target.value;
    localStorage.setItem('currLang', JSON.stringify(event.target.value));
    console.log("Switched to " + JSON.stringify(event.target.value) + ": " + languages[currLang]);
    today_prompt = displayPrompt(event.target.value);
  }

  return (
    <div className='prompt'>
        <h1>Converso: Daily Language Prompts</h1>
        <h2>{currentDate}</h2>
        <h3>Language: {languages[currentLang]}</h3>
        {/* <h3>Language 2: {currentLang}</h3> */}
        <select value={currLang} onChange={changeLanguage}>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
          <option value="de">German</option>
        </select>
        <p>{today_prompt}</p>
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
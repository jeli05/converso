// TextBox.js

import React, { useState } from 'react';
import './TextBox.css'; // Import the CSS file for styling
import { Sapling } from "@saplingai/sapling-js/observer";
import { useEffect } from 'react';

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
}

// append to local storage variable 
function appendToStorage(name, data){
    var old = localStorage.getItem(name);
    if(old === null) old = "";
    localStorage.setItem(name, old + data);
}

// initialize responses item in local storage
if (localStorage.getItem('responses') === null) {
    localStorage.setItem('responses', '');
}

const TextBox = () => {
    // state to make text box uneditable after submit
  const [isEditable, setIsEditable] = useState(true);
  
  useEffect(() => {
    Sapling.init({
    endpointHostname: 'http://127.0.0.1:5000',
    saplingPathPrefix: '/sapling',
    lang: 'it'
    });
});

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    // fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    
    // make text box uneditable
    setIsEditable(false);
    
    let todayDate = getDate();
    let currentLang = localStorage.getItem('currLang');
    let entry = {};
    let subentry = {};
    subentry[currentLang] = formJson;
    entry[todayDate] = subentry;
    console.log(entry);
    appendToStorage('responses', JSON.stringify(entry));

    // use Sapling
    const editor = document.getElementById('editor');
    Sapling.observe(editor);
  }

  return (
    <div className="textbox-container">
        <form method="post" onSubmit={handleSubmit}>
        <label>
            <textarea
            name="postContent"
            rows={4}
            cols={40}
            style={{resize: "none"}}
            placeholder='Type your response'
            disabled={!isEditable}
            id="editor"
            />
            <p>70-130 characters</p>
        </label>
        <hr />
        <button type="submit" disabled={!isEditable}>Check grammar</button>
        </form>
    </div>
  );
};

export default TextBox;
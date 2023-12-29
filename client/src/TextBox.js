// TextBox.js

import React, { useState } from 'react';
import './TextBox.css'; // Import the CSS file for styling

const TextBox = () => {
  // State to hold the value of the input
  const [inputValue, setInputValue] = useState('');
  // State to hold the text to be displayed when the button is clicked
  const [displayedText, setDisplayedText] = useState('');

  // Event handler to update the state when the input changes
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Event handler to update the displayed text when the button is clicked
  const handleButtonClick = () => {
    setDisplayedText(inputValue);
  };

  return (
    <div className="textbox-container">
      {/* Input element with value and onChange event */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
        className="custom-input"
      />

      {/* Button to display the typed text */}
      <button onClick={handleButtonClick}>Submit</button>

      {/* Display the current input value */}
      <p>You typed: {displayedText}</p>
    </div>
  );
};

export default TextBox;
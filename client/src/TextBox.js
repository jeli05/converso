// TextBox.js

import React, { useState } from 'react';
import './TextBox.css'; // Import the CSS file for styling

const TextBox = () => {
    // state to make text box uneditable after submit
  const [isEditable, setIsEditable] = useState(true);

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
            />
            <p>70-130 characters</p>
        </label>
        <hr />
        <button type="submit">Check grammar</button>
        </form>
    </div>
  );
};

export default TextBox;
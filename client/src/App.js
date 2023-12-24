import './App.css';

import { useEffect } from 'react';
import { Sapling } from "@saplingai/sapling-js/observer";

function App() {
  useEffect(() => {
    Sapling.init({
      endpointHostname: 'http://127.0.0.1:5000',
      saplingPathPrefix: '/sapling',
      lang: 'it'
    });

    // const editor = document.getElementById('editor');
    // Sapling.observe(editor);
    const editable = document.getElementById('editor');
    Sapling.checkOnce(editable);
  });

  return (
    <div
      id="editor"
      sapling-ignore="true"
      contentEditable="true"
      style={{
        margin: '40px auto',
        padding: '10px',
        border: '2px solid black',
        width: '500px',
        height: '200px'
      }}>
      Lets get started!
    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000')
      .then((response) => response.json())
      .then(
        (response) => {
          setState(response);
        },

        (error) => {
          console.log(error);
        }
      );
  }, [state]);

  return <div>{state}</div>;
}

export default App;
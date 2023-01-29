//Create a react component that input a textarea message then perform a fetch request to localost:3001 gets back a response as a data.message and displays that message in a bos below


import React, {useState} from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [expert, setExpert] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
      body: JSON.stringify({ expert }),
    })
      .then((res) => res.json())
      .then((data) => setResponse([data.expert, data.message]))
      // .then((data) => setResponse(data.message))
      console.log(data)
  };

  return(
    <div className="App" id='app'>
      <h1>ChatGPT For You</h1>
      <form onSubmit={handleSubmit} id='form'>
        <textarea id='tysm'
          value={expert}
          placeholder="What's your problem dude?" 
          onChange={(e) => setExpert(e.target.value)}
        ></textarea><br></br>
        <textarea id='ques'
          value={message}
          placeholder="What's your problem dude?" 
          onChange={(e) => setMessage(e.target.value)}
        ></textarea><br></br>
        <button type="submit">Submit</button>
      </form>
      {response && <div><b>Expert:</b> {response}</div>}
    </div>
  )
}

export default App
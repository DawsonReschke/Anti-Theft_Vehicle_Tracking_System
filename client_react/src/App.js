import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authenticate,selectAuth,logout,login } from './redux/authReducer';

function App() {
  const dispatch = useDispatch(); 
  const isAuthenticated = useSelector(selectAuth)
  useEffect(()=>{
    dispatch(authenticate())
  },[dispatch])
    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <br></br>
          {isAuthenticated ? <button onClick={() => dispatch(logout())}>logout</button> : <button onClick={() => dispatch(login())}>login</button>}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reacts
        </a>
      </header>
    </div>
  );
}

export default App;

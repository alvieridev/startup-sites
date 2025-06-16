import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  const onClick = async () => {
    // setCount((count) => count + 1)
       try {
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        
        if (tab) {
            chrome.scripting.executeScript({
                target: {tabId: tab.id!},
                func: () => {
                    // document.body
                    alert("Hello From Alvieri");
                }
            });
        } else {
            console.error("No active tab found");
        }
    } catch (error) {
        console.error("Error:", error);
    }

  }

  return (
    <>
      <div className='border border-green-500'>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>StartUp Sites</h1>
      <div className="card">
        <button onClick={onClick}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

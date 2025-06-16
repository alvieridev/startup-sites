// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import PopUp from './popup/PopUp'

function App() {
  // const [count, setCount] = useState(0)
  
  // const onClick = async () => {
  //   // setCount((count) => count + 1)
  //      try {
  //       const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        
  //       if (tab) {
  //           chrome.scripting.executeScript({
  //               target: {tabId: tab.id!},
  //               func: () => {
  //                   // document.body
  //                   alert("Hello From Alvieri");
  //               }
  //           });
  //       } else {
  //           console.error("No active tab found");
  //       }
  //   } catch (error) {
  //       console.error("Error:", error);
  //   }

  // }

  return (
    <>
      <PopUp />
    </>
  )
}

export default App

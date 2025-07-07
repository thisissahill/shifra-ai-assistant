import React, { useContext, useEffect } from 'react'
import "./App.css"
import va from "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import { Datacontext } from './context/UserContext';
import speakingGif from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";

function App() {
  let {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    response,
    setPrompt,
    setResponse,
    speak 
  } = useContext(Datacontext);

  
  useEffect(() => {
    speak("hello");
  }, []);

  return (
    <div className='main'>
      <img src={va} alt="" id="shifra" />
      <span>I'm Shifra , Your Advanced Virtual Assistant </span> 

      {!speaking ? (
        <button onClick={() => {
          setPrompt("listening...");
          setSpeaking(true);
          setResponse(false);
          recognition.start();
        }}>
          Click here <CiMicrophoneOn />
        </button>
      ) : (
        <div className='response'>
          {!response ? (
            <img src={speakingGif} alt="" id="speak" />
          ) : (
            <img src={aigif} alt="" id="aigif" />
          )}
          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
}

export default App;


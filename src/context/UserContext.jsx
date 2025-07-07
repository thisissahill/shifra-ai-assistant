import React, { createContext, useState } from 'react';
import run from '../gemini';

export const Datacontext = createContext();

function UserContext({ children }) {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState("listening...");
  let [response, setResponse] = useState(false);

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "hi-IN";
    window.speechSynthesis.speak(utterance);
  }

  async function aiResponse(prompt) {
    let text = await run(prompt);
    let newText=text.split("**")&&text.split("**")&&text
      .replace(/google/gi, "Sahil Shaikh")&&text.replace("Google","Sahil Shaikh");

    setPrompt(newText);
    speak(newText);
    setResponse(true);
    setTimeout(() => setSpeaking(false), 5000);
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-IN';

    recognition.onresult = (e) => {
      let currentIndex = e.resultIndex;
      let transcript = e.results[currentIndex][0].transcript;
      setPrompt(transcript);
      takeCommand(transcript.toLowerCase());
    };
  } else {
    console.warn("Speech Recognition is not supported in this browser.");
  }

  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("Opening YouTube");
      setPrompt("Opening YouTube..");
    } else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com/", "_blank");
      speak("Opening Google");
      setPrompt("Opening Google..");
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com/", "_blank");
      speak("Opening Instagram");
      setPrompt("Opening Instagram..");
    } else if (command.includes("time")) {
      let time = new Date().toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      speak(time);
      setPrompt(time);
    } else if (command.includes("date")) {
      let date = new Date().toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
      });
      speak(date);
      setPrompt(date);
    } else {
      aiResponse(command);
    }

    setResponse(true);
    setTimeout(() => setSpeaking(false), 5000);
  }

  const value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
    speak,
  };

  return (
    <Datacontext.Provider value={value}>
      {children}
    </Datacontext.Provider>
  );
}

export default UserContext;

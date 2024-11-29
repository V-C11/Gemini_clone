// // src/context/ContextProvider.js
// import { createContext, useState } from "react";
// import run from "../src/config/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//   const [input, setInput] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [prevPrompt, setPrevPrompt] = useState([]);
//   const [showResult, setShowResult] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [resultData, setResultData] = useState("");

//   const delayPara = (index,newWord) => {
//     setTimeout(function (){
//         setResultData(prev =>prev+newWord)
//     },75*index)
//   }

//   const newChat = () => {
//     setLoading(false)
//     setShowResult(false)
//   }

//   const onSet = async (prompt) => {
//     setResultData("");
//     setLoading(true);
//     setShowResult(true);
//     let response;
//     if (prompt !== undefined) {
//         response await run(prompt);
//         setRecentPrompt(prompt);
//     }
//     else{
//         setPrevPrompt(prev => [...prev, input])
//         setRecentPrompt(input)
//         response = await run(input)
//     }
//     setRecentPrompt(input)
//     setPrevPrompt(prev => [...prev, input])
//     const response = await run(input);
//     let responseArray = response.split("**");
//     let newResponse = "";
//     for(let i = 0; i < responseArray.length; i++){
//         if(i===0 || i%2 !== 1){
//             newResponse += responseArray[i]
//         }
//         else{
//             newResponse += "<b>" + responseArray[i] + "</b>"
//         }
//     }
//     let newResponse2 = newResponse.split("*").join("</br>")
//     let newResponseArray = newResponse2.split(" ")
//     for(let i=0; i<newResponseArray.length; i++)
//     {
//         const newWord = newResponseArray[i]
//         delayPara(i,newWord+" ")
//     }
//     setLoading(false);
//     setInput("");
//   };

//   const contextValue = {
//     onSet,
//     prevPrompt,
//     setPrevPrompt,
//     recentPrompt,
//     setRecentPrompt,
//     showResult,
//     loading,
//     resultData,
//     input,
//     setInput,
//     newChat
//   };

//   return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
// };

// export default ContextProvider;

// // import { createContext, useState } from "react";
// // import run from "../src/config/gemini";

// // export const Context = createContext();

// // const ContextProvider = (props) => {

// //     const [input,setInput] = useState('')
// //     const [recentPrompt, setRecentPrompt] = useState('')
// //     const [prevPrompt, setPrevPrompt] = useState([])
// //     const [showResult,setShowResult] = useState(false)
// //     const [loading, setLoading] = useState(false)
// //     const [resultData, setResultData] = useState("")

// //     const onSet = async (prompt) => {
// //         setResultData("")
// //         setLoading(true)
// //         setShowResult(true)
// //         const response = await run(input)
// //         setResultData(response)
// //         setLoading(false)
// //         setInput('')
// //     }

// //     onSet("What is React js")

// //     const contextValue = {
// //         onSet,
// //         prevPrompt,
// //         setPrevPrompt,
// //         recentPrompt,
// //         setRecentPrompt,
// //         showResult,
// //         loading,
// //         resultData,
// //         input,
// //         setInput
// //     }
// //     return (
// //         <Context.Provider value={contextValue}>
// //             {props.children}
// //         </Context.Provider>
// //     )
// // }

// // export default ContextProvider

// src/context/ContextProvider.js
import { createContext, useState } from "react";
import run from "../src/config/gemini"; // Make sure the path to 'gemini' is correct

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Function to create a delay in displaying each word
  const delayPara = (index, newWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + newWord);
    }, 75 * index);
  };

  // Function to reset the chat view
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  // Main function to handle prompt submission
  const onSet = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt !== undefined) {
      response = await run(prompt); // Run function with passed prompt
      setRecentPrompt(prompt);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input); // Run function with input from state
    }

    // Format the response text for display
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    // Replace line breaks and split into words
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");

    // Display each word with a delay
    for (let i = 0; i < newResponseArray.length; i++) {
      const newWord = newResponseArray[i];
      delayPara(i, newWord + " ");
    }

    setLoading(false);
    setInput("");
  };

  // Context values to provide throughout the app
  const contextValue = {
    onSet,
    prevPrompt,
    setPrevPrompt,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;

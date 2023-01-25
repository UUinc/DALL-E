import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import './App.css'

function App() 
{
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });
  const openai = new OpenAIApi(configuration);
  
  const generateImage = async () =>{
    console.log("generating...");
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    setResult(res.data.data[0].url);
  };

  return (
    <div className='app-main'>
      <h2>Text To Image</h2>
      <input className='app-input' placeholder='Type text to generate to image' type='text' onChange={(e)=> setPrompt(e.target.value)}/>
      <button onClick={generateImage}>Generate Image</button>
      
      {
        result.length > 0 ? 
        <img className='app-image' src={result} alt={prompt} /> 
        :
        <></>
      }
      
    </div>
  );
}

export default App

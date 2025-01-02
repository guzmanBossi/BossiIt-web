import { useState, useRef, useEffect } from 'react'
import './Home.css'

function Home() {

  const [hasBeenCleared, setHasBeenCleared] = useState(false);
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<JSX.Element[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])


  // console.log("hasBeenCleared", hasBeenCleared);
  return (
    <>
      <div id="screen" className="w-screen h-screen flex  bg-black font-[VT323]">
        <div id="screen-content" className="relative w-[70%] max-w-[1200px]  h-[95%] bg-green-900 mx-auto my-auto">
          <img src="/src/assets/scanlines.png" className="w-full h-full absolute top-0 left-0" />
          <img src="/src/assets/bezel.png" className="w-full h-full absolute top-0 left-0" />
          <div className="absolute top-[8%] left-[7%] text-opacity-50 w-[85%]">

            {!hasBeenCleared && <div className="whitespace-pre-line">
              == Welcome to Bossi IT ==<br />
              Copyright (c) 1998-2035 Bossi IT<br />
              For a list of available commands, type "help"<br />
              <br />
            </div>}

            <div className="whitespace-pre-line">
              {output}
            </div>
            {renderTerminalInputArea()}
          </div>
        </div>
      </div>
    </>
  )

  function renderTerminalInputArea() {
    return (
      <div className="">
        {getInputPromptPrefix()}
        <input
          className="bg-transparent border-none outline-none opacity-0 whitespace-pre-line caret-transparent "
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInput}
        />
      </div>
    )
  }

  function getInputPromptPrefix() {
    return (<div className="caret-underscore ">&gt;<span className="ml-1">{input}</span><span>&nbsp;</span></div>);
  }

  function handleInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {

      let newKey = key;

      if (input === "clear") {
        let newOutput: JSX.Element[] = [];
        setHasBeenCleared(true);
        setOutput(newOutput)
        setInput("")
        return;
      }

      let newOutput = [...output]

      // setKey(key + 1);
      newKey = newKey + 1;
      //first add the new input
      let inputRow = <div key={newKey}>&gt;<span className="ml-1">{input}</span><span>&nbsp;</span></div>;
      newOutput.push(inputRow)

      //then add the result of the input
      newKey = newKey + 1;

      let outputElement = getResultFromInput(input, newKey)
      newOutput.push(outputElement)

      //if new output is longer than 12, remove the first element
      //detta är en dålig idé eftersom ett element i output kan vara flera rader
      //gör detta robust med maxheight istället
      //tydligen kan man alltid ha scrollat längst ner om listan är uppoch ner
      //och man har flex column reverse eller liknande
      
      // console.log("NEW OUTPUT length", newOutput.length)
      // if (newOutput.length > 11) {
      //   let amountToRemove = newOutput.length - 10;
      //   console.log("AMOUNT TO REMOVE", amountToRemove)
      //   newOutput = newOutput.slice(amountToRemove);
      //   // console.log("REMOVED")
      // }

      //last refresh output and clear the input
      setOutput(newOutput)
      setInput("")
      setKey(newKey)
    }
  }

  function getResultFromInput(input: string, key: number): JSX.Element {
    switch (input) {
      case "h":
      case "help":
        return getHelpSection(key)
      default:
        return <div key={key}>I don't know what to say.</div>
    }
  }

  function getHelpSection(key: number): JSX.Element {

    return <div key={key} className="flex flex-col">
      {getHelpRow("clear", "clear the screen", key)}
      {getHelpRow("camel", "see some camels", key)}


    </div>

  }


  function getHelpRow(command: string, description: string, key: number): JSX.Element {
    return <div key={command + key} className="flex flex-row">
      <div className="w-1/4">{command}</div>
      <div className="w-3/4">-- {description}</div>
    </div>
  }

}

export default Home

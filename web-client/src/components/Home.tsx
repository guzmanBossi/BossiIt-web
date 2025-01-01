import { useState, useRef, useEffect } from 'react'
import './Home.css'

function Home() {

  const [input, setInput] = useState("")
  const [output, setOutput] = useState<JSX.Element[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <>
      <div id="screen" className="w-screen h-screen flex  bg-black font-[VT323]">
        <div id="screen-content" className="relative w-[95%]  h-[95%] bg-green-900 mx-auto my-auto">
          <img src="/src/assets/scanlines.png" className="w-full h-full absolute top-0 left-0" />
          <img src="/src/assets/bezel.png" className="w-full h-full absolute top-0 left-0" />
          <div className="absolute top-[8%] left-[7%] text-yellow-500 text-2xl text-opacity-50">
            HEJ HEJ HUR MÅR DU?<br />
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
      <div className="bg-transparent border-none outline-none text-yellow-500 text-2xl text-opacity-50">
        {getInputPromptPrefix()}
        <input
          className="bg-transparent border-none outline-none text-yellow-500 text-2xl text-opacity-50 whitespace-pre-line"
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
    return "> ";
  }

  function handleInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {

      let newOutput = [...output]

      //first add the new input 
      let inputRow = <div>{getInputPromptPrefix() + input + "\n"}</div>;
      newOutput.push(inputRow)

      //then add the result of the input 
      let outputElement = getResultFromInput(input)
      newOutput.push(outputElement)

      //last refresh output and clear the input
      setOutput(newOutput)
      setInput("")
    }
  }


  function getResultFromInput(input: string) : JSX.Element {
    switch (input) {
      case "hello":
        return <div>Hello, how are you?</div>
      default:
        return <div>I don't know what to say.</div>
    }
  }

}

export default Home

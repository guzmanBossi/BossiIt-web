import './Home.css'

function Home() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div id="screen" className="w-screen h-screen flex  bg-black font-[VT323]">
        <div id="screen-content" className="relative w-[95%]  h-[95%] bg-green-900 mx-auto my-auto">
          <img src="/src/assets/scanlines.png" className="w-full h-full absolute top-0 left-0" />
          <img src="/src/assets/bezel.png" className="w-full h-full absolute top-0 left-0" />
          <div className="absolute top-[10%] left-[10%] text-yellow-500 text-2xl text-opacity-50">
            Hej Hej hur mår du?
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

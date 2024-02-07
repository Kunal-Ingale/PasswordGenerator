import { useState,useCallback, useEffect ,useRef} from "react"


function App() {
  const[length,setLength] = useState(8)
  const[numsallowed,setNumsallowed] = useState(false)
  const[charallowed,setCharallowed] = useState(false)
  const[password,setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
   
    let pass=""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numsallowed) str+="0123456789"
    if(charallowed) str+="~!@#$%^&*(){}[];:?/|<>.,"
    
    for(let i=0 ; i<length;i++)
    {
       let char =Math.floor(Math.random()* str.length+1)
       pass += str.charAt(char) 
    }
    setPassword(pass)
  } ,
  [length,numsallowed,charallowed])
 
  useEffect(()=>{
    passwordGenerator() 
  },[length,numsallowed,charallowed,passwordGenerator])
  
const copyToClipboard=()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
}


     
  
  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
     
     <input 
       type="text" 
       value={password}
       className="outline-none w-full py-1 px-3"
       placeholder="Password" 
       readOnly
       ref={passwordRef}
     />
     <button className="'outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'" 
     onClick={copyToClipboard}>Copy</button>
    
    </div>
    <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input 
        type="range"
        min={3}
        max={30}
        value={length}
        className="cursor-pointer"
        onChange={(e)=> setLength(e.target.value)
        }
        />
        <label >Length:{length}</label>


      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox"
        defaultChecked= {numsallowed}
        id="number input"
        onChange={()=> setNumsallowed((prev)=> !prev)} />  
        {/* for changing True and false in  in CheckBox */}
        <label >Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
        <input type="checkbox"
        defaultChecked= {charallowed}
        id="number input"
        onChange={()=> setCharallowed((prev)=> !prev)} />  
        {/* for changing True and false in  in CheckBox */}
        <label >Characters</label>
        </div>

    </div>

    </div>
    </>
  )
}

export default App

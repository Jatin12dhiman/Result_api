import React, { useState } from 'react'

const ResultChecker = () => {
  const [id,setId]= useState("");
  const [result, setResult] = useState(null);

  const fetchResut = async ()=>{
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await res.json();
    setResult(data);

  }
  
  return (
    <div className="">
  <div className="text-center">
    <h2 className="text-3xl font-bold underline mb-4">
      Result Checker
    </h2>
    <div>
      <input 
        type="text" 
        placeholder="Enter id (1-10)" 
        className="border-2 border-black p-2"
        value={id} 
        onChange={(e)=>setId(e.target.value)} 
      />
      <button 
        className="bg-blue-500 text-white p-2 m-2 rounded" 
        onClick={fetchResut}
      >
        Check Result
      </button>
    </div>
    {result && (
      <div className="mt-4">
        <p><b>Name:</b> {result.name}</p>
        <p><b>Email:</b> {result.email}</p>
      </div>
    )}
  </div>
</div>

  )
}

export default ResultChecker

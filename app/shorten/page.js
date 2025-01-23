"use client"
import React from 'react'
import { useState } from 'react'

function Shorten() {
    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generate, setgenerate] = useState(false)

    const generate1 = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "url": url,
          "shorturl": shorturl 
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("/api/generate", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            seturl("")
            setshorturl("")
            setgenerate(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
            console.log(result);
            alert(result.message);
          })
          .catch((error) => console.error(error));
    }
  return (
    <div className="mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4 ">
      <h1 className="text-black font-bold text-2xl"> Make your URL short !</h1>
      <div className="flex flex-col m-5 my-3 p-3">
        <input
          type="text"
          value={url}
          className="px-4 py-2 focus:outline-purple-600 rounded-md text-fuchsia-950 font-bold"
          placeholder="Enter your URL"
          onChange={(e) => {
            seturl(e.target.value);
          }}
        />
        <input
          type="text"
          value={shorturl}
          className="px-4 py-2 max-w-full focus:outline-purple-600 rounded-md relative text-fuchsia-950 font-bold"
          placeholder="Enter your preffered short url"
          onChange={(e) => {
            setshorturl(e.target.value);
          }}
        />
        <button
          className="bg-purple-500 rounded-lg p-3 shadow-lg font-bold text-white gap-2"
          onClick={generate1}
        >
          Generate
        </button>
      </div>
      
    </div>
  );
}

export default Shorten
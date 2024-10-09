"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [image, setImage] = useState(null);
  const [allImages, setAllImages] = useState([])

  const FetchImage = async () => {
    const response = await axios.get("/api/upload")
    const data = await response.data;
    setAllImages(data.files)
  }


  useEffect(() => {
    FetchImage()
  }, [])

  const OnSubmitHandler = async (e) => {
    e.preventDefault()

    if (!image) {
      alert("please upload image and try again")
      return;
    }

    const formData = new FormData()
    formData.append("image", image)

    const response = await axios.post("/api/upload", formData)
    const data = await response.data;
    FetchImage()
  }
  return (
    <div>
      <form onSubmit={OnSubmitHandler} className="w-[500px] mx-auto mt-10">
        <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="photo" />
        <button type="submit" className="bg-slate-600 text-white rounded py-1 px-4">Upload</button>
      </form>
      <div className="px-20 py-20 grid grid-cols-4 gap-5">
        {
          allImages.map((img, i) => (
            <div key={i} className="w-full">
              <img className="w-full h-full object-cover" src={`/images/${img}`} alt="photo" />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home
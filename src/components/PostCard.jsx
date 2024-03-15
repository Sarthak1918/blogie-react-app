import React from 'react'
import dbServerice from "../appwrite/dbServerice.js"
import { Link } from 'react-router-dom'
import {motion} from "framer-motion"
import { fadeIn } from './framer.js'

//$id -> id of a specific post.
//featuredImage -> id of the image.

function PostCard({$id,title,featuredImage,userName}) {
  return (
    <motion.div 
    initial = "hidden"
    animate = "show"
    variants={fadeIn("up",0.2,0.7)}
    className='w-full'>
      <Link to={`/post/${$id}`} className='max-w-[300px] max-h-[350px] rounded-2xl flex flex-col justify-center gap-2 p-5 bg-[#35374B] text-gray-200  border-2 border-gray-600'>
        <div className='overflow-hidden bg-center bg-cover bg-no-repeat'>
            <img  src={dbServerice.getFilePreview(featuredImage)} alt={title}  className='rounded-xl mx-auto'/>
        </div>
        <div className='text-[15px] font-semibold'>
            {title}
        </div>
        <div className='flex justify-end text-xs mt-1'>
          <p>~{userName}</p>
        </div>
    </Link>
    </motion.div>
    
  )
}

export default PostCard
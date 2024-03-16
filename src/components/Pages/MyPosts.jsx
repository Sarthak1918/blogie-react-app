import React, { useEffect, useState } from 'react'
import dbService from '../../appwrite/dbServerice.js'
import { PostCard } from '../index.js'
import {useSelector} from "react-redux"
import { Query } from "appwrite";


function MyPosts() {
    const [posts, setPosts] = useState([])
    const [loader,setLoader] = useState(false)
    const userID = useSelector((state)=>state.auth.userData.$id)
    useEffect(() => {
        if (userID) { // Check if userID is defined
            setLoader(true)
            dbService.getAllPosts([Query.equal("userId", [userID])]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                    setLoader(false)
                }
            })
        }
    }, [userID]) // Add userID as dependency

    {
        if(loader){
         return <div className='text-4xl text-center p-5'>Loading..</div>
        }
        else{
            if(posts.length > 0){
                return (
                    <div className='flex justify-center'>
                        <div className='flex mt-10 flex-col gap-5 md:flex-row md:gap-5'>
                            <div className='flex flex-col gap-5'>{posts.filter((item, index) => index % 4 === 0).map((post) => <div className='' key={post.$id}><PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} userName={post.userName} /></div>)}</div>
                            <div className='flex flex-col gap-5'>{posts.filter((item, index) => index % 4 === 1).map((post) => <div className='' key={post.$id}><PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} userName={post.userName} /></div>)}</div>
                            <div className='flex flex-col gap-5'>{posts.filter((item, index) => index % 4 === 2).map((post) => <div className='' key={post.$id}><PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} userName={post.userName} /></div>)}</div>
                            <div className='flex flex-col gap-5'>{posts.filter((item, index) => index % 4 === 3).map((post) => <div className='' key={post.$id}><PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} userName={post.userName} /></div>)}</div>
                            <div className='flex flex-col gap-5'>{posts.filter((item, index) => index % 4 === 4).map((post) => <div className='' key={post.$id}><PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} userName={post.userName} /></div>)}</div>
                        </div>
                    </div>
                )
            }else{
                return <div className='w-full text-3xl p-10 text-center'>
                    You haven't created any post yet.Create Now!!!
                </div>
            }
        }
    }

    
    
}

export default MyPosts
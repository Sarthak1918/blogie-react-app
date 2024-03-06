import React,{useState,useEffect} from 'react'
import dbService from '../../appwrite/dbServerice'
import {PostCard} from "../index.js"
import {useSelector} from "react-redux"

 

function Home() {
    const[posts,setPosts] = useState([])
    const[loader,setLoader] = useState(false);
    useEffect(()=>{
        setLoader(true)
        dbService.getAllPosts().then((posts)=>{
            setPosts(posts.documents)
            setLoader(false)
        })
    },[])

    const authStatus = useSelector((state)=>state.auth.status)
    
    if(loader){
        return <div className='text-3xl text-center p-5'>Loading</div>
    }
    else{
        if(authStatus && posts.length === 0){
            return(
                <div className=' w-full text-3xl p-10 text-center'>
                    No posts yet.
                </div>
            )
          }
        
          else if(!authStatus){
            return(
                <div className='w-full text-3xl p-10 text-center'>
                    Login to read posts.
                </div>
            )
          }
          else if(authStatus && posts.length !== 0 ){
            return(
                <div className='flex justify-center'>
                <div className='flex gap-5 p-5'>
                    <div className='flex flex-col gap-5'>{posts.filter((item, index) => index % 4 === 0).map((post) => <div className='' key={post.$id}><PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} name ={post.name} post={post} /></div>)}</div>
                    <div className='flex flex-col gap-5'>{posts.filter((item, index) => index % 4 === 1).map((post) => <div className='' key={post.$id}><PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} name ={post.name} post={post} /></div>)}</div>
                    <div className='flex flex-col gap-5'>{posts.filter((item, index) => index % 4 === 2).map((post) => <div className='' key={post.$id}><PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} name ={post.name} post={post} /></div>)}</div>
                    <div className='flex flex-col gap-5'>{posts.filter((item, index) => index % 4 === 3).map((post) => <div className='' key={post.$id}><PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} name ={post.name} post={post} /></div>)}</div>
                    <div className='flex flex-col gap-5'>{posts.filter((item, index) => index % 4 === 4).map((post) => <div className='' key={post.$id}><PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} name ={post.name} post={post} /></div>)}</div>
                </div>
            </div>
            )
          }
    }
  
}

export default Home
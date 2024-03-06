import React from 'react'
import { useForm } from "react-hook-form"
import { Button, Input, Select, RTE } from "./index.js"
import dbService from '../appwrite/dbServerice.js'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import useToast from './useToast.js'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const notify = useToast()


    async function submit(data) {  //here this data we will get when form is submitted as we are using react-hook-form,we will get data here.
        console.log(data);
        if (post) {
            //that means the  user want to update the existing post

            //1-upload the file(image) if the user provide a new image
            const file = data.image[0] ? await dbService.uploadFile(data.image[0]) : null

            if (file) { //that means the user provided a new image.if the uses have not changed the (provided new image) then it will not come inside this if because in that case the value of file wii be null.
                //delete the previous image
                dbService.deleteFile(post.featuredImage)

            }

            const dbPost = await dbService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.id : post.featuredImage,
            })

            if (dbPost) {
                console.log(dbPost, "updated");
                notify("Post updated successfully", "success")
                navigate(`/post/${dbPost.$id}`)
            }



            //if the user is creating a new post
        } else {
            const file = await dbService.uploadFile(data.image[0]) //we are not checking if data.image[0] is present because image is a required field
            console.log(file);
            if (file) {
                data.featuredImage = file.$id
                const dbPost = await dbService.createPost({
                    ...data,
                    userId: userData.$id
                })


                if (dbPost) {
                    console.log(dbPost, "new");
                    notify("Post created successfully", "success")
                    navigate(`/post/${dbPost.$id}`)
                }
            }

        }
    }


    return (
        <form className='p-5 flex font-semibold text-sm' onSubmit={handleSubmit(submit)}>
            <div className='w-2/3 px-5'>
                <Input
                    label='Title: '
                    placeholder='Enter title'
                    className='mb-2'
                    {...register("title", {
                        required: true
                    })}
                />

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>


            <div className='w-1/3 px-5'>
                <Input
                    label="Featured image :"
                    type="file"
                    className="mb-1"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {
                        required: post ? false : true
                    })}
                />
                {
                    post && (
                        <div>
                            <img src={dbService.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-lg' />
                        </div>
                    )
                }

                <Select
                    options={["active", "inactive"]}
                    label="Status :"
                    className='mb-2 p-3 rounded-lg'
                    {...register("status", {
                        required: true
                    })}
                />

                <Button
                    type='submit'
                    className={post ? "bg-yellow-600 rounded-lg w-full hover:bg-yellow-500 transition-all duration-[0.3s]" : "bg-blue-600 rounded-lg w-full hover:bg-blue-500 transition-all duration-[0.3s]"}
                >
                    {
                        post ? "Update" : "Create"
                    }
                </Button>
            </div>
        </form>
    )
}

export default PostForm
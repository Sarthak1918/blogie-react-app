import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../../appwrite/dbServerice";
import { Button, Container } from "../index.js";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import useToast from "../useToast.js";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


export default function Post() {
    const [post, setPost] = useState(null);
    const { postID } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    const notify = useToast()

    useEffect(() => {
        if (postID) {
            dbService.getPost(postID).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [postID, navigate]);

    const deletePost = () => {
        dbService.deletePost(post.$id).then((status) => {
            if (status) {
                dbService.deleteFile(post.featuredImage).then(() => {
                    notify("Post deleted", "success")
                })
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 px-10">
            <div className="w-full p-4 md:p-8 flex justify-center mb-4 relative border rounded-xl">
                <img
                    src={dbService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl w-4xl md:max-w-[60%]"
                />

                {isAuthor && (
                    <div className="absolute right-1 top-3 md:right-6 md:top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-indigo-500" className=" hover:bg-indigo-400 text-xs">
                                <FaEdit/>
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-600" className="hover:bg-red-500" onClick={deletePost}>
                            <MdDeleteForever/>
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full mb-4 md:mb-6 p-5">
                <h1 className="text-3xl md:text-4xl font-extrabold">{post.title}</h1>
            </div>
            <div className="browser-css md:text-lg  font-semibold p-5">
                {parse(post.content)}
            </div>
        </div>
    ) : null;
}
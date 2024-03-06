import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../../appwrite/dbServerice";
import { Button, Container } from "../index.js";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import useToast from "../useToast.js";

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
                dbService.deleteFile(post.featuredImage).then(()=>{
                    notify("Post deleted","success")
                })
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={dbService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl max-w-4xl"

                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-600" className="mr-3 hover:bg-green-500">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-600" className="hover:bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
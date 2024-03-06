import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";


class DBservice {
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)     //bucket is for storing images
    }

    async createPost({ title, content, featuredImage, status, userId }) {  //we will get featuredImage which is a unique ID, when we successfully upload the file(image)
        try {
            return await this.databases.createDocument(conf.appwriteDBId, conf.appwriteCollectionId, ID.unique(), {
                title, content, featuredImage, status, userId
            });
        } catch (error) {
            console.log(error);
        }
    }

    async updatePost(postId, { title, content, featuredImage, status }) {
        return await this.databases.updateDocument(conf.appwriteDBId, conf.appwriteCollectionId, postId,
            {
                title,
                content,
                featuredImage,
                status,
            })
    }

    async deletePost(postId) {
        try {
            const deleted = await this.databases.deleteDocument(conf.appwriteDBId, conf.appwriteCollectionId, postId);
            if (deleted) {
                return true;
            }
            else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getPost(postId) {
        try {
            return await this.databases.getDocument(conf.appwriteDBId, conf.appwriteCollectionId, postId);

        } catch (error) {
            console.log(error);
        }
    }

    async getAllPosts(queries = [Query.equal("status", ["active"])]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDBId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    //FILE UPLOADING SERVICES

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),                             //when it will be returned this id will be passed as "featuredImage" while creating post.
                file
            );
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async deleteFile(fileId) { //here fileID is featuredImage,We will get this when we successfully upload image file
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log(error);
            return false
        }

    }

    getFilePreview(fileId){ //here fileID is featuredImage,We will get this when we successfully upload image file
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    }

}

const dbService = new DBservice();
export default dbService;

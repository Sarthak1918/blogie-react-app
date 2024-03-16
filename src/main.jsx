import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux"
import store from "./store/store.js"
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import {AuthLayout} from "./components/index.js"
import Signup from "./components/Pages/Signup.jsx"
import Login from "./components/Pages/Login.jsx"
import MyPosts from "./components/Pages/MyPosts.jsx"
import AddPost from "./components/Pages/AddPost.jsx"
import EditPost from "./components/Pages/EditPost.jsx"
import Post from "./components/Pages/Post.jsx"
import Home from "./components/Pages/Home.jsx"
import ToastComp from './components/ToastComp.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/my-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <MyPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:postID",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:postID",
            element: (
            <AuthLayout authentication>
                    {" "}
                    <Post />
                </AuthLayout>
            ),
        },
    ],
},
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastComp/>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)

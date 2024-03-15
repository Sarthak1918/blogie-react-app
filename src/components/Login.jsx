import React, { useState } from 'react'
import { Logo, Button, Input } from './index.js'
import { Link, useNavigate } from 'react-router-dom'
import authService from "../appwrite/auth.js"
import { login as storeLogin } from '../store/authSlice.js'
import { useDispatch } from "react-redux"
import { useForm } from 'react-hook-form'
import useToast from './useToast.js'
import {motion} from "framer-motion"
import { fadeIn } from './framer.js'



function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("");

    const notify = useToast()


    async function login(data) {
        try {
            const session = await authService.login(data)
            console.log(data,"data");
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(storeLogin(userData))
                    console.log(userData,"userData");
                    notify("Logged in Successfully","success")
                }
                navigate("/")
            }
        } catch (error) {
            setError(error)
            notify("Error!Try Again",error)
        }

    }

    return (
        <motion.div
        initial = "hidden"
        animate = "show"
        variants={fadeIn("right",0.3,0.5)}
        
        
        className='w-full flex justify-center pt-20  md:pt-20 md:p-0 p-5'>
        <div className='bg-slate-700 w-[500px] rounded-2xl p-10'>
            <div className='w-full flex flex-col justify-center items-center text-white gap-5'>
                <Logo size={"text-2xl"} color={"white"} />
                <div className='text-sm text-center'>
                    <h1 >Welcome Back! Login with your Blogie account.</h1>
                    <h4 className='mt-1 text-red-400 font-semibold'>{error && <h3>{error}</h3>}</h4>
                </div>
            </div>
            <form className="max-w-md mx-auto mt-3 text-white"
                onSubmit={handleSubmit(login)}
            >
                <Input
                    label="Email: "
                    type="email"
                    placeholder="Enter your email"
                    required
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(value)
                             || "Enter a valid email address",
                        }
                    })}
                />

                <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    required
                    {...register("password",{
                        required : true
                    })}
                />

                <Button type='submit'>Login</Button>
            </form>

            <div className='flex justify-center w-full text-white text-sm'>
                <span>Don't have any account? <Link to="/signup" className='underline'>Sign up here</Link> </span>
            </div>
        </div>
    </motion.div>
    )
}

export default Login
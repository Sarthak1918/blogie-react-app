import React from 'react'
import { Logo, Button, Input } from './index.js'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth.js'
import { login as authLogin } from '../store/authSlice.js'
import { useForm } from 'react-hook-form'
import { useDispatch } from "react-redux"
import useToast from './useToast.js'
import { fadeIn } from './framer.js'
import {motion} from "framer-motion"

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()
    const notify = useToast()

    async function signup(data) {
        try {
            const user = await authService.createAccount(data)
            if (user) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    notify("Signed up successfully","success")
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }

    }

    return (
        <motion.div
        initial = "hidden"
        animate = "show"
        variants={fadeIn("right",0.3,0.5)}
        className='w-full flex justify-center pt-20 md:pt-20 md:p-0 p-5'>
            <div className='bg-slate-700 w-[500px] rounded-2xl p-10'>
                <div className='w-full flex justify-center items-center'>
                    <Logo size={"text-2xl"} color={"white"} />
                    {error&&<h4 className='text-sm text-center'>{error}</h4>}
                </div>
                <form className="max-w-md mx-auto mt-8 text-white" onSubmit={handleSubmit(signup)}>
                    <Input
                        label="Username: "
                        type="text"
                        placeholder="Enter Full name"
                        required
                        {...register("name", {
                            required: true
                        })}
                    />

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
                        {...register("password", {
                            required: true
                        })}
                    />

                    <Button type='submit'>Sign up</Button>
                </form>

                <div className='flex justify-center w-full text-white text-sm'>
                    <span>Already have account? <Link to="/login" className='underline'>Login here</Link></span>
                </div>
            </div>
        </motion.div>
    )
}

export default Signup
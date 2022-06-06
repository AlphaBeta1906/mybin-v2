import Head from "next/head"
import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import axios from "axios"
import { UserContext } from "../../utils/context"

export default function NewPaste(){
    const router = useRouter()

    const [isSuccess,setIsSuccess] = useState(false)
    const [user,] = useContext(UserContext)
    const [input,setInput] = useState({
        title: "",
        content: "",
        language: "html"
    })

    const LabelStyle = "block text-xl mt-6"

    function HandleInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement >){
        setInput({...input,[e.target.name]: e.target.value})
    }

    function Submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setIsSuccess(true)
        const token = localStorage.getItem("token")
        axios
        .post("https://mybinbackend.herokuapp.com/api/v1/new_paste",{...input,author: user.username},{}
        )
        .then(function(data){
            const id = data.data.unique_id
            router.push(`/paste/${id}`)
        })
        .catch(function(err){
            console.log(err)
            setIsSuccess(false)
        })

    }

    return (
        <>
            <Head>
                <title>New paste</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <div className="px-10">
                <form onSubmit={Submit}>
                    <label htmlFor="title" className={LabelStyle} >
                        Paste title
                    </label>
                    <input 
                    required={true}
                    placeholder="Paste title" 
                    onChange={HandleInput} 
                    value={input.title} 
                    className="w-full md:w-1/2 lg:w-2/3 p-2 my-2 text-lg focus:outline-none border border-gray-700 rounded-lg focus:border-sky-700 focus:border-2" name="title" />

                    <label htmlFor="Language" className={LabelStyle} >
                        Language
                    </label>
                    <select onChange={HandleInput} name="language" className="w-1/2 p-2 text-lg border border-slate-100 rounded-lg focus:border-sky-600 focus:border-2">
                        <option value="html">Html</option>
                        <option value="css">Css</option>
                        <option value="javascript">Javascript</option> 
                        <option value="python">Python</option>
                        <option value="ruby">Ruby</option>
                        <option value="jsx">Jsx</option>
                        <option value="cpp">C++</option>
                    </select>

                    <label htmlFor="content" className={LabelStyle} >
                        Code
                    </label>
                    <textarea 
                    required={true}
                    placeholder="Your code here..." 
                    onChange={HandleInput} 
                    value={input.content} 
                    className="w-full h-60 text-lg p-2 my-2 rounded-lg border border-gray-700 focus:border-sky-700 focus:border-1 resize-y"  
                    name="content"/>

                    <button disabled={isSuccess} className="p-3 rounded-lg boder border-b-4 border-sky-500  hover:bg-sky-500 hover:text-white  text-sky-900 cursor-pointer disabled:bg-sky-400 disabled:text-white hover:-translate-y-1 hover:translate-x-1 my-5">
                        Create new paste
                    </button>
                </form>
            </div>
        </>
    )
}
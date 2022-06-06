import { useState } from "react"
import Head from "next/head"
import axios, { AxiosError, AxiosResponse } from "axios"
import { InferGetServerSidePropsType } from "next"
import Paginate from "../components/Paginate"
import Card from "../components/Card"

export interface Paste{
    id: number,
    title: string,
    content: string,
    date: string,
    language: string,
    unique_id: string,
    author: string
}

export interface Pastes{
    paste: Paste[]
}


export default function Paste ({data}: InferGetServerSidePropsType<typeof getServerSideProps>){
    //const [user, ] = useContext(UserContext)
    const [page,setPage] = useState(2)
    const [pastes,setPaste] = useState(data)
    /*
    function Alert(){
        Swal.fire({
            title: "Error!",
            text: "Do you want to continue",
            icon: "error",
            confirmButtonText: "Cool"
        })
    }
    */
    function changePage(type: string){
        if(type == "inc"){
            setPage(page+1)
        }else{
            setPage(page-1)
        }
        axios
        .get(`http://127.0.0.1:8080/api/v1/pastes?page=${page}`)
        .then(function(data: AxiosResponse<Pastes>){
            console.log(data.data)
            setPaste(data.data.paste)

        })
        .catch(function(err: AxiosError){
            console.log(err.status)
        })
    }

    return (
        <>
            <Head>
                <title>MyBin 2.0</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <div className="px-10  h-full">
                <h1>
                  Welcome
                </h1>
                {   pastes.length >= 1?
                    pastes.map(function(paste){
                        if(paste.language && paste.language != "123"){
                            return (
                                <div key={paste.id}>
                                <hr/>
                                    <Card
                                    author={paste.author}
                                    date={paste.date}
                                    unique_id={paste.unique_id}
                                    language={paste.language}
                                    title={paste.title}
                                    />
                                </div>
                            ) 
                        }
                    })
                    :
                    <div className="text-center">
                        <h1>
                            No paste here
                        </h1>
                    </div>
                }
                <Paginate page={1}/>                  
            </div>
        </> 
    )
} 

export async function getServerSideProps(){
    const paste = await axios.get("https://mybinbackend.herokuapp.com/api/v1/pastes")
    const data: Paste[] = paste.data.paste
    return {props: {data}}
}
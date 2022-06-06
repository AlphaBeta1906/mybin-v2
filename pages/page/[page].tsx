import { useEffect,useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import axios, { AxiosError, AxiosResponse } from "axios"
import {Pastes} from "../index"
import Card from "../../components/Card"
import Paginate from "../../components/Paginate"

export default function page(): JSX.Element{
    const router = useRouter()
    const [pastes,setPaste] = useState([])
    const [page,setPage] = useState(2)
    const [loading,setLoading] = useState(false)

    useEffect(function(){
        setLoading(true)
        axios.get(`http://127.0.0.1:8080/api/v1/pastes?page=${page}`)
        .then(function(data: AxiosResponse<Pastes>){
            setPaste(data.data.paste)
            setLoading(false)
        })
        .catch(function(err: AxiosError){
            console.log(err)
            setLoading(false)
        })
    },[])
    return (
        <>
            <Head>
                <title>MyBin 2.0</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <div className="px-10">
            {   
                !loading?
                    <>
                        {
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
                        }
                        <Paginate page={page}/>
                    </>
                :
                <div className="text-center">
                    <h1>
                        Loading...
                    </h1>
                </div>
            }
            </div>  
        </>
    )
}
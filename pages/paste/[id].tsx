import { useContext } from "react"
import Head from "next/head"
import {InferGetServerSidePropsType } from "next"
import axios, { AxiosResponse } from "axios"
import { Prism as  SyntaxHighlighter} from "react-syntax-highlighter"
import { materialLight as light,materialDark as dark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { ThemeContext,ThemeProvider } from "../../utils/context"
import Date from "../../components/Date"
import AuthorName from "../../components/AuthorName"
import Language from "../../components/Language"

interface Paste{
    title: string,
    date: string,
    language: string,
    content: string,
    author: string
}

export default function _Paste({paste}: InferGetServerSidePropsType<typeof getServerSideProps>){
    const theme: string = useContext(ThemeContext)
    return (
        <>
            <Head>
                <title>{paste.title} </title>
                
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <div className="px-2 md:px-6 lg:px-10">
                <h2 className="text-gray-700">
                    {paste.title}
                </h2>
                <Date date={paste.date}/>              
                <Language language={paste.language}/>
                <div className="text-base border rounded-lg px-5 py-6">
                    <ThemeProvider value="light">
                        <SyntaxHighlighter language={paste.language} style={theme === "light"?light:dark} className="h-80 shadow-lg rounded-lg">
                            {paste.content}
                        </SyntaxHighlighter>
                    </ThemeProvider>
                </div>
            </div>
        </>
    )
}


export async function getServerSideProps(context){
    const id = context.params.id
    const data: AxiosResponse = await axios.get(`https://mybinbackend.herokuapp.com/api/v1/paste/${id}`)
    const paste:Paste = data.data
    console.log(paste)

    return {props: {paste: paste}}
}
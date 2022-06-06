import Link from "next/link"
import Date from "./Date"
import Language from "./Language"

interface Props{
    title: string
    unique_id: string
    date: string
    language: string
    author: string
}

export default function Card(props: Props){
    return(
        <div className="py-2">
            <h1 className="pb-0 my-0"> 
                <Link href={`/paste/${props.unique_id}`}>
                    <a className="hover:text-sky-600 no-underline text-gray-800" title={props.title}>
                        {props.title}
                    </a>
                </Link>
            </h1> 
            <Date date={props.date}/>
            <Language language={props.language}/>
        </div>  
    )
}

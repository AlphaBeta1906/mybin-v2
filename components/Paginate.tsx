import Link from "next/link"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useEffect,useState } from "react"

interface Props{
    page: number
}

export default function Paginate(props: Props): JSX.Element{
    const LinkClass = "text-xl no-underline text-black hover:text-sky-600 font-semibold"
    var [pageNum,setPageNum] = useState(0) 
    
    useEffect(function(){
        axios
        .get("https://mybinbackend.herokuapp.com/api/v1/pastes_length")
        .then(function(data: AxiosResponse<{number_of_page: number}>){
            console.log(data.data.number_of_page)
             setPageNum(data.data.number_of_page)
            console.log(pageNum)
        })
        .catch(function(err: AxiosError){
            console.log(err)
            setPageNum(0)
        })
    },[])

    console.log(pageNum)

    return (
        <div className="flex justify-between py-3">  
            {
                props.page > 1?
                <Link href={props.page-1 == 1?`/`:`/page/${props.page - 1}`}>
                    <a className={LinkClass}>
                        Previous
                    </a>
                </Link>
                :
                <>
                </>
            }
            {
                props.page < pageNum?
                <Link href={`/page/${props.page + 1}`}>
                    <a className= {LinkClass} >
                        Next
                    </a>
                </Link>
                :
                <>
                </>
            }
        </div>
    )
}

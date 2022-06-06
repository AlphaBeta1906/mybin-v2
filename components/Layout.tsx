import React, { useEffect } from "react"
import Nav from "./Nav"

export default function Layout(props: React.PropsWithChildren<any>): JSX.Element{
    useEffect( 
        function() { 
            document.querySelector("body").classList.add("bg-zinc-100") 
        } 
    )
    return (
        <div className="h-full font-sans">
            <Nav/>
            {props.children}
        </div>
    )
}
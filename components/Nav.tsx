import { useContext, useEffect,useState } from "react"
import Link from "next/link"
import { TokenContext, UserContext } from "../utils/context"
import { useRouter } from "next/router"

interface Props{
    link: string,
    text: string,
}

function NavLink(props: Props): JSX.Element{
    return (
        <li className="list-none px-3">
            <Link href={props.link}>
                <a className="no-underline text-black text-lg hover:text-sky-800">
                    {props.text}
                </a>
            </Link>
        </li>
    )
}

export default function Nav(): JSX.Element{

    const router = useRouter()
    const token = useContext(TokenContext)
    var [user, ] = useContext(UserContext)

    function Logout(){
        localStorage.removeItem("token")
        router.push("/auth/login")
        token.token = null
        token.refresh_token = null
        user.username = null,
        user.email = null,
        user.id = null,
        user.role = null

    }

    return (
        <nav className="flex pb-5">
            <h3 className="flex bottom-1 pl-8 relative">
                <Link href="/">
                    <a className="no-underline text-black hover:text-sky-800">
                        Logo
                    </a>
                </Link>
            </h3> 
            <ul className="lg:inline-flex hidden">
                { 
                    /*
                    !user.username || user.username == "anonymous"?
                    <>
                        <NavLink link="/auth/login" text="Login"/>
                        <NavLink link="/auth/signup" text="Signup"/>
                    </>
                    :
                    <></>
                    */
                }
                <NavLink link="/" text="Home"/>
                <NavLink link="/paste/new_paste" text="New paste"/>
                {
                    user.username && user.username != "anonymous"?
                    <li className="list-none px-3">
                        <a className="no-underline text-black hover:text-sky-800 cursor-pointer" onClick={Logout}>
                            Logout
                        </a>
                    </li>
                    :
                    <>
                    </>
                }
            </ul>
        </nav>
    )
}
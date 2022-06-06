import Router from "next/router"
import { useContext, useEffect,useState } from "react"
import axios,{AxiosResponse,AxiosError} from "axios"
import ProgressBar from "@badrap/bar-of-progress"
import { AppProps } from "next/app"
import Layout from "../components/Layout"
import { UserProvider,TokenProvider,TokenContext } from "../utils/context"
import "../styles/globals.css"  


const progress: ProgressBar = new ProgressBar({
  size: 3,
  color: "#0284C7",
  className: "bar-of-progress",
  delay: 100,
})

Router.events.on("routeChangeStart", progress.start)
Router.events.on("routeChangeComplete", progress.finish)
Router.events.on("routeChangeError", progress.finish) 

function MyApp({ Component, pageProps}: AppProps) {

  const [user,setUser] = useState({})
  const token = useContext(TokenContext)
  /*
  useEffect(function(){
    const token = localStorage.getItem("token")

    axios.get("http://127.0.0.1:8080/api/v1/user",{
        headers: {
            "Authorization": `Bearer ${token}` 
        }        
    }) 
    .then(function(data: AxiosResponse){
        setUser(data.data)
    })
    .catch(function(err: AxiosError){
        console.log(err)
        setUser({username:"anonymous" })
    })
  },[])
  */ 

  return (
    <>
        {
           user?
            <TokenProvider value={token}>
              <UserProvider value={[user,setUser]}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </UserProvider>
            </TokenProvider>
            :
            <Layout>
              Loading...
            </Layout>
        }
    </>
  )
}

export default MyApp
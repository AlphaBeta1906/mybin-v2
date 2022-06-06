import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock as clock } from "@fortawesome/free-regular-svg-icons"
import dayjs from "dayjs"

interface Props{
    date: string
}

export default function Date(props: Props): JSX.Element{
    return (
        <>
            <span className="block"> 
                <br/>
                <FontAwesomeIcon icon={clock} className="pr-2" />                                              
                Posted on {dayjs(props.date).format("DD MMM YYYY")}
            </span>
        </>
    )
}
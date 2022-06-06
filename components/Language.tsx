import langObj from "../utils/lang"


interface Props{
    language: string
}

export default function Language(props: Props): JSX.Element{
    return(
        <span className="text-lg">
            Language: {langObj[props.language]}
        </span>
    )
}
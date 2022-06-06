

interface Props{
    name: string
}

export default function AuthorName(props: Props): JSX.Element{
    return(
        <span className="block text-lg py-3">
            By {props.name}
        </span>
    )
}
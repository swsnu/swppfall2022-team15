import { useParams } from "react-router";

interface IProps {
    name: string; 
}


export default function Project() {
    const {id} = useParams();

    return (
        <div>
            <h1> {id} </h1>
        </div>
    )
}
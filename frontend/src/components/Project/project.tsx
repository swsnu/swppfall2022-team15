import React from "react";

interface IProps {
    name: string; 
}


export const Project = (props: IProps) => {
    return (
        <div>
            <h1> Hello {props.name}</h1>
        </div>
    )
}
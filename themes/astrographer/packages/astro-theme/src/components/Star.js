import React from 'react';
import { connect } from "frontity";

const Star = ({ state, props }) => {

    return (
        <div>
            <h5>{props.name}</h5>
            <div className={`{stellar ${props.spectral}}`}></div>
            <div>
                <span>{props.distance}</span>
            </div>
        </div>
    )
    
}
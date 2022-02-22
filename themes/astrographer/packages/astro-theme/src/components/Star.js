import React from 'react';
import { connect } from "frontity";

const Star = ({ state, name, spect, distance }) => {

    return (
        <div>
            <h5>{name}</h5>
            <div className={`{stellar ${spect}}`}>{spect}</div>
            <div>
                <span>{distance}</span>
            </div>
        </div>
    )
    
}

export default connect(Star);
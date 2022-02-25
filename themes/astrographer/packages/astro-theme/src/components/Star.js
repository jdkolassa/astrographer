import React from 'react';
import { connect, styled, css } from "frontity";

const Star = ({ state, name, spect, hue, mass, distance }) => {

    {/* This will be the baseline for star sizes, modified by the mass; I'm placing it here because I think it will be easiest to change it once
in this location */}
const baseSize = "0.5rem";

const Graph = styled.div`
    border-radius: 50%;
    width: ${mass * baseSize};
    height: ${mass * baseSize};
    background-color: rgb(${hue});
    margin: 0.25rem auto;
`

const Box = styled.div`
    border-radius: 5px;
    border: 0.25rem solid rgb(${hue});
`

    return (
        <Box>
            <h5>{name}</h5>
            <Graph/>
            <div>
                <ul css={`list-style-type: none; text-align: center;`}>  
                    <li>{spect}</li>
                    <li>{distance} ly</li>
                </ul>
            </div>
        </Box>
    )
    
}

export default connect(Star);
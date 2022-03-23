import React from 'react';
import { connect, styled, css } from "frontity";

const Star = ({ state, name, spect, hue, lumos, distance }) => {


    {/* This will be the baseline for star sizes, modified by the mass; I'm placing it here because I think it will be easiest to change it once
in this location */}
{/* 
    0/Ia+ = Hypergiant = 16rem
    I = Supergiant = 12rem
    II = Bright Giant = 10rem
    III = Giant = 8rem
    IV = Subgiant = 6rem
    V = Main-Sequence (Dwarf) = baseSize = 4rem
        Though a red dwarf will be much smaller than a yellow dwarf, so may need a rethink... 
    sd (VI) = Subdwarf = 2rem
    D (VII) = White Dwarf "compact" = 

*/}
const baseSize = 3;

let mass;
let color;

switch(lumos){
    case "hypergiant":
         mass = 4 * baseSize;
        break;
    case "supergiant":
         mass = 3 * baseSize;
        break;
    case "bright":
         mass = 2.5 * baseSize;
        break;
    case "giant":
         mass = 2 * baseSize;
        break;
    case "subgiant":
         mass = 1.5 * baseSize;
        break;
    case "dwarf":
         mass = 1 * baseSize;
        break;
    case "subdwarf":
         mass = 0.5 * baseSize;
        break;
    case "compact":
         mass = 0.25 * baseSize;
         break;
    default:
        mass = 1 * baseSize;
}

switch(hue){
    case "blue":
         color = "#496fff, #9bb0ff, #ffffff";
        break;
    case "blue white":
         color = "#557fff, #aabfff, #ffffff";
        break;
    case "white": 
         color = "#6f92ff, #cad7ff, #ffffff";
        break;
    case "yellow white":
         color = "#ffb373, #ffe5cf, #f8f7ff";
        break;
    case "yellow":
         color = "#ffae5b, #ffd9b2, #fff4ea";
        break;
    case "orange":
         color = "#ffa03f, #ffc78e, #fff8f1";
        break;
    case "red":
         color = "#ff840e, #ffa651, #ffd1a5";
        break;
    case "degenerate":
        color = "#ededff #f3f3ff #fff";
        break;
    
}

const Graph = styled.div`
    border-radius: 50%;
    width: ${mass}rem;
    height: ${mass}rem;
    background-image: radial-gradient(${color});
    margin: 0.25rem auto;
`

const Box = styled.div`
    border-radius: 5px;
    border: 0.25rem solid transparent;
    padding: 0.5rem;
`

    return (
        <Box>
            <h5>{name}</h5>
            <Graph/>
            <div>
                <ul css={css`list-style-type: none; text-align: center;`}>  
                    <li>{spect}</li>
                    <li>{distance} ly</li>
                </ul>
            </div>
        </Box>
    )
    
}

export default connect(Star);
import React from 'react';
import { connect, styled } from "frontity";
import Star from './Star';
import * as parser from 'stellar-classification-parser';


// TODO: Implement lazy loading

const Grid = ({ state }) => {
  
  const stars = state.source.get('/');
  console.log(stars);
  
  
  
  return (
  <div>
      <GridWrapper>
        <p>DUMMY TEXT FOR NOW</p>
         <div>
           {stars.items.map((item) => {
             const star = state.source[item.type][item.id];

            return (
              <Star key={star.id} name={star.title.rendered} spect={star.spect} hue={star.hue} lumos={star.lumos} distance={star.distance}></Star>
            ) 
          })} 
        </div> 
      </GridWrapper>
  </div>
  );
}

const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;

export default connect(Grid);

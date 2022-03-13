import React from 'react';
import { connect, styled } from "frontity";
import Star from './Star';


// TODO: Implement lazy loading

const Grid = ({state, stars}) => {
  
  return (
  <div>
    
      <GridWrapper>
        
           {stars.map((item) => {
             const star = state.source[item.type][item.id];

            return (
              <Star key={star.id} name={star.title.rendered} spect={star.spect} hue={star.astrog_hue} lumos={star.astrog_lumos} distance={star.distance}></Star>
            ) 
          })}
      </GridWrapper>
  </div>
  );
}

const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 0.5rem;
  justify-content: center;
`;


export default connect(Grid);

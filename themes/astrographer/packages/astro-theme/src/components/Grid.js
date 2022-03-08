import React from 'react';
import { connect, styled } from "frontity";
import Star from './Star';


// TODO: Implement lazy loading

const Grid = ({ state }) => {
  
  const stars = state.source.get('/');
  console.log(stars);
  
  
  
  return (
  <div>
      <GridWrapper>
           {stars.items.map((item) => {
             const star = state.source[item.type][item.id];

            return (
              <Star key={star.id || null} name={star.title.rendered || null} spect={star.spect || null} hue={star.astrog_hue || null} lumos={star.astrog_lumos || null} distance={star.distance || null}></Star>
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
`;

export default connect(Grid);

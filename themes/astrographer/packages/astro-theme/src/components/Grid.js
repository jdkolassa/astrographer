import React from 'react';
import { connect } from "frontity";
import Star from './Star';

// TODO: Implement lazy loading

const Grid = ({ state }) => {
  
  const stars = state.source.get('/');
  console.log(stars);
  
  return (
  <div className="container bg-black">
      <div className="grid grid-flow-col auto-cols-max">
        <p>DUMMY TEXT FOR NOW</p>
         <div>
           {stars.items.map((item) => {
             const star = state.source[item.type][item.id];
             console.log(star);
            return (
              <Star key={star.id} name={star.title.rendered} spect={star.spect} distance={star.distance}></Star>
            ) 
          })} 
        </div> 
      </div>
  </div>
  );
}

export default connect(Grid);

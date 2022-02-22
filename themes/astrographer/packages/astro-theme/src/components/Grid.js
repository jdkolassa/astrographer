import React from 'react';
import { connect } from "frontity";

// TODO: Implement lazy loading

const Grid = ({ state }) => {
  
  const stars = state.source.get('/');
  console.log(stars);
  
  return (
  <div className="container bg-black">
      <div className="grid grid-flow-col auto-cols-max">
        <p>DUMMY TEXT FOR NOW</p>
        <div>
           {/* {stars.items.map((item) => {
             const star = state.source[item.type][item.id];
            return (
              <Star name={star.title.rendered} spectral={star.spectral_type} distance={star.distance}>

              </Star>
            )
          })}  */}
        </div>
      </div>
  </div>
  );
}

export default connect(Grid);

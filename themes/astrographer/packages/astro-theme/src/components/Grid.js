import React from 'react';
import { connect } from "frontity";

const Grid = ({ state }) => {
  const data = state.source.get("/astrog_star");
  return (
  <main class="container bg-black">
      <div class="grid grid-flow-col auto-cols-max">

      </div>
  </main>
  );
}

export default connect(Grid);

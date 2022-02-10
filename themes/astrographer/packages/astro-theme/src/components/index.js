import React from 'react';
import { connect } from "frontity";

// TODO: Make Frontity pull for "astrog_star" and not "posts" or "pages" (except the about page)
// TODO: Implement a Switch component to change between the default Grid and the About page
// TODO: When Grid is functional, scaffold it out and see what it looks like

const Root = ({ state }) => {
  return (
    <>
        <p>Current page is: {state.router.link}</p>
        <p></p>
    </>
  
  )
}

export default connect(Root);


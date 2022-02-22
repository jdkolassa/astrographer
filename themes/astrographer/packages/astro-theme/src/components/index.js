import React from 'react';
import { connect } from "frontity";
import Link from "@frontity/components/link";
import Switch from "@frontity/components/switch";
import Grid from "./Grid";

// TODO: Make Frontity pull for "astrog_star" and not "posts" or "pages" (except the about page)
// TODO: Implement a Switch component to change between the default Grid and the About page
// TODO: When Grid is functional, scaffold it out and see what it looks like

const Root = ({ state }) => {
  const data = state.source.get(state.router.link); // at home, this is state.source.get('/')

  return (
    <>
        <header className="bg-black p-10 ">
          <h1 className="mx-auto flex justify-center items-center h-full">ASTROGRAPHER</h1>
          <nav className="bg-purple-800 text-white flex place-items-center">
            <div>
              <Link link="/stars">Home</Link>
              <Link link="/about">About</Link>
            </div>
          </nav>
        </header>
        <p>Current page is: {state.router.link}</p>
          <main className="bg-black flex place-items-center text-white">
            <Switch>
              <Grid when={data.isHome} />
              <div when={data.isPage} />
            </Switch>
          </main>
          
        
    </>
  
  )
}

export default connect(Root);


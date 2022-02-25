import React from 'react';
import { connect, styled, Head, Global, css } from "frontity";
import Link from "@frontity/components/link";
import Switch from "@frontity/components/switch";
import Grid from "./Grid";


// TODO: When Grid is functional, scaffold it out and see what it looks like

const Header = styled.header`
  height: 15vh;
  width: 100vw;
  background-color: black;
  text-align: center;
  display: flex;

  h1 {
    margin: auto;
    font-weight: bold;
  }
`

const Nav = styled.nav`
  background-color: #cc0099;
  font-weight: bold;
  text-align: center;
  width: 100vw;
  height: 2.5rem;
  padding: 1rem;
  & > a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
  }
`

const Main = styled.main`
  background-color: black;
`

const Root = ({ state }) => {
  const data = state.source.get(state.router.link); // at home, this is state.source.get('/')

  return (
    
    <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;600&display=swap" rel="stylesheet"/> 
    </Head>
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            background-color: black;
            text-color: white;
            font-family: 'Cairo', sans-serif;
          }
        `}
      />
        <Header>
          <h1>ASTROGRAPHER</h1>
          <Nav>
            <div>
              <Link link="/stars">Home</Link>
              <Link link="/about">About</Link>
            </div>
          </Nav>
        </Header>
        {/* <p>Current page is: {state.router.link}</p> */}
          <Main>
            <Switch>
              <Grid when={data.isHome} />
              <div when={data.isPage} />
            </Switch>
          </Main>
          
        
    </>
  
  )
}



export default connect(Root);



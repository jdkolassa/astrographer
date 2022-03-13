import React, {useMemo, useState} from 'react';
import { connect, styled, Head, Global, css } from "frontity";
import Link from "@frontity/components/link";
import Switch from "@frontity/components/switch";
import Grid from "./Grid";
import {TEMPS, LUMINOSITIES} from "..//codes";


const Header = styled.header`
  height: 15vh;
  width: 100vw;
  background-color: black;
  text-align: center;
  display: flex;
  flex-direction: column;

  h1 {
    margin: auto;
    font-weight: bold;
    color: white;
  }
`

const Nav = styled.nav`
  background-color: #cc0099;
  font-weight: bold;
  text-align: center;
  width: 100vw;
  height: 2.5rem;
  padding: 0.25rem;
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
  const data = state.source.get('/');
  const stars = data.items;
  console.log(stars);

  
   const [filters, setFilters] = useState({
    temps: new Set(),
    luminosities: new Set(),
  })

  const handleChange = (event, type) => {
    setFilters(previousState => {
      let filters = new Set(previousState[type])

      if (event.target.checked) {
        filters.add(event.target.value)
        console.log(filters)
      } else {
        filters.delete(event.target.value)
        console.log(filters)
      }

      const newState = {
        ...previousState,
        [type]: filters,
      }

      return {
        ...previousState,
        [type]: filters,
      }

    })
  };
  
  const results = useMemo(() => {
    return stars.filter(star => {
      return (filters.temps.size === 0 | filters.temps.has(star.hue)) && (filters.luminosities.size === 0 | filters.luminosities.has(star.lumos))
    })
  }, [filters.temps, filters.luminosities]);

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
            color: white;
            font-family: 'Cairo', sans-serif;
          }
          a {
            margin: 0 1rem;
            color: white;
            text-decoration: none;
            font-size: 1rem;
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
            <div css={css`display:flex;flex-direction:row;flex-wrap:wrap;`}>
              <ul css={css`padding:1rem;list-style-type: none;display:flex;flex-direction:row;border:1px solid #ffc877`}>
              {TEMPS.map(temp =>(
                  <li key={temp} css={css`margin:0.75rem;`}>
                    <label>
                    &nbsp;&nbsp;&nbsp;<input 
                        type="checkbox"
                        onChange={e => handleChange(e, 'temps')}
                        value={temp}
                      />
                      {temp}
                    </label>
                  </li>
              ))}
              </ul>

              <ul css={css`padding:1rem;list-style-type:none;display:flex;flex-direction:row;border:1px solid #9eb1ff`}>
              {LUMINOSITIES.map(luminosity =>(
                  <li key={luminosity} css={css`margin:0.75rem;`}>
                    <label>
                      &nbsp;&nbsp;&nbsp;<input 
                        type="checkbox"
                        onChange={e => handleChange(e, 'luminosities')}
                        value={luminosity}
                      />
                      {luminosity}
                    </label>
                  </li>
              ))}
              </ul>
            </div>
            <Switch>
              <Grid when={data.isHome} stars={results} />
              <div when={data.isPage} />
            </Switch>
          </Main>
          
        
    </>
  
  )
}



export default connect(Root);



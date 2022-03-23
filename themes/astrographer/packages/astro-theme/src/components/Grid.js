import React, {useState, useMemo} from 'react';
import { connect, styled, css } from "frontity";
import Star from './Star';
import {TEMPS, LUMINOSITIES} from "..//codes";


// TODO: Implement lazy loading

const Grid = ({state}) => {

  const stars = state.source.get('/').items

  
   const [filters, setFilters] = useState({
    temps: new Set(),
    luminosities: new Set(),
  })

  const handleChange = (event, type) => {
    setFilters(previousState => {
      const filters = new Set(previousState[type])

      if (event.target.checked) {
        filters.add(event.target.value)
        console.log(filters)
      } else {
        filters.delete(event.target.value)
        console.log(filters)
      }

      return {
        ...previousState,
        [type]: filters,
      }

    })
  };
  
  const results = useMemo(() => {
    return stars.filter(star => {
      return (
        (filters.temps.size === 0 | filters.temps.has(star.hue)) && 
        (filters.luminosities.size === 0 | filters.luminosities.has(star.lumos))
      )
    })
  }, [filters.temps, filters.luminosities]);
  
  return (
  <div>
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
    
      <GridWrapper>
        {console.log(results)}
           {results.map((item) => {
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

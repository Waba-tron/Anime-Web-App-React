import React from 'react'
import './nav.css';
import { Stretch } from 'styled-loaders-react';
import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom';
export default function Nav({match}) {
    
    console.log(match)
    const [searchState, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(true);
  
    const search = (e) =>{
 
        const fetchAnime = async () => {

            setSearchLoading(true);
     
            const data = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${searchState}`);

            const Anime = await data.json();
            
            setSearchResults(Anime.data);
                
            setSearchLoading(false);
            
            
        }

        fetchAnime();

    }

    return (
        <div>
            <nav className="navbar">
                <Link to={'/'} className="home-link">
                AWA
                </Link>

                <div className="search-box">
                    <input className="search-bar" onChange={e => {setSearch(e.target.value)}} onKeyPress={search}placeholder="search..." />
                    <i class="fas fa-search"></i>
                </div>
         

               {searchState === '' ? '' :
               
            <div className="search-container">
             
                {searchLoading === true ? <Stretch/> :
            
                searchResults.map(currentAnime => 

                 
                    <NavLink to={`/anime/${currentAnime.id}/summary`} className="search-link" >
                           <div className="search-result">

                        {
                               
                            currentAnime.attributes.posterImage === null ? <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" alt=""/>
                            : <img src={currentAnime.attributes.posterImage.large} alt=""/>
                            
                        }

                       
                        {
                        
                        (() => {

                            if(currentAnime.attributes.titles.en_us == null){

                                if(currentAnime.attributes.titles.en == null){

                                    return <span>{currentAnime.attributes.titles.en_jp}</span>
                                }
                                else{
                                    return <span>{currentAnime.attributes.titles.en}</span>
                        
                                }
                            }
                            else{
                                return <span>{currentAnime.attributes.titles.en_us}</span>
                            }
                         
                        })()
                        }
                         </div>
                        </NavLink>
                  
                    )
                       
                }
            </div>
            }
            </nav>
            
        </div>
    )
}

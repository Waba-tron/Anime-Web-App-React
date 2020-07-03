import React from 'react'
import './anime-episodes.css';
import { Stretch } from 'styled-loaders-react';
export default function AnimeEpisodes({episodeData, posterImg, gotoNextPage, gotoPrevPage, loadingEpisode}) {


    return (
        <div className="episodes-container">
              <h1>These are the episodes</h1>
              <div className="buttons-container mobile-buttons">
                    {gotoPrevPage&&<button className="pagination-button" onClick={gotoPrevPage}>Prev</button>}
                    {gotoNextPage&&<button className="pagination-button" onClick={gotoNextPage}>Next</button>}
                </div>
      
            { loadingEpisode === true ? <Stretch/> :
            <div className="episodes">
            {
             
                episodeData.data.map(currentEpisode =>

                    <div key={currentEpisode.id} className="episode-card">
                        
                        {
                            currentEpisode.attributes.thumbnail == null ?  <img src={posterImg} alt=""/>
                            : <img src={currentEpisode.attributes.thumbnail.original} alt=""/>
                         
                        }
          
                        <h4>
                            <span>Episode {currentEpisode.attributes.number}</span>    
                            <span className="caption"> {currentEpisode.attributes.titles.en_us}</span>
                        </h4>
    
                    </div>
              
                )
                
            }
                </div>
}
                <div className="buttons-container web-buttons">
                    {gotoPrevPage&&<button className="pagination-button" onClick={gotoPrevPage}>Prev</button>}
                    {gotoNextPage&&<button className="pagination-button" onClick={gotoNextPage}>Next</button>}
                </div>
           
                
        </div>
    )
}

import React from 'react'
import './animeList.css';
import {Link} from 'react-router-dom';
export default function AnimeList({titleList, animeData}) {
    return (
        <div>
     
            <h4>{titleList}</h4>

        
            <div className="data-container">
      
            {
            animeData.map(currentAnime =>
                    <Link to={`/anime/${currentAnime.id}/summary`}>
                    <div key={animeData.id}>
                        <img className="list-img" src={currentAnime.attributes.posterImage.original}></img>
                    </div>
                    </Link>
                    )
            }
            </div>
                    
        </div>
    )
}

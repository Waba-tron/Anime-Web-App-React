import React from 'react';
import '../../anime/anime.css';
import '../anime-summary/anime-summary.css';
export default function AnimeSummary({summaryData, title, Genres}) {

    const {averageRating, synopsis, showType, status, ageRating, ageRatingGuide, startDate, episodeLength, episodeCount, ratingRank, popularityRank} = (summaryData);
  
    return (
        
        <div className="anime-summary-container">
          
     
            <div className="anime-summary">
                
                <div className="anime-title">
                    <h1>{title}</h1>
                    <h3>{startDate.substring(0,4)}</h3>
                </div>
          
                {
                    averageRating >= 75 ?
                    <div className="high-rating">{averageRating}%  Community Approval</div>:
                    <div className="med-rating">{averageRating}%  Community Approval</div>
                }
                
                <p>{synopsis} 
                </p>
                <div className="genres-container">
                {
                
                   Genres.data.map(currentGenre =>
                    <div key={currentGenre.id} className="genre">
                        <h2>{currentGenre.attributes.title}</h2>
                    </div>
              
                   )
                      
                }
                </div>   

                <div className="ratings">

                    <h3><i class="fas fa-heart"></i>Rank #{ratingRank} (Most Popular Anime)</h3>
                  
                    <h3><i class="fas fa-star"></i>Rank #{popularityRank} (Highest Rated Anime)</h3>
                        
                </div>
            
            </div>


                <div className="anime-details">
                <h4>Anime Details</h4>
                <ul>
                    <li>
                    <strong>Title</strong> <span>{title}</span>
                    </li>
                    
                    <li>
                    <strong>Type</strong><span>{showType}</span>
                    </li>
                    <li>
                    <strong>Aired</strong><span>{startDate}</span>
                    </li>
                    <li>
                    <strong>Status</strong> <span>{status}</span>
                    </li>
                    
                    {
                        //If there is no value for number of episodes display nothing
                        episodeCount == null ? ''
                        : <li>
                        <strong>Episodes</strong> <span>{episodeCount} </span>
                        </li>
                    }

                    <li>
                        <strong>Rating</strong> <span>{ageRating} {ageRatingGuide}</span>
                    </li>

                    <li>
                    <strong>Length</strong> <span>{episodeLength} minutes</span>
                    </li>
                   
                </ul>
              
                </div>
             
        </div>
            

        
    )
}

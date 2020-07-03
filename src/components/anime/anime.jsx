import React from 'react'
import {useState, useEffect} from 'react';
import SubNav from '../nav/sub-nav.jsx';
import AnimeSummary from './anime-summary/anime-summary.jsx';
import AnimeEpisodes from './anime-episodes/anime-episodes.jsx';
import {Route} from 'react-router-dom';
import { Stretch } from 'styled-loaders-react';


import './anime.css';

export default function Anime({match}) {

    const [animeCover, setAnimeCover] = useState('');
    const [animeTitle, setAnimeTitle] = useState('');
    const [animePoster, setAnimePoster] = useState('');
    const [AnimeSummaryData, setSummaryData] = useState('');
    const [animeGenres, setAnimeGenres] = useState([]);  

    //Hold Episode Data
    const [animeEpisodes, setAnimeEpisodes] = useState(null);
    const [currentPageUrl, setCurrentPageUrl] = useState(`https://kitsu.io/api/edge/anime/${match.params.animeId}/episodes`)
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();
    const [episodeLoading, setEpisodeLoading] = useState(true);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        
        const fetchAnime = async () => {

            //Get Genre Data 

            setLoading(true);
            const genreData = await fetch(`https://kitsu.io/api/edge/anime/${match.params.animeId}/categories`);

            const TGenres = await genreData.json();
  
            setAnimeGenres(TGenres);
        
              
            //GET Data for summary
            const data = await fetch(`https://kitsu.io/api/edge/anime/${match.params.animeId}`);

            const Anime = await data.json();

            setSummaryData(Anime.data.attributes);
          
            const {titles, coverImage, posterImage} = (Anime.data.attributes);

            if(coverImage == null){
                setAnimeCover(posterImage.large);
            }
            else{
                setAnimeCover(coverImage.original);
         
            }
       
    
            setAnimePoster(posterImage.original);

         
            if(titles.en_us == null){

                if(titles.en == null){

                    setAnimeTitle(titles.en_jp);
                }
                else{
                    setAnimeTitle(titles.en);
                }
            }
             
            else{
                setAnimeTitle(titles.en_us);
            }

            setCurrentPageUrl(`https://kitsu.io/api/edge/anime/${match.params.animeId}/episodes`)
          
            setLoading(false);

        }
        fetchAnime();         
      
          
    
    },[ match.params.animeId]);


    useEffect(() =>{

        
        const fetchEpisodes = async () => {

            setEpisodeLoading(true);
            const episodeData = await fetch(currentPageUrl);
            const animeEpisodesData = await episodeData.json();
         
         
            setNextPageUrl(animeEpisodesData.links.next);
            setPrevPageUrl(animeEpisodesData.links.prev);
            setAnimeEpisodes(animeEpisodesData);
            setEpisodeLoading(false);

        }

        fetchEpisodes();
        

    }, [currentPageUrl])

    function gotoNextPage(){
        setCurrentPageUrl(nextPageUrl);
    }

    function gotoPrevPage(){
        setCurrentPageUrl(prevPageUrl);
    }

    

    let coverImageStyle ={
        backgroundImage: `url(${animeCover}) , linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))`,
    }


    return (
        
        <div>

            { loading ? <Stretch  /> :
            <div>
            <div className="cover-img" style={coverImageStyle}>
                
            </div>
            <SubNav id={match.url}/>
            <div className="info-container">

                <img className="poster-img" src={animePoster}></img>

            <Route exact path="/anime/:animeId/summary" component={() => <AnimeSummary title={animeTitle} summaryData={AnimeSummaryData} Genres={animeGenres}/>} />
            <Route exact path="/anime/:animeId/episodes" component={()=> <AnimeEpisodes episodeData={animeEpisodes} gotoNextPage={nextPageUrl?gotoNextPage : null} gotoPrevPage={prevPageUrl ? gotoPrevPage : null} loadingEpisode={episodeLoading} posterImg={animePoster}/>}/>

            </div>
            </div>
            }
          
        </div>
    )
}

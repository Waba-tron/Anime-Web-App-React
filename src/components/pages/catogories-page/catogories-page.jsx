import React from 'react'
import {useState, useEffect} from 'react';
import './catogories-page.css';
import { Stretch } from 'styled-loaders-react';
import AnimeList from '../../animeList/animeList.jsx';

export default function CatogoriesPage({match}) {

    const [popularCatogoryAnime, setPopularCatogoryAnime] = useState([]);
    const [ratedCatogoryAnime, setratedCatogoryAnime] = useState([])
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        
        const fetchCatogoryAnime = async () => {

            setLoading(true);

            const popularAnimeData = await fetch(`https://kitsu.io/api/edge/anime?fields%5Banime%5D=slug%2CcanonicalTitle%2Ctitles%2CposterImage%2Csynopsis%2CaverageRating%2CstartDate%2CpopularityRank%2CratingRank%2CyoutubeVideoId&filter%5Bcategories%5D=${match.params.category}&page%5Blimit%5D=20&page%5Boffset%5D=0&sort=-userCount`);

            const popularAnime = await popularAnimeData.json();

            setPopularCatogoryAnime(popularAnime.data);

            const ratedAnimeData = await fetch(`https://kitsu.io/api/edge/anime?fields%5Banime%5D=slug%2CcanonicalTitle%2Ctitles%2CposterImage%2Csynopsis%2CaverageRating%2CstartDate%2CpopularityRank%2CratingRank%2CyoutubeVideoId&filter%5Bcategories%5D=${match.params.category}&page%5Blimit%5D=20&page%5Boffset%5D=0&sort=-averageRating`);

            const ratedAnime = await ratedAnimeData.json();
            setratedCatogoryAnime(ratedAnime.data);

            setLoading(false);
        }
    fetchCatogoryAnime();
   

}, [match.params.catogory]);

    return (
        <div className="catogorys-container">
            {
                loading ? <Stretch/> :
                <div>
                <h1>Explore {match.params.catogory}</h1>
                <AnimeList titleList={`Most Popular ${match.params.category} Anime`} animeData={popularCatogoryAnime}/>
                <AnimeList titleList={`Highest Rated ${match.params.category} Anime`} animeData={ratedCatogoryAnime}/>
                </div>
            }
         
          
        </div>
    )
}

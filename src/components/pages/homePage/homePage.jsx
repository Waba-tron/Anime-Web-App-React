import React from 'react'
import {useState, useEffect} from 'react';
import AnimeList from '../../animeList/animeList.jsx';
import { Stretch } from 'styled-loaders-react';
import {Link} from 'react-router-dom';
import './homePage.css';

export default function HomePage() {

    const [popularAnime, setPopularAnime] = useState([]);

    const [highestRatedAnime, setHighestRatedAnime] = useState([]);  

    const [animeCatogories, setAnimeCatogories] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        
        const fetchPopularAnime = async () => {

            setLoading(true);

            //fetch list for most popular anime
            const data = await fetch('https://kitsu.io/api/edge/anime?sort=-userCount');

            const Anime = await data.json();
          
            setPopularAnime(Anime.data);

            //fetch list for higjestest rated anime
            const adata = await fetch('https://kitsu.io/api/edge/anime?sort=-averageRating');

            const aAnime = await adata.json();

            console.log(aAnime);
            setHighestRatedAnime(aAnime.data);

            //fetch list of catogories

            const catogoryData = await fetch('https://kitsu.io/api/edge/categories?page%5Blimit%5D=40&sort=-total_media_count');

            const Catogories = await catogoryData.json();

            setAnimeCatogories(Catogories.data);


            setLoading(false);

        }

        fetchPopularAnime();
    }, []);


    return (

        <div>
            { loading ? <Stretch/>:
            <div className="home-container">
                <div>
                <h1>Explore Anime</h1>
                <AnimeList titleList={"Most Popular Anime"} animeData={popularAnime}/>
                <AnimeList titleList={"Highest Rated Anime"} animeData={highestRatedAnime}/>
                </div>

                <div className="catogory-container">
                    <h3>Catogories</h3>
                 
                    {
                        animeCatogories.map(currentCatogory =>
                        <Link className="catogory-link" to={`categories/${currentCatogory.attributes.title}`}>{currentCatogory.attributes.title}</Link>
                        )
                    }
               
                </div>
            </div>
            }
        </div>
    )
}

import React, { useEffect, useReducer, useState } from 'react';
import './Row.css';
import axios from '../../axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
// react-multi-carousel

// import Carousel from 'react-multi-carousel';
// import './Carousel.css';

import NetSlider from "netslider";
import { data } from './data';
import "netslider/dist/styles.min.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [Movies, setMovies] = useState([]);

    const [TrailerUrl, setTrailerUrl] = useState('');



    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
                .then(request => {
                    request.data.results.map(movie => {
                        // console.log(movie)
                        setMovies([...Movies, Movies.push({
                            id: movie.id,
                            image: `${base_url}${movie?.backdrop_path}`,
                            title: movie?.name || movie?.title || movie?.original_name
                        })])
                        console.log(Movies)
                    })
                })
            // setMovies((request.data.results));
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    }

    const handleClick = (movie) => {
        if (TrailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {
                    console.log(url)
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }).catch(error => console.log(error))
        }
    }

    // set react-multi-carousel break point
    // const responsive = {
    //     superLargeDesktop: {
    //         // the naming can be any, depends on you.
    //         breakpoint: { max: 4000, min: 1400 },
    //         items: 6
    //     },
    //     Largedesktop: {
    //         breakpoint: { max: 1400, min: 1100 },
    //         items: 5
    //     },
    //     desktop: {
    //         breakpoint: { max: 1100, min: 800 },
    //         items: 4
    //     },
    //     tablet: {
    //         breakpoint: { max: 800, min: 500 },
    //         items: 3
    //     },
    //     mobile: {
    //         breakpoint: { max: 500, min: 0 },
    //         items: 2
    //     }
    // };

    console.log(Movies)

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className={`row__posters ${isLargeRow && "row__postersLarge"}`} >
                {/* <Carousel
                    responsive={responsive}
                    infinite={true}
                    slidesToSlide={2}
                >
                    {Movies.map(movie => (
                        <img
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    ))}
                </Carousel> */}

                <NetSlider
                    className={`netslider_title_card`}
                    data={Movies}
                    slideTemplate={props => <SliderContainer {...props} />}
                />
            </div>

            {TrailerUrl && <YouTube videoId={TrailerUrl} opts={opts} />}
        </div>
    )
}

function SliderContainer(props) {
    return <div className="slider-container-title">{props.title}</div>;
}


export default Row

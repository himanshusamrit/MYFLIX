import { Link, Navigate } from 'react-router-dom'
import "./Homepage.css"
import "./Player.css"
import Header from "../comonents/Header"
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
function Player() {


    let [movie, setMovie] = useState({})
    let [userMovie, setUserMovie] = useState({})
    let params = useParams()
    let [playerVisible, setPlayerVisible] = useState(false);
    let videoPlayer = useRef();



    let token = localStorage.getItem("myflix-user");
    useEffect(() => {
        let myflix_user = JSON.parse(localStorage.getItem("myflix-user"))
        fetch("https://movieflixapi01.herokuapp.com/movies/" + params.id, {
            headers: {
                "Authorization": `Bearer ${myflix_user.token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data , "movie data")
                setMovie(data)
            })
            .catch((err) => {
                console.log(err)
            })


    }, [params.id])

    useEffect(() => {
        if (playerVisible === true) {
            videoPlayer.current.currentTime=userMovie.watchtime;
        }
    }, [playerVisible])


    function play() {
        let myflix_user = JSON.parse(localStorage.getItem("myflix-user"))
        let user_id = myflix_user.user_id
        let movie_id = params.id;
        fetch("https://movieflixapi01.herokuapp.com/users/play", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myflix_user.token}`
            },
            body: JSON.stringify({ user: user_id, movie: movie_id })
        })

            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success === true) {
                    setUserMovie(data.user_movie);
                    setPlayerVisible(true);

                }
            })

            .catch((err) => {
                console.log(err);
            })


    }



    function closePlayer() {
        let myflix_user = JSON.parse(localStorage.getItem("myflix-user"))
        fetch(`https://movieflixapi01.herokuapp.com/users/closeplayer/${userMovie._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myflix_user.token}`
            },
            body: JSON.stringify({ watchtime: videoPlayer.current.currentTime })
        })
            .then((response) => response.json())

            .then((data) => {
                if (data.success === true) {

                    setPlayerVisible(false);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }



    return token !== null ? (
        <>

            {/* HEADER START  */}

            <Header />

            {/* HEADER END */}




            <section className='banner'>



                {
                    playerVisible === false ? (
                        <div className='top'>
                            <img src={movie.posterURL} alt='Top Movie' />
                            <div className='top-overlay'>
                                <div className='top-details'>
                                    <h1>{movie.name}</h1>
                                    <p>{movie.description?.substring(0, 100) + " ...."}</p>
                                    <div className='player-button'>

                                        <button onClick={play} >Play Now</button>
                                        <Link to="/homepage">
                                            <button >Back to Homepage</button>
                                        </Link>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ) : (
                        <div className='vid-player'>

                            <div className='close-player'>

                                <h3>{movie.name}</h3>
                                <i className="fa-solid fa-circle-xmark " onClick={closePlayer}></i>

                            </div>

                            <video ref={videoPlayer} controls className='movie-player' autoPlay>

                                <source src={`https://movieflixapi01.herokuapp.com/movies/stream/${movie._id}`} />
                            </video>
                        </div>

                    )
                }

            </section>

            <div className='details'>

                <div className='detail'>
                    <h1>Description : </h1>
                    <p>{movie.description}</p>
                </div>

                
                <div className='detail'>
                    <h1>Rating : </h1>
                    <p>{movie.imdbRating}</p>
                </div>

                
                <div className='detail'>
                    <h1>Runtime : </h1>
                    <p>{movie.runtime} Minutes</p>
                </div>

                   
                <div className='detail'>
                    <h1>Genres : </h1>
                    <p>{movie.genre} </p>
                </div>

                   
                <div className='detail'>
                    <h1>Release Date : </h1>
                    <p>{movie.releaseDate} </p>
                </div>

            </div>

        </>
    ) :
        <Navigate to="/login" />
}

export default Player;
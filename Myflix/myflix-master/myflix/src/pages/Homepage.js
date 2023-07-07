import { Navigate } from 'react-router-dom'
import "./Homepage.css"
import Header from "../comonents/Header"
import Category from '../comonents/Category';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Footer from '../comonents/Footer';
function Homepage() {


    let [movies, setMovies] = useState([])
    let [trending, setTrending] = useState([])
    let [scifi, setScifi] = useState([])
    let [superhero, setSuperhero] = useState([])
    let [top, setTop] = useState({})


    let token = localStorage.getItem("myflix-user");
    useEffect(() => {
        let myflix_user = JSON.parse(localStorage.getItem("myflix-user"))


        fetch("https://movieflixapi01.herokuapp.com/movies/", {
            headers: {
                "Authorization": `Bearer ${myflix_user.token}`
            }
        })

            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setMovies(data);


                let scifiMovies = data.filter((movie, index) => {
                    return movie.genre.toUpperCase().includes("sci-fi".toUpperCase())
                })

                setScifi(scifiMovies);

                let superheroMovies = data.filter((movie, index) => {
                    return movie.genre.toUpperCase().includes("superhero".toUpperCase())
                })

                setSuperhero(superheroMovies);



                let trendingMovies = data.sort((a, b) => { return b.watchers - a.watchers }).slice(0, 5)
                setTrending(trendingMovies);


                let topMovie = data.find((movie, index) => {
                    return movie.top === true
                })
                setTop(topMovie);

            })
            .catch((err) => {
                console.log(err);
            })


    }, [])



    return token !== null ? (
        <>

            {/* HEADER START  */}

            <Header />

            {/* HEADER END */}



            <section className='banner'>
                <div className='top'>
                    <img src={top.posterURL} alt='Top Movie' />
                    <div className='top-overlay'>
                        <div className='top-details'>
                            <h1>{top.name}</h1>
                            <p>{top.description?.substring(0, 100) + " ...."}</p>
                            <Link to={"/player/" + top._id}>

                                <button >Watch Now</button>
                            </Link>


                        </div>

                    </div>
                </div>

            </section>



            <Category movies={trending} title="Top 5 Trending" />
            <Category movies={superhero} title="Superhero Movies" />
            <Category movies={scifi} title="Sci-Fi Movies" />

            <Footer />
            <div className='design'>
                Designed By : Aman Bodele
            </div>
        </>
    ) :
        <Navigate to="/login" />
}

export default Homepage;
import { useEffect, useRef, useState } from "react";
// import Category from "../comonents/Category";
import { useNavigate, Link } from 'react-router-dom'

function Header() {

    let [movies, setMovies] = useState([]);
    let [filteredMovie, setFilterMovie] = useState([]);
    let [searchVisible, setSearchVisible] = useState(false);
    let [title, setTitle] = useState("Please Type For Search !!!!! ");
    let navigate = useNavigate();
    let searchInput = useRef();
    let [menuVisible, setMenuvisible] = useState(false);

    useEffect(() => {

        let myflix_user = JSON.parse(localStorage.getItem("myflix-user"))

        fetch("https://movieflixapi01.herokuapp.com/movies/", {
            headers: {
                "Authorization": `Bearer ${myflix_user.token}`
            }
        })

            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
                // console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function searchmovies(name) {
        if (name !== "") {

            let filtered = movies.filter((movie, index) => {
                return movie.name.toUpperCase().indexOf(name.toUpperCase()) === 0;
            })
            setFilterMovie(filtered);
            if (filtered.length !== 0) {

                setTitle("Search Results for '" + name + "'")
            }
            else {
                setTitle("No Result Found")
            }
        }
        else {
            setFilterMovie([]);
            setTitle("Please Type For Search !!!!!")
        }
    }

    function goToPlayer(movieId) {
        searchInput.current.value = "";
        setSearchVisible(false);
        navigate("/player/" + movieId);
    }
    function showMenu() {
        if (menuVisible === false) {
            setMenuvisible(true)
        }
        else {
            setMenuvisible(false)
        }
    }

    function logout() {
        localStorage.removeItem("myflix-user");
        navigate("/login");
    }

    let myflix_user = JSON.parse(localStorage.getItem("myflix-user"))


    return (
        <>
            <header className='header'>
                <div className='logo' >
                    <Link to="/homepage">
                        <h2>MY FLIX</h2>
                    </Link>

                </div>

                <div className='nav-two'>
                    <div className='search'>

                        <input type="text" ref={searchInput} placeholder="Search Here" onChange={(event) => {
                            searchmovies(event.target.value)
                        }}

                            onFocus={() => {
                                setSearchVisible(true)
                            }}

                            onBlur={() => {
                                if (filteredMovie.length === 0) {

                                    setSearchVisible(false)
                                }
                            }}

                        />
                        <p>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </p>

                    </div>


                    <div className="username">
                        {myflix_user.username}
                    </div>



                    <div className='profile'>

                        <i onClick={showMenu} className="fa-solid fa-user" ></i>

                    </div>

                </div>


            </header>

            {
                menuVisible === true ? (

                    <div className="menu">
                        <ul>
                            <li>Profile</li>
                            <li onClick={logout}>Logout</li>
                        </ul>
                    </div>
                ) : null

            }


            {
                searchVisible === true ? (

                    <div className="search-result">

                        <section className='category'>

                            <h1 className='category-title'>
                                {title}
                            </h1>

                            <div className='movies-list'>

                                {
                                    filteredMovie.map((movie, index) => {
                                        return (
                                            <div className='movie' key={index}>
                                                <img src={movie.posterURL} alt='movie poster' />
                                                <div className='movie-overlay'>

                                                    <h3 className='movie-title'>{movie.name}</h3>

                                                    <div className='utils'>


                                                        <button onClick={() => {
                                                            goToPlayer(movie._id)
                                                        }} >Watch Now</button>


                                                        <div className='rating'>
                                                            <i className="fa-solid fa-star"></i>
                                                            <div>{movie.imdbRating}</div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </section>


                    </div>
                ) : null
            }





        </>

    )
}
export default Header;
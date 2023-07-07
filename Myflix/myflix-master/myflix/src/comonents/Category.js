import {Link} from 'react-router-dom'
function Category(props) {
    return (
        <section className='category'>

            <h1 className='category-title'>
                {props.title}
            </h1>

            <div className='movies-list'>

                {
                    props.movies.map((movie, index) => {
                        return (
                            <div className='movie' key={index}>
                                <img src={movie.posterURL} alt='movie poster' />
                                <div className='movie-overlay'>

                                    <h3 className='movie-title'>{movie.name}</h3>

                                    <div className='utils'>
                                        <Link to={"/player/"+movie._id}>

                                            <button >Watch Now</button>
                                        </Link>

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
    )
}
export default Category;
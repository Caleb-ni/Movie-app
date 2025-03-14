import Search from "./component/search";
import { useEffect, useState } from "react";
import Spinner from "./component/Spinner"

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [ searchTerm, setSearchTerm  ] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [ movieList, setMovieList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try{
      const endPoint = `${API_BASE_URL}/discover/movie?sort_by=popilarity.desc`;

      const response = await fetch(endPoint, API_OPTIONS);
      
      if(!response.ok){
        throw new Error('failed to fetch new movie');
      }

      const data = await response.json();

      if(data.response == 'false') {
        setErrorMessage( data.error || 'Failed to fetch movies' )
        setMovieList([]);
        return;
      }
       
      setMovieList(data.results || []);
    }catch(error){
      console.error(`Error fetching movies : ${error  }`);
      setErrorMessage('Error fetching movies. Please try again later');
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <main>
      <div className='pattern'></div>
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="hero banner"/>
          <h1>Find <span className='text-gradient'>  Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className="all-movies">
          <h2>All Movies</h2>
          
         {isLoading ? (
          <Spinner />
         ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
         ) : (
          <ul>
            {movieList.map((movie) => (
              <p key={movie.id} className="text-white">{movie.title}</p>
            ))}
          </ul>
         )}
        
        </section>

      </div>
    </main>
  )
}

export default App
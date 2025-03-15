import React from 'react'

const MovieCard = ({ movie:
    { title, vote_average, release_data, original_language } 
}) => {
  return (
    <div>
        <p className='text-white'>{title}</p>
    </div>
  )
}

export default MovieCard
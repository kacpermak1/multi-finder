const initState = {

    movieKeyword: '',
    movies: []

}

const movieReducer = (state = initState, action) => {

    if (action.type === 'MOVIE_KEYWORD') {
        return {
            ...state,
            movieKeyword: action.keyword,
            movies: action.movies
        }
    }
    return state

}

export default movieReducer;
const initState = {

    musicKeyword: '',
    music: [],
    displayTopSongs: true

}

const musicReducer = (state = initState, action) => {

    if (action.type === 'MUSIC_KEYWORD') {
        return {
            ...state,
            musicKeyword: action.keyword,
            music: action.music
        }
    }else if (action.type === 'TOP_SONGS') {
        return {...state,
            displayTopSongs: !state.displayTopSongs
        }

    }
    return state

}

export default musicReducer;
const randomWords = require('random-words')

const initState = {

    pictureKeyword: randomWords(1)[0],
    picturesAmount: 15,
    pictures: []

}

const pictureReducer = (state = initState, action) => {

    if (action.type === 'KEYWORD') {
        return {
            ...state,
            pictureKeyword: action.keyword,
            picturesAmount: action.amount,
            pictures: action.images
        }
    }
    return state

}

export default pictureReducer;
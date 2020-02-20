const initState = {

   currentPage:-1

}

const appReducer = (state = initState, action) => {

    if (action.type === 'CHANGE_PAGE') {
        return {
            currentPage: action.id
        }
    }
    return state

}

export default appReducer;
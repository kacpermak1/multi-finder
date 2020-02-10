export const typePicture = (keyword, amount, images) => {
    return {
        type: "PICTURE_KEYWORD",
        keyword,
        amount,
        images
    }
}

export const typeMovie = (keyword, movies) => {
    return {
        type: "MOVIE_KEYWORD",
        keyword,
        movies
    }
}
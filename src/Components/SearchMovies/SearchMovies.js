import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import MoviesResults from '../MoviesResults/MoviesResults';
import Grid from '@material-ui/core/Grid';
import { typeMovie } from '../Actions/index';
import { connect } from 'react-redux';

class SearchMovies extends Component {

    componentDidMount() {
        if (this.props.movies.length < 1) {
            this.fetchData();
            this.props.typeMovie('', this.props.movies);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.keyword !== this.props.keyword && this.props.keyword === ''){return null}else if(
            prevProps.keyword !== this.props.keyword) {
            this.fetchData();
        }
    }

    fetchData = () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=fdfd76b83d61c6a42b476b1cf05cc0d8&query=${this.props.keyword}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.props.typeMovie(this.props.keyword, data.results))
            .catch(error => console.log(error));
    }

    onTitleChange = (e) => {
        const val = e.target.value;
        this.props.typeMovie(val, this.props.movies)
    }

    onSearchBarClick = () => {
        this.props.typeMovie('', this.props.movies)
    }

    render() {

        const { movies } = this.props

        return (
            <div className="container">
                <TextField name="searchTitle" value={this.props.keyword} onClick={this.onSearchBarClick} onChange={this.onTitleChange} floatingLabelText="search for movies" fullWidth={true} />
                <br />
                <Grid container spacing={10} style={{ padding: '20px' }}>
                    {this.props.movies.length > 0 ? movies.map(movie => <Grid key={movie.id} item xs={12} sm={6} md={4} lg={4} xl={3}><MoviesResults title={movie.title} vote={movie.vote_average} overview={movie.overview} date={"Released " + movie.release_date} id={movie.id} image={"https://image.tmdb.org/t/p/w500" + movie.poster_path} /></Grid>) : null}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        keyword: state.movieReducer.movieKeyword,
        movies: state.movieReducer.movies
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        typeMovie: (keyword, movies) => { dispatch(typeMovie(keyword, movies)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchMovies);
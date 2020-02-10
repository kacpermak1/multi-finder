import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import MoviesResults from '../MoviesResults/MoviesResults';
import Grid from '@material-ui/core/Grid';

class SearchMovies extends Component {

    state = {
        searchTitle: '',
        movies: [],
        error: false,
        isLoading: true
    }

    onTitleChange = (e) => {
        const val = e.target.value;
        this.setState({ [e.target.name]: val }, () => {
            if (val === '') { this.setState({ movies: [] }) } else {
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=fdfd76b83d61c6a42b476b1cf05cc0d8&query=${this.state.searchTitle}`)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Something went wrong ...');
                        }
                    })
                    .then(data => this.setState({ movies: data.results, isLoading: false }))
                    .catch(error => this.setState({ error: true, isLoading: false }));
            }
        }
        )
    }

    render() {

        const { movies } = this.state

        return (
            <div className="container">
                <TextField name="searchTitle" value={this.state.searchTitle} onChange={this.onTitleChange} floatingLabelText="search for movies" fullWidth={true} />
                <br />
                <Grid container spacing={10} style={{padding:'20px'}}>
                {this.state.movies.length > 0 ? movies.map(movie => <Grid key={movie.id} item xs={12} sm={6} md={4} lg={4} xl={3}><MoviesResults title={movie.title} vote={movie.vote_average} overview={movie.overview} date={"Released "+movie.release_date} id={movie.id} image={"https://image.tmdb.org/t/p/w500"+movie.poster_path}/></Grid> ): null}
                </Grid>
            </div>
        )
    }
}

export default SearchMovies;
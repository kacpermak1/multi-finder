import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ImageResults from '../ImageResults/ImageResults';
import { connect } from 'react-redux';
import { typeKeyword } from '../Actions/index';

class Search extends Component {

    state = {
        apiUrl: 'https://pixabay.com/api',
        apiKey: '15164621-e9e63a50c846d79421bd72c77'
    }

    componentDidMount() {

        if (this.props.images.length < 1) {

            fetch(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.props.keyword}&image_type=photo&per_page=${this.props.amount}&safesearch=true`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong ...');
                    }
                })
                .then(data => this.props.typeKeyword(this.props.keyword, this.props.amount, data.hits))
                .catch(error => console.log("error: " + error));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        
        if (prevProps.keyword !== this.props.keyword || prevProps.amount !== this.props.amount) {
            fetch(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.props.keyword}&image_type=photo&per_page=${this.props.amount}&safesearch=true`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong ...');
                    }
                })
                .then(data => this.props.typeKeyword(this.props.keyword, this.props.amount, data.hits))
                .catch(error => console.log("error: " + error));
        }
    }

    onTextChange = (e) => {
        const val = e.target.value;
        this.props.typeKeyword(val, this.props.amount, this.props.images)
    }

    onAmountChange = (e, index, val) => {

        this.props.typeKeyword(this.props.keyword, val, this.props.images)

    }

    render() {

        return (
            <div className="container">
                <TextField name="searchText" value={this.props.keyword} onChange={this.onTextChange} floatingLabelText="search for images" fullWidth={true} />
                <br />
                <SelectField name="amount" floatingLabelText="Amount" value={this.props.amount} onChange={this.onAmountChange}>
                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={20} primaryText="20" />
                    <MenuItem value={25} primaryText="25" />
                </SelectField>
                <br />
                {this.props.images.length > 0 ? <ImageResults images={this.props.images} /> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        keyword: state.pictureKeyword,
        amount: state.picturesAmount,
        images: state.pictures
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        typeKeyword: (keyword, amount, images) => { dispatch(typeKeyword(keyword, amount, images)) },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);
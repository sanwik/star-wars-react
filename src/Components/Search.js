import React, { Component } from 'react';
import { Typography, TextField, Paper } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const SearchItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginTop: 5,
  color: theme.palette.text.secondary,
}));

class Search extends Component {

  constructor(props)
  {
      super(props);
      this.state = { currentCategory : this.props.currentCategory };
  }

    render() {
      return (
        <SearchItem>
          <Typography variant="h6" component="h6">
              <SearchIcon className="icon search" color="primary" sx={{ fontSize: 18 }} />
              Search {this.props.currentCategory}
          </Typography>
          <TextField key="editor1" autoFocus id="outlined-basic" label="Search" size="small" variant="outlined" 
            autoComplete='off' onChange={(e) => this.props.searchString(e.target.value)} />    
      </SearchItem>
      );
  };

}

export default Search;
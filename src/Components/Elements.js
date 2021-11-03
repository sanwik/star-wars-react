import React, { Component } from 'react';
import { Button, Typography, List, ListItem, ListItemText, } from '@material-ui/core';
import ListIcon from '@mui/icons-material/List';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

class Elements extends Component {

  constructor(props)
  {
      super(props);
      this.state = { currentCategory : this.props.currentCategory };
  }

    render() {
      return (
        <div>
            <Typography variant="h6" component="h6">
                <ListIcon className="icon list" color="primary" sx={{ fontSize: 18 }} />
                {this.props.currentCategory} ({this.props.pageIndex}/{this.props.totalPages})
            </Typography>
            <List>
                {this.props.currentElements.map((element, key) => (
                    <ListItem key={element + key} onClick={ () => this.props.handleSelectionItems(element[1]) }>
                        <ArrowForwardIosRoundedIcon key={element} className="icon list-arrow" color="primary" sx={{ fontSize: 14 }} />
                        <ListItemText primary={element[0]}/>
                    </ListItem>
                ))}
            </List>
            <Button color="primary" variant="outlined" 
            onClick={() => this.props.fetchElements(this.props.previousLink)} 
            disabled={!this.props.previousLink}>Previous</Button>&nbsp;&nbsp;
            <Button color="primary" variant="outlined" 
            onClick={() => this.props.fetchElements(this.props.nextLink)} 
            disabled={!this.props.nextLink}>Next</Button> 
      </div>
      );
  };

}

export default Elements;
import React, { Component } from "react";
import { Typography, ListItem, ListItemText, Paper} from '@material-ui/core';
import ListIcon from '@mui/icons-material/List';
import { styled } from '@mui/material/styles';

const SelectionItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop: 5,
    minHeight: 590,
    color: theme.palette.text.secondary,
}));

class Information extends Component {

    constructor(props)
    {
        super(props);
        this.state = { category : this.props.data };
    }

    render() {
        return (
            <SelectionItem>
                
                <Typography variant="h6" component="h6">
                    <ListIcon className="icon list" color="primary" sx={{ fontSize: 18 }} /> Information
                </Typography>
                {this.props.selectionItems.map(info => (
                    <ListItem key={info}>
                        <ListItemText className="info"><b>{info[0]}</b>: {info[1]}</ListItemText>
                    </ListItem>
                ))}           
            </SelectionItem>
        );
    };
}

export default Information;
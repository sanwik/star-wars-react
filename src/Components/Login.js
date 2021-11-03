import React from 'react';
import { TextField, Container, Button, Paper, Typography } from '@material-ui/core';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LockOpenIcon from '@mui/icons-material/LockOpen';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            loginMessage: "",
            loginColor: "primary"};
        this.username = "";
        this.password = "";
        this.users = {};
        
    }

    tryLogin() {
        
        if (localStorage.getItem(this.username) === this.password) {
            this.setState({loginColor: "primary", loginMessage : "Login successful! Redirecting..."});
            localStorage.setItem("currentUser", this.username);
            window.open("./catalog","_self");
        } else {
            this.setState({loginColor: "error", loginMessage : "Incorrect password. Try again."});
        }

    }

    tryRegister() {

        if (localStorage.getItem(this.username) === null) {
            localStorage.setItem(this.username, this.password);
            this.setState({loginColor: "primary", loginMessage : "Registration successful! Try to login."});
        } else {
            this.setState({loginColor: "error", loginMessage : "This username is taken!"});
        }
        
    }

    changePassword = e => {
        this.password = e.target.value;
        if (this.username && this.password) {
            this.setState({disabled: false});
        } else {
            this.setState({disabled: true});
        }
    }

    changeUsername = e => {
        this.username = e.target.value;
        if (this.username && this.password) {
            this.setState({disabled: false});
        } else {
            this.setState({disabled: true});
        }
    }

    render() {

        return (
            <Container maxWidth="xs">
                <Paper className="login-paper">
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        <MenuBookIcon className="catalog" color="primary" sx={{ fontSize: 25 }} />
                        Star Wars Catalog
                    </Typography>
                    <Typography className="login-header" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <LockOpenIcon className="unlock" color="primary" sx={{ fontSize: 20 }} />
                        Login
                    </Typography>
                    <TextField variant="outlined" label="Username" type="text"
                        onChange = { e => this.changeUsername(e)} />
                    <TextField variant="outlined" label="Password" type="password" 
                        onChange = { e => this.changePassword(e)} />
                    <Typography id="passwordMessage" variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
                        This is a very insecure application. The login details are saved in local storage. 
                    </Typography>
                    <Button type="submit" variant="contained" color="primary" disableElevation
                        onClick={() => this.tryLogin()} disabled={this.state.disabled}>Login</Button>
                    <Button type="submit" variant="contained" color="default" disableElevation
                        onClick={() => this.tryRegister()} disabled={this.state.disabled}>Register</Button>
                    <Typography color={this.state.loginColor} id="loginMessage" variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                        {this.state.loginMessage} &nbsp;
                    </Typography>
                </Paper>
            </Container>
        );
    }
}

export default Login;
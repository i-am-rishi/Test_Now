import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import "./Welcome.css";
class Welcome extends Component {
    state = {
        toggle: false,
        email: "",
        password: "",
        xauthtoken: "" + this.props.token
    }

    setServer = async () => {
        const { email, password } = this.state;
        const list = { email: email, password: password };
        try {
            const { data } = await axios.post("http://localhost:5000/api/auth", list);
            this.setState({ xauthtoken: data[0] });
            localStorage.setItem("x-auth-token", data[0]);
            localStorage.setItem("email", data[1]);
        }
        catch (ex) {
            alert("Something went wrong!");
        }
        this.setState({ email: "", password: "" });
    }
    render() {
        return (
            <div className="welcome-container">
                {!(localStorage.getItem('x-auth-token')) ?
                    <div className="welcome-signUp-logIn">
                        {(this.state.toggle) ?
                            <div className="welcome-signUp">
                                <div onClick={() => this.setState({ toggle: false })} className="welcome-signUp-label">SignUp</div>
                                <label htmlFor="email" className="signUp-email">Email</label><br />
                                <input type="email" onChange={(e) => this.setState({ email: e.target.value })} name="email" value={this.state.email} /><br />
                                <label htmlFor="password" className="signUp-password">Password</label><br />
                                <input type="password" onChange={(e) => this.setState({ password: e.target.value })} name="password" value={this.state.password} /><br />
                                <input type="submit" onClick={() => this.setServer()} className="welcome-signUp-submit" value="Submit" />
                            </div>
                            :
                            <div className="welcome-logIn">
                                <div onClick={() => this.setState({ toggle: true })} className="welcome-logIn-label">LogIn</div>
                                <label htmlFor="email" className="logIn-email">Email</label><br />
                                <input type="email" onChange={(e) => this.setState({ email: e.target.value })} name="email" value={this.state.email} /><br />
                                <label htmlFor="password" className="logIn-password">Password</label><br />
                                <input type="password" onChange={(e) => this.setState({ password: e.target.value })} name="password" value={this.state.password} /><br />
                                <input type="submit" onClick={() => this.setServer()} className="welcome-logIn-submit" value="Submit" />
                            </div>

                        }
                    </div>
                    :
                    <>
                        <div className="welcome-title">Welcome to TestNow</div>
                        <Link to="/test" className="welcome-test-button">Start Test</Link>

                    </>
                }
            </div>
        );
    }
}

export default Welcome;
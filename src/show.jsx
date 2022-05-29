import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Body from './components/Body/Body';
import Welcome from './components/Welcome/Welcome';
import Admin from './components/Admin/Admin';

class Show extends Component {
    state = {
        token: localStorage.getItem("x-auth-token")
    }

    render() {
        return (
            <BrowserRouter>
                <NavBar />

                <Switch>
                    <Route path="/" exact render={() => <Welcome />} />
                    <Route path="/test" render={() => <Body token={this.state.token} />} />
                    <Route path="/admin" render={() => <Admin />} />
                </Switch>

            </BrowserRouter>
        );
    }
}

export default Show;
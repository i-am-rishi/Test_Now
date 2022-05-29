import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Admin.css';

import Add from './Add/Add';
import Get from './Get/Get';
import Modify from './Modify/Modify';

class Admin extends Component {
    state = {
        action: "",
        token: localStorage.getItem('x-auth-token'),
        email: localStorage.getItem('email')
    }
    render() {
        if (this.state.token === null)
            return <Redirect to="/" />
        return (
            <div className="admin-container">
                <div className="admin-contents">
                    <label htmlFor="actions" >Choose actions:</label>
                    <select name="actions" onChange={(e) => this.setState({ action: e.target.value })} id="actions">
                        <option value="">Actions</option>
                        <option value="add">Add Questions</option>
                        <option value="get">Get Questions</option>
                        <option value="modify">Modify Questions</option>
                    </select>
                </div>

                {this.state.action === "add" && <Add token={this.state.token} email={this.state.email} />}
                {this.state.action === "get" && <Get token={this.state.token} email={this.state.email} />}
                {this.state.action === "modify" && <Modify token={this.state.token} email={this.state.email} />}

            </div>
        );
    }
}

export default Admin;
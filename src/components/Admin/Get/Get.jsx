import React, { Component } from 'react';
import axios from 'axios';

import './Get.css';

class Get extends Component {
    state = {
        list: [],
        delete: [],
        token: this.props.token,
        email: this.props.email,
    }

    async componentDidMount() {
        this.getServer();
    }

    getServer = async () => {
        const { data: list } = await axios.get("http://localhost:5000/api/ques", { headers: { 'x-auth-token': this.state.token } });
        this.setState({ list });
    }

    deleteServer = async () => {
        try {
            await axios.delete("http://localhost:5000/api/ques/" + this.state.delete._id, { headers: { 'x-auth-token': this.state.token, 'email': this.state.email } });
            this.getServer();
        }
        catch (error) {
            alert("Something Wrong!");
        }
    }
    render() {
        return (
            <div className="get-container">
                {!(this.state.delete.length === 0) && <div className="get-delete-box">
                    <div className="get-warning">Are You Sure you want to delete?</div>
                    <div className="get-confirmation">{this.state.delete.que}</div>
                    <div className="get-yes-or-no">
                        <div className="get-yes" onClick={() => { this.deleteServer(); this.setState({ delete: "" }); }}>Yes</div>
                        <div className="get-no" onClick={() => this.setState({ delete: "" })}>No</div>
                    </div>
                </div>}
                {this.state.list.map(e => (
                    <div key={e._id} className="get-contents" onClick={() => this.setState({ delete: e })}>
                        <div className="get-id">id - {e._id}</div>
                        <div className="get-que">Question - {e.que}</div>
                        <div className="get-options">
                            <div className="get-option1">1 - {e.option1}</div>
                            <div className="get-option2">2 - {e.option2}</div>
                            <div className="get-option3">3 - {e.option3}</div>
                            <div className="get-option4">4 - {e.option4}</div>
                        </div>
                        <div className="get-answer">Answer - {e.answer}</div>
                    </div>
                ))
                }
            </div>
        );
    }
}

export default Get;
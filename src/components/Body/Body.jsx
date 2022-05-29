import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './Body.css';
import Body_Question from './Body-Question/Body_Question';
import Body_Answer from './Body-Answer/Body_Answer';

class Body extends Component {
    state = {
        questions: [],
        array: [],
        time: [0, 0, 0],
        list: [],
        token: this.props.token
    }

    async componentDidMount() {
        this.getServer();
    }

    getClock = () => {
        setInterval(() => {
            let second = this.state.time[2];
            second = second + 1;
            let temp = this.state.time;
            temp[2] = second;
            if (temp[2] >= 60) {
                temp[2] = 0;
                temp[1] = temp[1] + 1;
            }
            if (temp[1] >= 60) {
                temp[1] = 0;
                temp[0] = temp[0] + 1;
            }
            this.setState(temp);
        }, 1000);
    }

    getServer = async () => {
        window.scrollTo(0, 0);
        this.setState({ list: [], time: [0, 0, 0] });
        this.getClock();
        try {
            const { data: questions } = await axios.get("http://localhost:5000/api/ques", { headers: { 'x-auth-token': localStorage.getItem('x-auth-token') } });
            this.setState({ questions });
        } catch (error) {
            alert('Some error occurred or You are not an Authentic User');
        }

    }

    getResults = async (x, y) => {
        let z = [x, y];
        window.scrollTo(0, 0);
        const { data: result } = await axios.post("http://localhost:5000/api/ques/submit", z);
        this.setState({ list: result });
    }



    render() {
        if (!this.state.token) {
            return <Redirect to="/" />
        }

        return (
            <>
                {(this.state.list.length === 0) ?
                    <Body_Question getResults={this.getResults} questions={this.state.questions} />
                    :
                    <Body_Answer getServer={this.getServer} list={this.state.list} />
                }
            </>
        );
    }
}

export default Body;
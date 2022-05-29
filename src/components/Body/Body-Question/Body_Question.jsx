import React, { Component } from 'react'

export default class Body_Question extends Component {
    state = {
        array: [],
        time: [0, 0, 0]
    }

    componentDidMount() {

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

    handleChange = (id, que, option) => {
        let array = this.state.array;
        let alter = array.filter(e => e._id === id);

        if (alter.length === 0) {
            array.push({ _id: id, que: que, answer: option });
            this.setState({ array });
        }
        else {
            const index = array.indexOf(alter[0]);
            array[index].que = que;
            array[index].answer = option;
            this.setState({ array });
        }
    }

    render() {
        const { getResults, questions } = this.props;
        const { time } = this.state;
        return (
            <div className="body-container">
                <div className="body-clock">
                    <div className="body-clock-title">Time</div>
                    <div className="body-timer">{time[0]} : {time[1]} : {time[2]}</div>
                </div>
                <div onClick={() => { getResults(this.state.array, this.state.time) }} className="body-button">Submit</div>
                {questions.map(e => (
                    <div key={e._id} className="body-contents">
                        <div className="body-question">{e.que}</div>
                        <div className="body-options">
                            <input type="radio" onChange={() => this.handleChange(e._id, e.que, e.option1)} name={e._id} value="option1" />
                            <label htmlFor="option1">{e.option1}</label>
                            <input type="radio" onChange={() => this.handleChange(e._id, e.que, e.option2)} name={e._id} value="option2" />
                            <label htmlFor="option2">{e.option2}</label>
                            <input type="radio" onChange={() => this.handleChange(e._id, e.que, e.option3)} name={e._id} value="option3" />
                            <label htmlFor="option3">{e.option3}</label>
                            <input type="radio" onChange={() => this.handleChange(e._id, e.que, e.option4)} name={e._id} value="option4" />
                            <label htmlFor="option4">{e.option4}</label>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

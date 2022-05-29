import React, { Component } from 'react'

export default class Body_Answer extends Component {

    handleCount = (e) => {
        let flag = 0;
        for (let i = 0; i < e.length; i++) {
            if (e[i] === 1) flag++;
        }
        return (flag);
    }
    render() {
        const { getServer, list } = this.props;
        return (
            < div className="result-container">
                <div onClick={() => getServer()} className="body-button">Retry</div>
                <div className="result-outcome">
                    <div className="result-attempted">Number of Questions attempted - {list[1] && list[1].length}</div>
                    <div className="result-correct-answers">Number of Questions answered correct - {list[1] && this.handleCount(list[1])}</div>
                    <div className="result-time-duration">Time Duration - {list[2]} hours</div>
                    <div className="result-score">Your Score - {list[3]}</div>
                </div>
                {list[0] && list[0].map(e => (
                    <div key={e.que} className={(e.answer === e.canswer) ? "result-contents-correct" : "result-contents-wrong"}>
                        <div className="result-que">{e.que}</div>
                        <div className="result-yanswer"> Your Answer :- {e.answer}</div>
                        <div className="result-canswer"> Correct Answer :- {e.canswer}</div>
                    </div>
                ))}
            </div>
        )
    }
}

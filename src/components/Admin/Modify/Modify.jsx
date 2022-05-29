import React, { Component } from 'react';
import axios from 'axios';

import './Modify.css';
class Modify extends Component {
    state = {
        token: this.props.token,
        email: this.props.email,
        list: [],
        keyword: "",
        modiList: [],
        _id: "",
        category: "",
        subject: "",
        que: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: ""
    }

    async componentDidMount() {
        this.getServer();
    }

    getServer = async () => {
        const { data: list } = await axios.get("http://localhost:5000/api/ques", { headers: { 'x-auth-token': this.state.token } });
        this.setState({ list });
    }

    modifyServer = async () => {
        const { data: list } = await axios.post("http://localhost:5000/api/ques/update", { keyword: this.state.keyword }, { headers: { 'x-auth-token': this.state.token, 'email': this.state.email } });
        this.setState({ list });
    }

    setList = (list) => {
        this.setState({ que: list.que, _id: list._id, category: list.category, subject: list.subject, option1: list.option1, option2: list.option2, option3: list.option3, option4: list.option4 })
    }

    updateServer = async () => {
        const { _id, que, category, subject, option1, option2, option3, option4, answer } = this.state;
        let newList = {
            que: que, category: category, subject: subject, option1: option1, option2: option2, option3: option3, option4: option4, answer: answer
        }
        if (que === "" || category === "" || subject === "" || option1 === "" || option2 === "" || option3 === "" || option4 === "" || answer === "")
            alert("One Value is missing");
        else {
            try {
                await axios.put("http://localhost:5000/api/ques/" + _id, newList, { headers: { 'x-auth-token': this.state.token, 'email': this.state.email } });
                this.setState({
                    _id: "",
                    que: "",
                    category: "",
                    subject: "",
                    option1: "",
                    option2: "",
                    option3: "",
                    option4: "",
                    answer: ""
                });
            } catch (error) {
                alert("Either You are not authorized or There is an error");
            }

        }
    }

    render() {
        return (
            <div className="modify-container">
                <div className="modify-keyword-division">
                    <label htmlFor="modify-keywords" className="modify-keywords">Enter Keywords</label>
                    <input type="text" onChange={(e) => { this.setState({ keyword: e.target.value }); this.modifyServer() }} className="modify-keywords-input" name="modify-keywords" id="modify-keywords" /><br />
                    {/* <div onClick={() => this.modifyServer()} className="modify-search-button">Search</div> */}
                </div>

                {(this.state._id.length === 0) ?
                    <>
                        {this.state.list.map(e => (
                            <div className="get-contents" key={e._id} onClick={() => this.setList(e)}>
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
                    </>
                    :
                    <>
                        <label htmlFor="add-question" className="add-question">Question</label><br />
                        <input type="text" onChange={(e) => this.setState({ que: e.target.value })} className="add-input-question" name="add-question" id="add-question" value={this.state.que} /><br />
                        <label htmlFor="add-option1" className="add-option1">Option 1</label><br />
                        <input type="text" onChange={(e) => this.setState({ option1: e.target.value })} name="add-option1" className="add-input-options" id="add-option1" value={this.state.option1} /><br />
                        <label htmlFor="add-option2" className="add-option2">Option 2</label><br />
                        <input type="text" onChange={(e) => this.setState({ option2: e.target.value })} name="add-option2" className="add-input-options" id="add-option2" value={this.state.option2} /><br />
                        <label htmlFor="add-option3" className="add-option3">Option 3</label><br />
                        <input type="text" onChange={(e) => this.setState({ option3: e.target.value })} name="add-option3" className="add-input-options" id="add-option3" value={this.state.option3} /><br />
                        <label htmlFor="add-option4" className="add-option4">Option 4</label><br />
                        <input type="text" onChange={(e) => this.setState({ option4: e.target.value })} name="add-option4" className="add-input-options" id="add-option4" value={this.state.option4} /><br />
                        <div className="add-answer">
                            <label htmlFor="answer" >Choose answer:</label>
                            <select name="answer" onChange={(e) => this.setState({ answer: e.target.value })} id="answers" >
                                <option value="">Options</option>
                                <option value={this.state.option1}>Option 1</option>
                                <option value={this.state.option2}>Option 2</option>
                                <option value={this.state.option3}>Option 3</option>
                                <option value={this.state.option4}>Option 4</option>
                            </select><br />
                            <label htmlFor="category" >Choose category:</label>
                            <select name="category" onChange={(e) => this.setState({ category: e.target.value })} id="category" value={this.state.category}>
                                <option value="">Options</option>
                                <option value="general">General</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select><br />
                            <label htmlFor="subject" >Choose subject:</label>
                            <select name="subject" onChange={(e) => this.setState({ subject: e.target.value })} id="subject" value={this.state.subject}>
                                <option value="">Options</option>
                                <option value="history">History</option>
                                <option value="current affairs">Current Affairs</option>
                                <option value="geography">Geography</option>
                                <option value="biology">Biology</option>
                                <option value="physics">Physics</option>
                                <option value="mathematics">Mathematics</option>
                                <option value="literature">Literature</option>
                            </select><br />
                        </div>
                        <input type="submit" onClick={() => this.updateServer()} value="Submit" className="add-submit" />
                    </>
                }
            </div>
        );
    }
}

export default Modify;
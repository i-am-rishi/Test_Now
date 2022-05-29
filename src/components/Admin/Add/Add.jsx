import React, { Component } from 'react';
import axios from 'axios';

import './Add.css';
class Add extends Component {
    state = {
        que: "",
        category: "",
        subject: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: ""
    }

    postServer = async () => {
        const { que, category, subject, option1, option2, option3, option4, answer } = this.state;
        if (que === "" || category === "" || subject === "" || option1 === "" || option2 === "" || option3 === "" || option4 === "" || answer === "")
            alert("One Value is missing");
        else {
            const { token, email } = this.props;
            try {
                await axios.post("http://localhost:5000/api/ques/", this.state, { headers: { 'x-auth-token': token, 'email': email } });
                this.setState({
                    que: "",
                    category: "",
                    subject: "",
                    option1: "",
                    option2: "",
                    option3: "",
                    option4: "",
                    answer: ""
                });
            }
            catch (error) {
                alert("Something is wrong!");
            }
        }
    }
    render() {
        return (
            <div className="add-container">
                <label htmlFor="add-question" className="add-question">Enter Question</label><br />
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
                    <select name="answer" onChange={(e) => this.setState({ answer: e.target.value })} id="answer" value={this.state.answer}>
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
                <input type="submit" onClick={() => this.postServer()} value="Submit" className="add-submit" />
            </div>
        );
    }
}

export default Add;
import React from "react";
import { connect } from "react-redux";
import { changeDate } from "../store/date";

class DateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: false,
      date: this.props.date || "2022-01-02",
    };
    this.setUpDateChange = this.setUpDateChange.bind(this);
    this.handleDateSubmit = this.handleDateSubmit.bind(this);
  }
  setUpDateChange() {
    console.log("clicked");
    this.setState({ userInput: true });
  }
  handleDateInput(event) {
    this.setState({ date: event.target.value });
  }
  handleDateSubmit(event) {
    event.preventDefault();
    if (this.checkDateValidity(this.state.date)) {
      this.props.changeDate(this.state.date);
      this.setState({ date: this.state.date, userInput: false });
    }
  }
  render() {
    console.log(this.state);
    return (
      <div className="date-picker">
        {this.state.userInput ? (
          <div>
            <form onSubmit={(event) => this.handleDateSubmit(event)}>
              <input
                value={this.state.date}
                onChange={(event) => this.handleDateInput(event)}
              />
            </form>
          </div>
        ) : (
          <h1 onClick={this.setUpDateChange}>{this.state.date}</h1>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    date: state.date,
  };
}

function mapDispatchToProps(dispatch) {
  return { changeDate: (date) => dispatch(changeDate(date)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(DateContainer);

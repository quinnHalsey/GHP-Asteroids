import React from "react";
import { connect } from "react-redux";
import { changeDate } from "../store/date";

class DateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: false,
      date: this.props.date || "2022-01-02",
      dateError: false,
    };
    this.setUpDateChange = this.setUpDateChange.bind(this);
    this.handleDateSubmit = this.handleDateSubmit.bind(this);
    this.checkDateValidity = this.checkDateValidity.bind(this);
  }
  setUpDateChange() {
    this.setState({ userInput: true });
  }
  handleDateInput(event) {
    this.setState({ date: event.target.value });
  }
  checkDateValidity(date) {
    const alpha = `abcdefghijklmnopqrstuvwxyz'/?<>+{}[]`;
    if (date.length < 10 || date.length > 10) {
      this.setState({ dateError: true });
      return false;
    }
    for (let i = 0; i < date.length; i++) {
      if (alpha.includes(date[i])) {
        this.setState({ dateError: true });
        return false;
      }
    }
    this.setState({ dateError: false });
    return true;
  }
  handleDateSubmit(event) {
    event.preventDefault();
    if (this.checkDateValidity(this.state.date)) {
      this.props.changeDate(this.state.date);
      this.setState({ date: this.state.date, userInput: false });
    }
  }
  render() {
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
            {this.state.dateError ? (
              <div className="error">
                <p>Invalid date.</p>
                <p>Dates much be in the form YYYY/MM/DD.</p>
              </div>
            ) : (
              <></>
            )}
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

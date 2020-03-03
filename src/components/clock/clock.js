import React, { Component } from 'react';

class Clock extends Component {
  timerID = null;

  state = {
    date: new Date()
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.sec(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  sec() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    const { date } = this.state;

    return (
      <div className="clock">
        <h2>{date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

export default Clock;

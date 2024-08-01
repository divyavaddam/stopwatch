// Write your code here
import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {
    isTimerRunning: false,
    elapsedSeconds: 0,
    elapsedMinutes: 0,
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  displayElapsedTime = () => {
    const {elapsedMinutes, elapsedSeconds} = this.state

    const minutes = elapsedMinutes > 9 ? elapsedMinutes : `0${elapsedMinutes}`
    const seconds = elapsedSeconds > 9 ? elapsedSeconds : `0${elapsedSeconds}`
    return `${minutes}:${seconds}`
  }

  start = () => {
    const {elapsedSeconds} = this.state
    if (elapsedSeconds === 60) {
      this.setState(prevState => ({
        elapsedMinutes: prevState.elapsedMinutes + 1,
        elapsedSeconds: 1,
        isTimerRunning: true,
      }))
    } else {
      this.setState(prevState => ({
        elapsedSeconds: prevState.elapsedSeconds + 1,
        isTimerRunning: true,
      }))
    }
  }

  onClickingStart = () => {
    this.intervalId = setInterval(this.start, 1000)
  }

  onClickingStop = () => {
    const {elapsedMinutes, elapsedSeconds} = this.state
    clearInterval(this.intervalId)
    this.setState({
      elapsedMinutes,
      elapsedSeconds,
      isTimerRunning: false,
    })
  }

  onClickingReset = () => {
    clearInterval(this.intervalId)
    this.setState({
      elapsedMinutes: 0,
      elapsedSeconds: 0,
      isTimerRunning: false,
    })
  }

  render() {
    const {isTimerRunning} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Stopwatch</h1>
        <div className="time-display-container">
          <div className="content-container">
            <div className="timer-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
                className="stopwatch"
              />
              <p className="timer">Timer</p>
            </div>
            <h1 className="elapsed-time">{this.displayElapsedTime()}</h1>
            <div className="btns">
              <button
                className="btn btn-start"
                type="button"
                onClick={this.onClickingStart}
                disabled={isTimerRunning}
              >
                Start
              </button>
              <button
                className="btn btn-stop"
                type="button"
                onClick={this.onClickingStop}
              >
                Stop
              </button>
              <button
                className="btn btn-reset"
                type="button"
                onClick={this.onClickingReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch

class Stopwatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      running: false,
      times: {      
          minutes: 0,
          seconds: 0,
          miliseconds: 0
      },
    }
  }
  
  reset() {
    this.setState({
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }

  print() {
        this.state.display.innerText = this.format(this.times);
  }


  format() {
    return `${pad0(minutes)}:${pad0(seconds)}:${pad0(Math.floor(miliseconds))}`;
  }

  start() {
    if (!this.state.running) {
      this.setState({
        running: true,
        watch: setInterval(() => this.step(), 10)
      })
    }
  } 

  step() {
    if (!this.state.running) {
      return;
    }
    this.calculate();
  }


  calculate() {
    const times = this.state.times;
    times.miliseconds += 1;
    if (miliseconds >= 100) {
      seconds += 1;
      miliseconds = 0;
    }
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    this.setState({
        times: times          
    });
  }

  stop() {
    this.setState({
      running: false
    });
    clearInterval(this.state.watch);
  }

  render() {
    return ( 
      <div className="stoper">
        <nav className="buttons">
          <a href='#' className='button' id='start' onClick={this.start}>Start</a>
          <a href='#' className='button' id='stop' onClick={this.stop}>Stop</a>
        </nav>
         <div className="results">{this.format()}</div>
      </div>
    )
  }

}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
     result = '0' + result;
  }
  return result;
}
 

ReactDOM.render(<Stopwatch/>, document.getElementById('app'));
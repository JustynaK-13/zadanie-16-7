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
    this.reset = this.reset.bind(this);
    this.start = this.start.bind(this);
    this.step = this.step.bind(this);
    this.stop = this.stop.bind(this);
    
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
        this.display.innerText = this.format(this.times);
  }
  
  format() {
        let times = this.state.times;
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  start() {
    if (!this.state.running) {
      this.setState({
        running: true,
        watch: setInterval(() => this.step(), 10) 
      });   
    }
  } 

 
   step() {
    if (!this.state.running) return;
    this.calculate();
  }
  
  calculate() {
    let times = this.state.times;
    times.miliseconds += 1;
    if (times.miliseconds >= 100) {
      times.seconds += 1;
      times.miliseconds = 0;
    }
    if (times.seconds >= 60) {
      times.minutes += 1;
      times.seconds = 0;
    }
    this.setState( { times });       
  }      
   

  stop() {
    this.setState({ running: false }),
    clearInterval(this.state.watch);
  }

 

  render() {
    return ( 
      <div className="stoper">
        <nav className="controls">
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
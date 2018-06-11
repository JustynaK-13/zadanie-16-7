class Stopwatch extends React.Component {
  constructor(props, display) {
    	super(props);
    	this.state = { 
    		  running: false,
          display = display;
      },
    		  
      this.reset();
      this.print(this.times);
  }
        	

  reset() {
      this.times = {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
      };
  }

  print() {
      this.state.display.innerText = this.format(this.times);
	}

	format(times) {
      return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
      if (!this.state.running) {
          this.state.running = true; 
         
          this.watch: setInterval(() => this.step(), 10);
      }
  } 

	step() {
      if (!this.state.running) return;
      this.calculate();
      this.print();
  }

  calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
  }

	stop() {
      this.state.running = false; 
      clearInterval(this.watch);
    };


const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));


function pad0(value) {
   let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

/*let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
*/

ReactDOM.render(<Stopwatch/>, document.getElementById('app'));
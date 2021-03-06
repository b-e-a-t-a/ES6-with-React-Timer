class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
            // this.display = display; //przechowuje element DOM
           // this.print(this.times); //drukuje czasy
    }

    reset() { //zeruje stoper
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }

      //  print() { //wewnętrzny tekst elementu DOM
      //    this.display.innerText = this.format(this.times);

    format(times) { //formatuje tekst do wyświetlenia; obiekt times
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
        	(this.running = true), (this.watch = setInterval(() => this.step(), 10));
        }
    }

    step() { //sprawdza czy tier jest uruchomiony
        if (!this.running) return;
        this.calculate(); //jeśli tak to przelicza
    }

    calculate() { //zerowanie wartości milisekund i sekund i zwiększanie sekund i minut
        this.state.times.miliseconds += 1;
       		if (this.state.times.miliseconds >= 100) {
            	this.state.times.seconds += 1;
            	this.state.times.miliseconds = 0;
        	}
        	if (this.state.times.seconds >= 60) {
            	this.state.times.minutes += 1;
            	this.state.times.seconds = 0;
        	}
            this.setState({
            times: {
              miliseconds: this.state.times.miliseconds,
              seconds: this.state.times.seconds,
              minutes: this.state.times.minutes
            }
        });
    }

    stop() { //zatrzymuje stoper i czyści interwał czyli atrybut watch
    	this.running = false;
    	clearInterval(this.watch);
    }

    render() {
        return (
            <div className={'container'}>
                <nav className={'controls'}>
                    <button className='start' onClick={() => this.start()}>Start</button>
                    <button className='stop' onClick={() => this.stop()}>Stop</button>
                </nav>
                <div className='stopwatch'>{this.format(this.state.times)}</div>
            </div>
        );
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

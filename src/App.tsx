import { Component } from 'react';
import './App.scss';
import { Clock } from './Components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  clockName: string,
  hasClock: boolean,
};

export class App extends Component<{}, State> {
  state = {
    clockName: 'Clock-0',
    hasClock: true,
  };

  timerId = 0;

  componentDidMount() {
    this.timerId = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);

    document.addEventListener('click', this.leftClickMouse);
    document.addEventListener('contextmenu', this.rightClickMouse);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
    document.removeEventListener('click', this.leftClickMouse);
    document.removeEventListener('contextmenu', this.rightClickMouse);
  }

  leftClickMouse = (event: Event) => {
    event.preventDefault();
    this.setState({ hasClock: true });
  };

  rightClickMouse = (event: Event) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  render() {
    const { clockName, hasClock } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && (
          <Clock clockName={clockName} />
        )}
      </div>
    );
  }
}

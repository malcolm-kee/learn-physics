import React from 'react';
import { createSvgElement } from '../lib/svg-helper';
import { animate } from '../lib/animate-helper';
import { noop } from '../lib/fn-helper';
import './ball-moving.css';

const HEIGHT = 10;
const WIDTH = 700;

function createBall(svg, ballColor = 'teal') {
  const circle = createSvgElement('circle', {
    cy: HEIGHT / 2,
    cx: 0,
    r: '5',
    fill: ballColor,
  });
  svg.append(circle);

  return circle;
}

function animateConstantSpeed(circle, speed) {
  const initialValue = Number(circle.getAttribute('cx'));

  return animate({
    initialValue,
    resetValue: 0,
    increment: speed,
    maxLimit: WIDTH,
    callback: x => circle.setAttribute('cx', x),
    repeat: false,
  });
}

export class BallWithConstantSpeed extends React.Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.stopAnimate = noop;
  }

  render() {
    return (
      <div className="ball-animation-container">
        <span>{this.props.label}</span>
        <div className="animation-svg-container">
          <svg
            className="animation-svg"
            ref={this.svgRef}
            width={WIDTH}
            height={HEIGHT}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.ball = createBall(this.svgRef.current, this.props.ballColor);
    if (this.props.isPlaying) {
      this.startAnimate();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isPlaying !== this.props.isPlaying) {
      if (this.props.isPlaying) {
        this.startAnimate();
      } else {
        this.stopAnimate();
      }
    }
  }

  componentWillUnmount() {
    this.stopAnimate();
  }

  startAnimate = () =>
    (this.stopAnimate = animateConstantSpeed(this.ball, this.props.speed));

  static defaultProps = {
    speed: 5,
    isPlaying: true,
  };
}

function animateIncreasingSpeed(circle, initialSpeed, acceleration = 0.05) {
  let speed = initialSpeed;
  let initialValue = Number(circle.getAttribute('cx'));

  return animate({
    initialValue,
    resetValue: 0,
    increment: x => {
      speed = speed + acceleration;
      return x + speed;
    },
    maxLimit: WIDTH,
    repeat: false,
    callback: x => circle.setAttribute('cx', x),
    onReset: () => (speed = initialSpeed),
  });
}

export class BallWithIncreasingSpeed extends React.Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.stopAnimate = noop;
  }

  render() {
    return (
      <div className="ball-animation-container">
        <span>{this.props.label}</span>
        <div className="animation-svg-container">
          <svg
            className="animation-svg"
            ref={this.svgRef}
            width={WIDTH}
            height={HEIGHT}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.ball = createBall(this.svgRef.current, 'red');
    if (this.props.isPlaying) {
      this.startAnimate();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isPlaying !== this.props.isPlaying) {
      if (this.props.isPlaying) {
        this.startAnimate();
      } else {
        this.stopAnimate();
      }
    }
  }

  startAnimate = () => {
    this.stopAnimate = animateIncreasingSpeed(
      this.ball,
      this.props.initialSpeed
    );
  };

  componentWillUnmount() {
    this.stopAnimate();
  }

  static defaultProps = {
    initialSpeed: 4,
    isPlaying: true,
  };
}

export class ThreeBallsAnimation extends React.Component {
  state = {
    key: Date.now(),
  };

  resetKey = () => this.setState({ key: Date.now() });

  render() {
    const { key } = this.state;

    return (
      <div className="animation-container" {...this.props}>
        <BallWithConstantSpeed
          label="A"
          speed={3}
          ballColor="grey"
          key={`1${key}`}
        />
        <BallWithConstantSpeed label="B" key={`2${key}`} />
        <BallWithIncreasingSpeed label="C" initialSpeed={2} key={`3${key}`} />
        <button onClick={this.resetKey}>Restart</button>
      </div>
    );
  }
}

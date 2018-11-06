import React from 'react';
import { createSvgElement } from '../lib/svg-helper';
import { getMultiplierAndInterval } from '../lib/animate-helper';

const HEIGHT = 10;
const WIDTH = 800;

function animateBall(svg, speed) {
  let timer;
  let rafId;
  let x = 0;
  const circle = createSvgElement('circle', {
    cy: HEIGHT / 2,
    r: '5',
    fill: 'teal',
  });
  svg.append(circle);
  const { interval, multiplier } = getMultiplierAndInterval(speed);

  timer = setInterval(() => {
    if (x < WIDTH) {
      x = x + multiplier;
    } else {
      x = 0;
    }
    rafId = window.requestAnimationFrame(() => {
      circle.setAttribute('cx', x);
    });
  }, interval);

  return () => {
    clearTimeout(timer);
    window.cancelAnimationFrame(rafId);
  };
}

export class BallDropping extends React.Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.unsub = function noop() {
      /*noop*/
    };
  }

  render() {
    return (
      <div>
        <svg ref={this.svgRef} width={WIDTH} height={HEIGHT} />
      </div>
    );
  }

  componentDidMount() {
    this.unsub = animateBall(this.svgRef.current, this.props.speed);
  }

  componentWillUnmount() {
    this.unsub();
  }

  static defaultProps = {
    speed: 100,
  };
}

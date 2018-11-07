import React from 'react';
import { throttle } from '../lib/fn-helper';

class StickyDivContainer extends React.Component {
  state = {
    innerStyle: undefined,
    outerStyle: undefined,
  };

  containerRef = React.createRef();

  render() {
    return (
      <div
        className="sticky-div"
        style={this.state.outerStyle}
        ref={this.containerRef}
      >
        <div style={this.state.innerStyle}>{this.props.children}</div>
      </div>
    );
  }

  componentDidMount() {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = throttle(() => {
    if (this.containerRef.current) {
      const {
        top,
        width,
        height,
      } = this.containerRef.current.getBoundingClientRect();
      if (top < 20 && !this.state.innerStyle) {
        this.setState({
          innerStyle: FIXED_STYLE,
          outerStyle: { width, height },
        });
      }

      if (top >= 20 && !!this.state.innerStyle) {
        this.setState({ innerStyle: undefined, outerStyle: undefined });
      }
    }
  }, 200);
}

const FIXED_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  width: '100%',
  boxShadow: `0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)`,
};

export const StickyDiv = StickyDivContainer;

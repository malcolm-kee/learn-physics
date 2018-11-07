import React from 'react';
import { ThreeBallsAnimation } from '../animations/ball-moving';
import Layout from '../components/layout';
import { StickyDiv } from '../components/sticky-div';

class KinematicsIntro extends React.Component {
  state = {
    key: Date.now(),
  };

  resetKey = () => this.setState({ key: Date.now() });

  render() {
    return (
      <Layout title="Kinematics">
        <article>
          <div />
          <div />
          <p>Hi there!</p>
          <p>
            This guide introduces and explores motions. We'll learnt about
            position, distance, speed, velocity, and acceleration.
          </p>
          <p>
            Students of introductory physics may find this interesting, but this
            is prepared to be accessible by everyone.
          </p>
          <h1>Let's get started.</h1>
          <StickyDiv>
            <ThreeBallsAnimation />
          </StickyDiv>
          <p>
            Look at the 3 balls above carefully, and try to answer the following
            questions.
          </p>
          <ul>
            <li>Which ball is fastest in overall?</li>
            <li>Which ball is slowest in overall?</li>
            <li>Which ball is fastest at the beginning?</li>
            <li>Which ball is fastest at the end?</li>
          </ul>
        </article>
      </Layout>
    );
  }
}

export default KinematicsIntro;

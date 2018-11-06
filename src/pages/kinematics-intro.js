import React from 'react';
import Layout from '../components/layout';
import { BallDropping } from '../animations/ball-dropping';

const KinematicsIntro = () => (
  <Layout title="Kinematics Intro">
    <section>
      <BallDropping speed={50} />
      <BallDropping />
      <BallDropping speed={120} />
      <h1>Intro</h1>
      <p>Motion is a daily phenomenon in your daily life.</p>
    </section>
  </Layout>
);

export default KinematicsIntro;

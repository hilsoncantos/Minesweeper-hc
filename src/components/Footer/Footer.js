import React from 'react';
import { GrLinkedin } from "react-icons/gr";

import classes from './Footer.module.css';

const footer = () => (
  <footer>
    <div className={classes.Footer__cta}>
      <p>Let's connect.</p>
      <a href="https://www.linkedin.com/in/hilsoncantos/"><GrLinkedin color="black"/></a>
    </div>
    <div>&copy; Copyright 2020 Hilson Cantos. All rights reserved</div>
  </footer>
);

export default footer;
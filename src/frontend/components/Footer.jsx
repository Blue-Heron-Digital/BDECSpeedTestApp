// base imports
import React from 'react';

// css imports
import '../css/footer.css';
import Facebook from '../assets/images/facebook.svg';

const Footer = () => (
  <div className="footer">
    <p>Internet Speed Test</p>
    <ul>
      <li>Created by <a href="https://www.blueherondigital.com/" target="_blank">Blue Heron Digital</a></li>
      <li>
        <a href="#">Privacy Policy</a>
      </li>
      <li>
        <a href="https://www.facebook.com/BaltimoreDEC" target="_blank">
          <img src={Facebook} {...Facebook} />
        </a>
      </li>
    </ul>
  </div>
);

export default Footer;

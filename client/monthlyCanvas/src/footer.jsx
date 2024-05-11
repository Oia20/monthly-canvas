import React from 'react';
import { FaGithub } from 'react-icons/fa'; // Import GitHub icon from react-icons library
import './footer.css'

const Footer = () => {
  return (
    <footer>
      <div className='footer-sec'>
        <p>© 2024 Monthly-Canvas</p>
        <a href="https://github.com/Oia20" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} style={{ marginRight: '5px' }} />
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;

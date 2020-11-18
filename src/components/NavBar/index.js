import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../app/assets/logo.png';

import styles from './styles.module.scss';

function NavBar({ links }) {
  return (
    <div className={`row space-between ${styles.navBar}`}>
      <img src={logo} className={styles.logo} />
      <ul>
        {links &&
          links.map(link => (
            <li
              className={styles.link}
              key={link.name}
              onClick={() => {
                link.onClick();
              }}
            >
              {link.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

NavBar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    })
  )
};

export default NavBar;

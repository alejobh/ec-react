import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../app/assets/logo.png';

import styles from './styles.module.scss';

function NavBar({ links }) {
  return (
    <div className={styles.navBar}>
      <img src={logo} className={styles.logo} />
      <div>
        {links &&
          links.map(link => (
            <span
              className={styles.link}
              key={link.name}
              onClick={() => {
                link.onClick();
              }}
            >
              {link.name}
            </span>
          ))}
      </div>
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

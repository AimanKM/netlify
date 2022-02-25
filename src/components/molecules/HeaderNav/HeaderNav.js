import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const headerNav = ({ colorLink, listNav }) => {
  return (
    <div className={styles.flex}>
      <ul style={{ listStyleType: 'none' }}>
        {listNav.map((e, i) => (
          <li key={i}>
            <Link
              style={{ color: colorLink, textDecoration: 'none' }}
              to={e.to}
            >
              {e.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default headerNav;

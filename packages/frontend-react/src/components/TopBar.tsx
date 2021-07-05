import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link as RouterLink } from 'react-router-dom';

import { Github } from './svg/Github';

const useStyles = createUseStyles(
  {
    root: {
      backgroundColor: 'var(--background-dark)',
      color: 'white',
      padding: 16,
      boxShadow: '0px 3px 9px 0px #00000050',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    github: {
      width: '2em',
      height: '2em',
      fill: 'white',
      display: 'block'
    }
  },
  { name: 'top-bar' }
);

export const TopBar: React.VFC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>
        <RouterLink to='/'>Coolest Matrices</RouterLink>
      </h1>
      <a href='https://github.com/NitzanHen/matrices'>
        <Github className={classes.github} />
      </a>
    </div>
  );
};

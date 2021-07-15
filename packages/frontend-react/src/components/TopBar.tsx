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
    },
    text: {
      '& > h1': {
        display: 'inline'
      },

      '& > *:not(h1)': {
        fontSize: 22,
        letterSpacing: 2
      },

      '& > *:not(:last-child)': {
        marginRight: 8
      }
    }
  },
  { name: 'top-bar' }
);

interface TopBarProps {
  page?: string;
}

export const TopBar: React.VFC<TopBarProps> = ({ page }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.text}>
        <h1>
          <RouterLink to='/'>Coolest Matrices</RouterLink>
        </h1>
        {page && (
          <>
            <span>/</span>
            <span>{page}</span>
          </>
        )}
      </span>
      <a href='https://github.com/NitzanHen/matrices'>
        <Github className={classes.github} />
      </a>
    </div>
  );
};

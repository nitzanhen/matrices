import React from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router-dom';

import { BackArrow } from '../components/BackArrow';

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },

    content: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      rowGap: 50,

      '& > *:not(:last-child)': {
        marginRight: 40
      },

      '& > svg': {
        width: 48,
        height: 48,
        fill: 'var(--color-light)'
      }
    },
    backButton: {
      position: 'absolute',
      top: 16,
      left: 16,
      padding: 4,
      width: 40,
      height: 40,
      appearance: 'none',
      border: 'none',
      background: 'none',
      fill: 'var(--color-light)',
      borderRadius: '50%',
      boxShadow: '0px 3px 6px 3px rgba(0, 0, 0, 0.12)',
      cursor: 'pointer'
    }
  },
  { name: 'operation-page' }
);

export interface OperationPageProps { }

/**
 * Common structure and styles for operation pages.
 */
export const OperationPage: React.FC<OperationPageProps> = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <button className={classes.backButton} onClick={() => history.goBack()}>
        <BackArrow />
      </button>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

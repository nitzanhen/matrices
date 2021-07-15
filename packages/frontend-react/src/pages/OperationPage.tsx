import React from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router-dom';

import { BackArrow } from '../components/svg/BackArrow';
import { Tip } from '../components/svg/Tip';

const useStyles = createUseStyles(
  {
    root: {
      width: 'calc(100% - 2*16px)',
      height: 'calc(100% - 2*16px)',
      display: 'grid',
      gridTemplateAreas: `
      "back title ."
      ". content ."
      ". tip ."
      `,
      padding: 16,
      gridTemplateColumns: '5vw 1fr 5vw'
    },

    content: {
      gridArea: 'content',
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
      gridArea: 'back',
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
    },
    tip: {
      gridArea: 'tip',
      width: 'max-content',
      alignSelf: 'flex-start',
      margin: '0 auto',
      padding: '12px 16px 12px 12px',
      borderRadius: 8,
      backgroundColor: 'var(--background-light)',
      display: 'flex',
      alignItems: 'center',
      columnGap: 8
    },
    tipIcon: {
      fill: 'var(--color-primary)',
      width: '2em',
      height: '2em',
      opacity: 0.6
    }
  },
  { name: 'operation-page' }
);

export interface OperationPageProps {}

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
      <aside className={classes.tip}>
        <div>
          <Tip className={classes.tipIcon} />
        </div>
        <div>
          <h2>Tip!</h2>
          <p>Try navigating the matrix cells with the arrow keys or with tab.</p>
        </div>
      </aside>
    </div>
  );
};

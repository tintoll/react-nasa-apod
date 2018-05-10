import React from 'react';
import styles from './ViewerTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ViewerTemplate = ({viewer, spaceNavigator }) => {
  return (
    <div className={cx('viewer-template')}>
      <header>
        오늘의 우주사진 
      </header> 
      <div className={cx('viewer-wrapper')}>
        {viewer}
        <div className={cx('space-navigator-wrapper')}>
          {spaceNavigator}
        </div>
      </div>
    </div>
  );
};

export default ViewerTemplate;
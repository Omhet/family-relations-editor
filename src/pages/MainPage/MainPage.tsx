import { Editor } from '@components/Editor/Editor';
import React, { FC } from 'react';
import classes from './MainPage.module.scss';

export interface MainPageProps {}

export const MainPage: FC = () => {
  return (
    <div className={classes.main}>
      <Editor />
    </div>
  );
};

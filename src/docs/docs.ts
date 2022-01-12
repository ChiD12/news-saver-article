import { basicinfo } from './basicinfo';
import { components } from './components';
import { articles } from './articles';

export const docs = {
  ...basicinfo,
  ...components,
  paths: {
    ...articles
  }
};

import { convert } from 'html-to-text';
import axios from 'axios';
import fs from 'fs';

import { ArticleRepo, ArticleInput } from './interfaces/interfaces';
import { sendPush } from './messageQSender';

export const createArticleService = (repo: ArticleRepo) => {
  const postArticle = async (article: ArticleInput) => {
    repo.insertArticle(article).catch(console.dir);
    let html = '';
    try {
      const response = await axios.get(article.docLink);
      // console.log(response.data);
      // console.log(response.data.explanation);
      html = response.data;
    } catch (error) {
      console.log(error);
    }

    const text = convert(html, {
      wordwrap: 130
    });
    const removed = text.replace(/\[.*\]/g, '');
    // console.log(text); // Hello World

    fs.writeFile('./text.txt', removed, err => {
      if (err) {
        console.error(err);
        return;
      }
    });

    sendPush(article);
  };

  const getAllArticles = () => {
    return repo.fetchAllArticles();
  };

  return { postArticle, getAllArticles };
};

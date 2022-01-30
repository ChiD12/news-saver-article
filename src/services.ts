import { parser } from 'html-metadata-parser';

import { ArticleRepo, ArticleInput } from './interfaces/interfaces';
import { sendPush } from './messageQSender';

export const createArticleService = (repo: ArticleRepo) => {
  const postArticle = async (article: ArticleInput) => {
    const result = await parser(article.docLink);
    console.log(JSON.stringify(result, null, 3));

    const updatedArticleInput: ArticleInput = {
      userId: article.userId,
      docLink: article.docLink,
      sentFromDeviceId: article.sentFromDeviceId,
      deviceType: article.deviceType,
      title: result.meta.title || result.og.title || null,
      description: result.meta.description || result.og.description || null,
      thumbnail: result.og.image || null
    };

    repo.insertArticle(updatedArticleInput).catch(console.dir);
    sendPush(article);
  };

  const getAllArticles = () => {
    return repo.fetchAllArticles();
  };

  const getArticlessFromUser = (userId: string) => {
    return repo.fetchArticlesFromUser(userId);
  };

  return { postArticle, getAllArticles, getArticlessFromUser };
};

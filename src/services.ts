import { ArticleRepo, ArticleInput } from './interfaces/interfaces';
import { sendPush } from './messageQSender';

export const createArticleService = (repo: ArticleRepo) => {
  const postArticle = async (article: ArticleInput) => {
    repo.insertArticle(article).catch(console.dir);
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

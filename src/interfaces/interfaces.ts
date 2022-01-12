export interface Article {
  id: string;
  userId: string;
  docLink: string;
  plainText: string;
}

export interface ArticleInput {
  userId: string;
  docLink: string;
  plainText: string;
}

export interface ArticleRepo {
  insertArticle(article: ArticleInput): Promise<void>;
  fetchAllArticles(): Promise<Article[]>;
}

export interface ArticleService {
  postArticle(article: ArticleInput): void;
  getAllArticles(): Promise<Article[]>;
}

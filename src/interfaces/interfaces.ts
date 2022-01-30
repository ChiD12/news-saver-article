export interface Article {
  id: string;
  userId: string;
  docLink: string;
  datePosted: string;
}

export interface ArticleInput {
  userId: string;
  docLink: string;
  sentFromDeviceId: string;
  deviceType: string;
  title: string | null;
  thumbnail: string | null;
  description: string | null;
}

export interface ArticleRepo {
  insertArticle(article: ArticleInput): Promise<void>;
  fetchAllArticles(): Promise<Article[]>;
  fetchArticlesFromUser(userId: string): Promise<Article[]>;
}

export interface ArticleService {
  postArticle(article: ArticleInput): void;
  getAllArticles(): Promise<Article[]>;
  getArticlessFromUser(userId: string): Promise<Article[]>;
}

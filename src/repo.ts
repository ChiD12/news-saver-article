import { MongoClient, WithId, Document } from 'mongodb';
import { Article, ArticleInput, ArticleRepo } from './interfaces/interfaces';

export const createArticleRepo = (client: MongoClient): ArticleRepo => {
  const insertArticle = async (article: ArticleInput) => {
    const database = client.db('news');
    const articles = database.collection('article');
    const options = { upsert: true };
    // create a document to insert
    const filter = {
      link: article
    };

    const updateFilter = {
      $set: {
        userId: article.userId,
        link: article.docLink,
        content: article.plainText
      }
    };
    const result = await articles.updateOne(filter, updateFilter, options);
    console.log(`A document was upserted with the _id: ${result.upsertedId}`);
  };

  const fetchAllArticles = async () => {
    const database = client.db('news');
    const articles = database.collection('article');
    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const fetchedDocuments = await articles.find(query).toArray();

    const fetchedArticles: Article[] = fetchedDocuments.map((doc: WithId<Document>) => {
      return { id: doc.id, userId: doc.userId, docLink: doc.link, plainText: doc.content };
    });

    console.log(fetchedArticles);
    return fetchedArticles;
  };

  return { insertArticle, fetchAllArticles };
};

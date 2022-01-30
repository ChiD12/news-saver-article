import { MongoClient, WithId, Document, Sort } from 'mongodb';
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
        deviceType: article.deviceType,
        datePosted: new Date(),
        thumbnail: article.thumbnail,
        title: article.title,
        description: article.description
      }
    };
    const result = await articles.updateOne(filter, updateFilter, options);
    console.log(`A document was upserted with the _id: ${result.upsertedId}`);
  };

  const fetchAllArticles = async () => {
    const database = client.db('news');
    const articles = database.collection('article');
    const query = {};
    const sort: Sort = { _id: -1 };

    const fetchedDocuments = await articles
      .find(query)
      .sort(sort)
      .toArray();

    const fetchedArticles: Article[] = fetchedDocuments.map((doc: WithId<Document>) => {
      return {
        id: doc.id,
        userId: doc.userId,
        docLink: doc.link,
        deviceType: doc.deviceType,
        datePosted: doc.datePosted.toUTCString(),
        thumbnail: doc.thumbnail,
        title: doc.title,
        desciption: doc.description
      };
    });

    console.log(fetchedArticles);
    return fetchedArticles;
  };

  const fetchArticlesFromUser = async (userId: string) => {
    const database = client.db('news');
    const articles = database.collection('article');
    const query = {
      userId
    };

    const sort: Sort = { _id: -1 };
    const fetchedDocuments = await articles
      .find(query)
      .sort(sort)
      .toArray();

    const fetchedArticles: Article[] = fetchedDocuments.map((doc: WithId<Document>) => {
      return {
        id: doc.id,
        userId: doc.userId,
        docLink: doc.link,
        deviceType: doc.deviceType,
        datePosted: doc.datePosted.toUTCString(),
        thumbnail: doc.thumbnail,
        title: doc.title,
        desciption: doc.description
      };
    });

    console.log(fetchedArticles);
    return fetchedArticles;
  };

  return { insertArticle, fetchAllArticles, fetchArticlesFromUser };
};

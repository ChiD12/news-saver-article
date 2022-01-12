import { ArticleInput } from './interfaces/interfaces';

const amqp = require('amqplib/callback_api');

export const sendPush = (article: ArticleInput) => {
  amqp.connect('amqp://localhost', (error: any, connection: any) => {
    if (error) {
      throw error;
    }
    connection.createChannel((error1: any, channel: any) => {
      if (error1) {
        throw error1;
      }

      const queue = 'sendPush_Queue';
      const msg = article;

      channel.assertQueue(queue, {
        durable: true
      });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
        persistent: true
      });

      console.log(' [x] Sent %s', msg);
    });
    setTimeout(() => {
      connection.close();
    }, 500);
  });
};

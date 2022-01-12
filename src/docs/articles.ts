export const articles = {
  '/article': {
    get: {
      tags: ['Articles'], // operation's tag.
      description: 'Get all Articles', // operation's desc.
      operationId: 'get_articles', // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: 'Articles were obtained', // response desc.
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/article'
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Articles'],
      description: 'Insert an article',
      operationId: 'insert_article',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/article' // todo input data model
            }
          }
        }
      },
      responses: {
        204: {
          description: 'User successfuly created'
        },
        404: {
          description: 'Todo not found'
        },
        500: {
          description: 'Server error'
        }
      }
    }
  }
};

export const components = {
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization'
      }
    },
    schemas: {
      // id model
      userId: {
        type: 'string',
        description: 'User Id',
        example: '61d0d0e41ab6fb418ce82f5e',
        modelPropertyNaming: 'camelCase'
      },
      docLink: {
        type: 'string',
        description: 'Url to article',
        example: 'https://globalnews.ca/news/8486966/ontario-covid-cases-january-4-coronavirus/'
      },
      plainText: {
        type: 'string',
        description: 'Placeholder',
        example: 'Placeholder'
      },
      article: {
        type: 'object',
        properties: {
          docLink: {
            $ref: '#/components/schemas/docLink'
          }
        }
      },
      TodoInput: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: "Todo's title",
            example: 'Coding in JavaScript'
          },
          completed: {
            type: 'boolean',
            description: 'The status of the todo',
            example: false
          }
        }
      },
      // error model
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string', // data type
            description: 'Error message', // desc
            example: 'Not found' // example of an error message
          },
          internal_code: {
            type: 'string', // data type
            description: 'Error internal code', // desc
            example: 'Invalid parameters' // example of an error internal code
          }
        }
      }
    }
  },
  security: [
    {
      ApiKeyAuth: []
    }
  ]
};

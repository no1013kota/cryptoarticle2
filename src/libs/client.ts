import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'hinako',
  apiKey: 'b4bd7f7358534c539c43862b89d298f6ca2f',
  // serviceDomain: process.env.SERVICE_DOMAIN || '',
  // apiKey: process.env.API_KEY || '',
});

export const getAllByMicroCms = (endpoint: string) => {
  return client.get({
    endpoint: endpoint,
    queries: {
      offset: 0,
      limit: 100,
    },
  });
};

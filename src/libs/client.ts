import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || 'cryptoarticle2',
  apiKey: process.env.API_KEY || 'UI0IhyF0pZM4UaL8CqdtJ4EEfSIvSyTcxIFw',
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

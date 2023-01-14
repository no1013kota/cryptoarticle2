import { MicroCMSImage } from "microcms-js-sdk";

export type Blog = {
  id: string;
  body: string;
  title: string;
  tags: Tag[];
  image: MicroCMSImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type Tag = {
  id: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

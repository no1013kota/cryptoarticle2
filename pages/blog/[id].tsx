import { styled } from "@mui/material/styles";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import cheerio from "cheerio";
import hljs from "highlight.js";
import type { Blog } from "../../types/blog";
import { client } from "../../libs/client";
import { Params } from "next/dist/server/router";
import { Grid } from "@mui/material";

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: Blog) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const id = context.params?.id;
  const blog = await client.get({ endpoint: "blog", contentId: id });
  const $ = cheerio.load(blog.body);
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return {
    props: {
      blog,
      highlightedBody: $.html(),
    },
  };
};

const Container = styled(Grid)({
  backgroundColor: "#FFF",
  color: "#222",
  margin: "auto",
  marginTop: "30px",
  padding: "36px",
  "& > a": {
    color: "#639bb7",
  },
  "& >a:hover": {
    color: "#0b7eb8",
    textDecoration: "underline",
  },
});

const getDateStr = (date: string) => {
  return new Date(date).toLocaleDateString();
};

type Props = {
  blog: Blog;
  highlightedBody: string;
};

const BlogId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
  highlightedBody,
}: Props) => {
  return (
    <main>
      <Container xs={11} md={9}>
        <h1>{blog.title}</h1>
        <p>投稿日：{getDateStr(blog.publishedAt)}</p>
        {blog.tags.map((tag) => (
          <p key={tag.id}>＃{tag.tag}</p>
        ))}
        <div dangerouslySetInnerHTML={{ __html: highlightedBody }} />
      </Container>
    </main>
  );
};

export default BlogId;

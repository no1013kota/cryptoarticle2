import { styled } from "@mui/material/styles";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";
import type { Blog } from "../../types/blog";
import { client } from "libs/client";
import { Params } from "next/dist/server/router";
import { Button, Grid, Typography } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  margin: "30px auto",
  padding: "36px",
  "& h1, h2, h3": {
    fontWeight: "550",
  },
});

const BlogInfo = styled("div")({
  padding: "15px 0px",
  borderBottom: "1px solid #4682B4",
});

const BlogBody = styled("div")({
  marginTop: "40px",
  "& a": {
    color: "#639bb7",
  },
  "& a:hover": {
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
      <Container item xs={11} md={9}>
        <BlogInfo>
          <Typography sx={{ fontSize: 26, fontWeight: 500, pb: 2 }}>
            {blog.title}
          </Typography>
          <Typography variant="body2" sx={{ display: "inline-block", pr: 4 }}>
            <AccessTimeIcon
              sx={{ fontSize: 15, mr: 0.5, verticalAlign: "middle" }}
            />
            投稿日 {getDateStr(blog.publishedAt)}
          </Typography>
          <LocalOfferIcon
            sx={{ fontSize: 15, mr: 0.5, verticalAlign: "middle" }}
          />
          {blog.tags.map((tag) => (
            <Typography
              key={tag.id}
              variant="body2"
              sx={{ display: "inline-block", pr: 1 }}
            >
              #{tag.tag}
            </Typography>
          ))}
        </BlogInfo>
        <BlogBody dangerouslySetInnerHTML={{ __html: highlightedBody }} />
      </Container>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        component="a"
        href="/"
        sx={{ margin: "0 auto" }}
      >
        記事一覧へ戻る
      </Button>
    </main>
  );
};

export default BlogId;

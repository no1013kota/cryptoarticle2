import { styled } from "@mui/material/styles";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  CardMedia,
  Paper,
  Card,
} from "@mui/material";
import type { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { client } from "../libs/client";
import type { Blog } from "../types/blog";

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};

type Props = {
  blog: Blog[];
};

const BlogPaper = styled("div")({
  padding: "16px",
  transition: "all 0.2s",
  "&:hover": {
    boxShadow:
      "1px 0px 5px -1px rgba(0,0,0,0.1), 0px 0px 5px 5px rgba(0,0,0,0.1), 0px 1px 5px 0px rgba(0,0,0,0.1)",
    transform: "translateY(-1px)",
  },
});

const HeadBar = styled(AppBar)({
  backgroundColor: "#FFF",
  color: "#222",
});

const image = "image/react.jpg";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
}: Props) => {
  console.log(blog);

  const getDateStr = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      {/* ヘッダー */}
      <HeadBar position="static">
        <Toolbar>
          <Typography>ヘッダー</Typography>
        </Toolbar>
      </HeadBar>

      {/* メインコンテナ */}
      <Grid container sx={{ p: 6 }}>
        {/* 記事一覧 */}
        <Grid
          container
          item
          // spacing={2}
          xs={12}
          md={8}
          sx={{ p: 1, bgcolor: "#FFF" }}
        >
          {blog.map((blog) => (
            <Grid item xs={12} sm={6} key={blog.id}>
              <Link href={`/blog/${blog.id}`} passHref>
                <a>
                  <BlogPaper>
                    <CardMedia
                      component="img"
                      height="200"
                      image={`image/${blog.image}.jpg`}
                      alt="React"
                    />
                    <Typography variant="h6" sx={{ py: 1.5 }}>
                      {blog.title}
                    </Typography>
                    {blog.tags.map((tag) => (
                      <Typography
                        key={tag.id}
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: "inline-block", pr: 1 }}
                      >
                        #{tag.tag}
                      </Typography>
                    ))}
                    <Typography key={blog.id} variant="body2">
                      {getDateStr(blog.publishedAt)}
                    </Typography>
                  </BlogPaper>
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* 記事とサイドバーの余白 */}
        <Grid md={0.5}></Grid>

        {/* サイドバー */}
        <Grid container item xs={12} md={3.5} sx={{ p: 3, bgcolor: "#FFF" }}>
          あ
        </Grid>
      </Grid>

      {/* ボタンサンプル */}
      <Button variant="text">Material UIのボタン</Button>
    </>
  );
};

export default Home;

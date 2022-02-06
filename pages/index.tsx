import {
  Button,
  Card,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  CardContent,
  CardActions,
  CardMedia,
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
      <AppBar position="static">
        <Toolbar>
          <Typography>ヘッダー</Typography>
        </Toolbar>
      </AppBar>

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
                <CardMedia
                  component="img"
                  height="194"
                  image="/static/images/cards/paella.jpg"
                  alt="Paella dish"
                />
                <Card sx={{ p: 2, m: 2 }}>
                  <Typography variant="h6" sx={{ pb: 1 }}>
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
                </Card>
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

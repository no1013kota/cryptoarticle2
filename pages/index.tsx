import {
  Button,
  Card,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  CardContent,
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
  return (
    <>
      {/* ヘッダー */}
      <AppBar position="static">
        <Toolbar>
          <Typography>ヘッダー</Typography>
        </Toolbar>
      </AppBar>

      {/* 記事一覧 */}
      <Grid container spacing={1}>
        {blog.map((blog) => (
          <Grid item xs={4} key={blog.id}>
            <Link href={`/blog/${blog.id}`} passHref>
              <Card variant="outlined">
                <CardContent>{blog.title}</CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* ボタンサンプル */}
      <Button variant="text">Material UIのボタン</Button>
    </>
  );
};

export default Home;

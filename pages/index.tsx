import { styled } from "@mui/material/styles";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  CardMedia,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import type { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { client } from "../libs/client";
import type { Blog } from "../types/blog";

export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: "blog" });
  const tag = await client.get({ endpoint: "tag" });

  return {
    props: {
      blogs: blog.contents,
      tags: tag.contents,
    },
  };
};

type Props = {
  blogs: Blog[];
  tags: any[];
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

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
  tags,
}: Props) => {
  console.log(blogs);
  console.log(tags);

  const tagList = tags.map((tag) => tag.tag);

  const getDateStr = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      {/* ヘッダー */}
      <HeadBar position="static">
        <Toolbar>
          <Typography>hinako blog</Typography>
        </Toolbar>
      </HeadBar>

      {/* メインコンテナ */}
      <Grid container sx={{ p: 6, maxWidth: "1500px", margin: "auto" }}>
        {/* 記事一覧 */}
        <Grid container item xs={12} md={9} sx={{ p: 1, bgcolor: "#FFF" }}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={5.5} key={blog.id} sx={{ margin: "auto" }}>
              <Link href={`/blog/${blog.id}`} passHref>
                <a>
                  <BlogPaper>
                    <CardMedia
                      component="img"
                      height="200"
                      image={`image/${blog.image}.jpg`}
                      alt="React"
                    />
                    <Typography variant="h6" sx={{ py: 1.5, minHeight: 120 }}>
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
        <Grid container item xs={12} sm={2.5}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "#fff" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                component="div"
                sx={{
                  py: 0.5,
                  px: 4,
                  mb: 1,
                  fontSize: 18,
                  background: "#f2f2f2",
                  borderBottom: "solid 0.5px #999",
                }}
              >
                カテゴリー
              </ListSubheader>
            }
          >
            {tagList.map((tag) => (
              <ListItemButton
                key={tag.id}
                sx={{ py: 0.5, px: 4, minHeight: 32 }}
              >
                <ListItemText
                  primary={tag}
                  primaryTypographyProps={{
                    fontSize: 15,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Grid>
      </Grid>

      {/* ボタンサンプル */}
      <Button variant="text">Material UIのボタン</Button>
    </>
  );
};

export default Home;

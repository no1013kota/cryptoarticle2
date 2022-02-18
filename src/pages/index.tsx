import { useState } from "react";
import type { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import ReactPaginate from "react-paginate";
// materialUI
import { styled } from "@mui/material/styles";
import {
  Typography,
  Grid,
  CardMedia,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
// libs
import { client } from "libs/client";
// types
import type { Blog, Tag } from "types/blog";
// utils
import { getDateStr } from "utils/getDateStr";
// components
import { Header } from "components/Header";
import { Footer } from "components/Footer";

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
  tags: Tag[];
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

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
  tags,
}: Props) => {
  console.log(blogs);
  console.log(tags);

  const tagList = tags.map((tag) => tag.tag);
  const [showBlogs, setShowBlogs] = useState(blogs);
  const [offset, setOffset] = useState(0);
  const perPage: number = 6;

  const handlePageChange = (data: { selected: number }) => {
    const page_number = data["selected"]; // クリックした部分のページ数が{selected: 2}のような形で返ってくる
    setOffset(page_number * perPage); // offsetを変更し、表示開始するアイテムの番号を変更
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // タグ絞り込み
  const selectTag = (tag: string) => {
    if (tag === "all") {
      setShowBlogs(blogs);
    } else {
      const selectedBlogs = blogs.filter((blog) => {
        const haveTags = blog.tags.map((tag) => tag.tag);
        return haveTags.includes(tag);
      });
      setShowBlogs(selectedBlogs);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ヘッダー */}
      <Header />

      {/* メインコンテナ */}
      <Grid container sx={{ p: 6, maxWidth: "1500px", mb: 5, margin: "auto" }}>
        {/* 記事一覧 */}
        <Grid
          container
          item
          xs={12}
          sm={9}
          sx={{ p: 1, bgcolor: "#FFF", mb: 5 }}
        >
          {!showBlogs.length && <p>There are no posts...</p>}
          {showBlogs.slice(offset, offset + perPage).map((blog) => (
            <Grid
              item
              xs={12}
              sm={6}
              key={blog.id}
              sx={{ p: 1, marginRight: "auto" }}
            >
              <Link href={`/blog/${blog.id}`} passHref>
                <a>
                  <BlogPaper>
                    <CardMedia
                      component="img"
                      width="100%"
                      height="auto"
                      image={`image/${blog.image}.jpg`}
                      alt={blog.image}
                      sx={{ border: "solid 0.5px #ccc" }}
                    />
                    <Typography variant="h6" sx={{ py: 1.5, minHeight: 80 }}>
                      {blog.title}
                    </Typography>
                    <LocalOfferIcon
                      sx={{ fontSize: 15, mr: 0.5, verticalAlign: "middle" }}
                    />
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
                      <AccessTimeIcon
                        sx={{ fontSize: 15, mr: 0.5, verticalAlign: "middle" }}
                      />
                      {getDateStr(blog.publishedAt)}
                    </Typography>
                  </BlogPaper>
                </a>
              </Link>
            </Grid>
          ))}

          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            // breakLabel={"..."}
            pageCount={Math.ceil(blogs.length / perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
            // marginPagesDisplayed={2} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
            // pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
            onPageChange={handlePageChange} // クリック時のfunction
            containerClassName={"pagination"} // ページネーションであるulに着くクラス名
            activeClassName={"active"} // アクティブなページのliに着くクラス名
            // previousClassName={"pagination__previous"} // 「<」のliに着けるクラス名
            // nextClassName={"pagination__next"} // 「>」のliに着けるクラス名
            // disabledClassName={"pagination__disabled"} // 使用不可の「<,>」に着くクラス名
          />
        </Grid>

        {/* 記事とサイドバーの余白 */}
        <Grid item xs={0} sm={0.5}></Grid>

        {/* サイドバー */}
        <Grid container item xs={12} sm={2.5} sx={{ mb: 5 }}>
          <List
            sx={{ width: "100%", bgcolor: "#fff", height: 500 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <Typography
                component="div"
                sx={{
                  py: 0.5,
                  px: 4,
                  my: 1,
                  fontSize: 18,
                  color: "#444",
                  borderBottom: "solid 0.7px #888",
                }}
              >
                # Tags
              </Typography>
            }
          >
            <ListItemButton
              onClick={() => selectTag("all")}
              sx={{ py: 0.5, px: 4, minHeight: 32 }}
            >
              <ListItemText
                primary="All"
                primaryTypographyProps={{
                  fontSize: 15,
                }}
              />
            </ListItemButton>
            {tagList.map((tag) => (
              <ListItemButton
                key={tag}
                onClick={() => selectTag(tag)}
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

      {/* フッター */}
      <Footer />
    </>
  );
};

export default Home;

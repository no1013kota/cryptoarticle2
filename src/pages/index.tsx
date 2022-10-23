import { useEffect, useState } from 'react';
import type { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
// materialUI
import { styled } from '@mui/material/styles';
import { Typography, Grid, CardMedia } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import UpdateIcon from "@mui/icons-material/Update";
// libs
import { client } from 'libs/client';
// types
import type { Blog, Tag } from 'types/blog';
// utils
import { getDateStr } from 'utils/getDateStr';
// components
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Pagination } from 'components/Pagination';
import { SideBar } from 'components/SideBar';
// recoil
import { useAllBlogsState } from 'atoms/allBlogsAtom';
import { useAllTagsState } from 'atoms/allTogsAtom';
import { useShowBlogsState } from 'atoms/showBlogsAtom';

export const getStaticProps = async () => {
  const blog = await client.get({
    endpoint: 'blog',
    queries: {
      offset: 0,
      limit: 100,
    },
  });
  const tag = await client.get({
    endpoint: 'tag',
    queries: {
      offset: 0,
      limit: 100,
    },
  });

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

const BlogPaper = styled('div')({
  padding: '16px',
  transition: 'all 0.2s',
  '&:hover': {
    boxShadow:
      '1px 0px 5px -1px rgba(0,0,0,0.1), 0px 0px 5px 5px rgba(0,0,0,0.1), 0px 1px 5px 0px rgba(0,0,0,0.1)',
    transform: 'translateY(-1px)',
  },
});

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ blogs, tags }: Props) => {
  const { setAllBlogs } = useAllBlogsState();
  const { setAllTags } = useAllTagsState();
  const { showBlogs, setShowBlogs } = useShowBlogsState();
  const tagList = tags.map((tag) => tag.tag);
  const [offset, setOffset] = useState(0);
  const perPage = 8;

  useEffect(() => {
    setAllBlogs(blogs);
    console.log(blogs);
    setAllTags(tagList);
    setShowBlogs(blogs);
  }, []);

  return (
    <>
      {/* ヘッダー */}
      <Header />

      {/* メインコンテナ */}
      <Grid container>
        <Grid container item xs={11} sx={{ maxWidth: '1500px', pt: 6, mb: 5, margin: 'auto' }}>
          {/* 記事一覧 */}
          <Grid container item xs={12} sm={9} sx={{ p: 1, bgcolor: '#FFF', mb: 5 }}>
            {!showBlogs.length && <p>There are no posts...</p>}
            {showBlogs.slice(offset, offset + perPage).map((blog) => (
              <Grid item xs={12} sm={6} key={blog.id} sx={{ p: 1, marginRight: 'auto' }}>
                <Link href={`/blog/${blog.id}`} passHref>
                  <a>
                    <BlogPaper>
                      <CardMedia
                        component='img'
                        width='100%'
                        height='auto'
                        image={`image/${blog.image}.jpg`}
                        alt={blog.image}
                        sx={{ border: 'solid 0.5px #ccc' }}
                      />
                      <Typography variant='h6' sx={{ py: 1.5, minHeight: 80 }}>
                        {blog.title}
                      </Typography>
                      <LocalOfferIcon sx={{ fontSize: 15, mr: 0.5, verticalAlign: 'middle' }} />
                      {blog.tags.map((tag) => (
                        <Typography
                          key={tag.id}
                          variant='body2'
                          color='text.secondary'
                          sx={{ display: 'inline-block', mr: 1 }}
                        >
                          #{tag.tag}
                        </Typography>
                      ))}
                      <Typography key={blog.id} variant='body2'>
                        <AccessTimeIcon
                          sx={{
                            fontSize: 15,
                            mr: 0.5,
                            verticalAlign: 'middle',
                          }}
                        />
                        {getDateStr(blog.publishedAt)}
                        {/* TODO:更新日時を表示するか検討中 */}
                        {/* {blog.updatedAt !== blog.publishedAt && (
                        <>
                          <UpdateIcon
                            sx={{
                              fontSize: 15,
                              ml: 1,
                              mr: 0.5,
                              verticalAlign: "middle",
                            }}
                          />
                          {getDateStr(blog.updatedAt)}
                        </>
                      )} */}
                      </Typography>
                    </BlogPaper>
                  </a>
                </Link>
              </Grid>
            ))}

            {/* ページネーション */}
            <Grid container item xs={12}>
              <Pagination totalBlogs={blogs.length} setOffset={setOffset} perPage={perPage} />
            </Grid>
          </Grid>

          {/* 記事とサイドバーの余白 */}
          <Grid item xs={0} sm={0.5}></Grid>

          {/* サイドバー */}
          <SideBar />
        </Grid>
      </Grid>
      {/* フッター */}
      <Footer />
    </>
  );
};

export default Home;

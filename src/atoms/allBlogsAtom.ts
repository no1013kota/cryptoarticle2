// microCMSから取得した全記事データ
import { atom, useRecoilState } from "recoil";
import { Blog } from "types/blog";

const allBlogsState = atom<Blog[]>({
  key: "allBlogsState",
  default: [],
});

export const useAllBlogsState = () => {
  const [allBlogs, setAllBlogs] = useRecoilState<Blog[]>(allBlogsState);

  return { allBlogs, setAllBlogs };
};

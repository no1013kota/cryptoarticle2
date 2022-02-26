// 画面に表示する記事データ
import { atom, useRecoilState } from "recoil";
import { Blog } from "types/blog";

const showBlogsState = atom<Blog[]>({
  key: "showBlogsState",
  default: [],
});

export const useShowBlogsState = () => {
  const [showBlogs, setShowBlogs] = useRecoilState<Blog[]>(showBlogsState);

  return { showBlogs, setShowBlogs };
};

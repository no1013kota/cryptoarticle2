// microCMSから取得したタグリスト
import { atom, useRecoilState } from "recoil";

const allTagsState = atom<string[]>({
  key: "allTagsState",
  default: [],
});

export const useAllTagsState = () => {
  const [allTags, setAllTags] = useRecoilState<string[]>(allTagsState);

  return { allTags, setAllTags };
};

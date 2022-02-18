import { Dispatch, SetStateAction } from "react";
import ReactPaginate from "react-paginate";

type Props = {
  totalBlogs: number;
  setOffset: Dispatch<SetStateAction<number>>;
  perPage: number;
};

export const Pagination = ({ totalBlogs, setOffset, perPage }: Props) => {
  const handlePageChange = (data: { selected: number }) => {
    setOffset(data.selected * perPage); // offsetを変更し、表示開始するアイテムの番号を変更
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      pageCount={Math.ceil(totalBlogs / perPage)} // 全部のページ数。端数の場合も考えて切り上げに。
      onPageChange={handlePageChange} // クリック時のfunction
      containerClassName={"pagination"} // ページネーションであるulに着くクラス名
      activeClassName={"active"} // アクティブなページのliに着くクラス名
      // breakLabel={"..."}
      // marginPagesDisplayed={2} // 一番最初と最後を基準にして、そこからいくつページ数を表示するか
      // pageRangeDisplayed={5} // アクティブなページを基準にして、そこからいくつページ数を表示するか
      // previousClassName={"pagination__previous"} // 「<」のliに着けるクラス名
      // nextClassName={"pagination__next"} // 「>」のliに着けるクラス名
      // disabledClassName={"pagination__disabled"} // 使用不可の「<,>」に着くクラス名
    />
  );
};

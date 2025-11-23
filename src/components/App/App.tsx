import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../services/postService';
import { useState } from "react";

import css from "./App.module.css";

export default function App()
{
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['post', searchText, currentPage],
    queryFn: () => fetchPosts(searchText, currentPage),
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        {/* <Pagination /> */}
        <button className={css.button}>Create post</button>
      </header>
      {/* <Modal></Modal> */}
      {data && <PostList posts={data?.posts} />}

    </div>
  );
}

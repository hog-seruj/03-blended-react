import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import EditPostForm from "../EditPostForm/EditPostForm";
import type { Post } from "../../types/post";

import css from "./App.module.css";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debounceValue] = useDebounce(searchText, 1000);

  const [modalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { data } = useQuery({
    queryKey: ["posts", debounceValue, currentPage],
    queryFn: () => fetchPosts(debounceValue, currentPage),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={debounceValue} onChange={setSearchText} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button}>Create post</button>
      </header>
      {modalOpen && (
        <Modal>
          {formType === 'editForm' && selectedPost && <EditPostForm
            initialValues={selectedPost}
            setModalOpen={setModalOpen}
          />}
        </Modal>
      )}
      {data && <PostList
        posts={data?.posts}
        displayModal={setModalOpen}
        formType={setFormType}
        onSelectPost={setSelectedPost}
      />}
    </div>
  );
}

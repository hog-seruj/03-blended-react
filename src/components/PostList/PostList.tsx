import css from "./PostList.module.css";
import type { Post } from "../../types/post";

interface PostListProps {
  posts: Post[],
  displayModal: (value: boolean) => void,
  formType: (value: string) => void,
  onSelectPost: (post: Post) => void
}

export default function PostList({
    posts, displayModal, formType, onSelectPost
  }: PostListProps)
{
  return (
    <ul className={css.list}>
      {posts.map(post => (
        <li className={css.listItem} key={post.id}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
          <div className={css.footer}>
            <button className={css.edit} onClick={() => {
              onSelectPost(post);
              displayModal(true);
              formType('editForm');
            }}>Edit</button>
            <button className={css.delete}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

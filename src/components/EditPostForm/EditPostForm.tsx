import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import type { Post } from '../../types/post';
import { editPost } from "../../services/postService";
import { useMutation, useQueryClient } from '@tanstack/react-query';

import css from "./EditPostForm.module.css";

const EditPostFormSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required"),
  body: Yup.string()
    .required("Text is required"),
});

interface EditPostFormProps {
  initialValues: Post,
  setModalOpen: (value: boolean) => void
}

export default function EditPostForm({ initialValues, setModalOpen }: EditPostFormProps)
{

  const queryClient = useQueryClient();

  const mutation = useMutation<Post, Error, Post>({
    mutationFn: (post) => editPost(post),
    onSuccess: () =>
    {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      console.log("Post edited successfully!");
      setModalOpen(false);
    }
  });

  const handleSubmit = (values: Post) =>
  {
    console.log(values);

    mutation.mutate({
      id: initialValues.id,
      title: values.title,
      body: values.body,
      userId: initialValues.userId
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={EditPostFormSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={() => setModalOpen(false)}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}

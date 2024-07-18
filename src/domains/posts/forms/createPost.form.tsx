import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PostSchema, { PostSchemaType } from "../schema/post.schema";
import usePostQueries from "../queries/posts.queries";

const CreatePostForm = () => {
  const { useCreatePost } = usePostQueries();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
  });

  const { mutate } = useCreatePost();

  const onSubmit: SubmitHandler<PostSchemaType> = async (data) => {
    mutate({ title: data.title, body: data.body });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Name</label>
        <input id="title" {...register("title")} type="text" />
        {errors.title && (
          <small className="error">{errors.title.message}</small>
        )}
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <textarea id="body" {...register("body")} />
        {errors.body && <small className="error">{errors.body.message}</small>}
      </div>
      <button>Submit</button>
    </form>
  );
};

export default CreatePostForm;

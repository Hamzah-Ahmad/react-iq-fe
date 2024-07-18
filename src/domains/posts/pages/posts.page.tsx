import CreatePostForm from "../forms/createPost.form";
import usePostsQuery from "../queries/posts.queries";

const Posts = () => {
  const { useGetPosts } = usePostsQuery();
  const { data } = useGetPosts();

  return (
    <main>
      <h3>Posts</h3>

      <ul>
        {data?.map((post, indx) => (
          <h6 key={post.title + indx}>{post.title}</h6>
        ))}
      </ul>

      <div>
        <div>Create Post</div>
        <CreatePostForm />
      </div>
    </main>
  );
};

export default Posts;

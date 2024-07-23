// import CreatePostForm from "../forms/createPost.form";
import Comment from "../components/comment"
import usePostsQuery from "../queries/posts.queries";

const POST_ID = "241df4b1-e106-451c-9a5c-f6c416d70abe";
const Posts = () => {
  const { useGetPostById } = usePostsQuery();
  const { data } = useGetPostById(POST_ID);

  return (
    <main className="p-16">
      <h3 className="text-primary">Posts</h3>

      <strong>{data?.title}</strong>

      <div>
        {data?.comments?.map((comment: any) => (
          <Comment comment={comment} />
        ))}
      </div>

      {/* <div>
        <div>Create Post</div>
        <CreatePostForm />
      </div> */}
    </main>
  );
};

export default Posts;

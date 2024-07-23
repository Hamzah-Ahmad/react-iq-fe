import { useState } from "react";
import useCommentQueries from "../queries/comments.queries";

const Comment = ({ comment }: { comment: any }) => {
  const { useGetReplies, useUpdateComment, useDeleteComment } =
    useCommentQueries();
  const { data: replyData, refetch } = useGetReplies(comment.id);

  const { mutate: updateComment } = useUpdateComment(toggleIsEditing);
  const { mutate: deleteComment } = useDeleteComment();

  const [isEditing, setIsEditing] = useState(false);
  function toggleIsEditing() {
    setIsEditing(!isEditing);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    updateComment({
      commentText: e.target?.commentInput?.value,
      commentId: comment.id,
      isReply: !!comment.parentId,
      rootId: comment.parentId || comment.postId,
    });
    console.log(e.target?.commentInput?.value);
  }

  return (
    <div className="mb-16 mt-8">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <textarea
            rows={2}
            name="commentInput"
            defaultValue={comment.commentText}
            className="p-2 border-2 border-red-500"
          />
          <button>Save</button>
        </form>
      ) : (
        <div>{comment.commentText}</div>
      )}

      {
        <button className="mr-4" onClick={() => setIsEditing(!isEditing)}>
          Edit
        </button>
      }
      {comment.replyCount && (
        <button onClick={() => refetch()}>Load Replies</button>
      )}

      <button
        onClick={() =>
          deleteComment({
            commentId: comment.id,
            isReply: !!comment.parentId,
            rootId: comment.parentId || comment.postId,
          })
        }
        className="ml-4"
      >
        Delete
      </button>

      {replyData?.map((reply: any) => (
        <div className="ml-10">
          <Comment comment={reply} />
        </div>
      ))}
    </div>
  );
};

export default Comment;

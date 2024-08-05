import { useState } from "react";
import useCommentQueries from "../queries/comment.query";
import { Comment as CommentType } from "../types";
import { useAuth } from "domains/auth/hooks/useAuth";

const Comment = ({ comment }: { comment: CommentType }) => {
  const { auth, isLoggedIn } = useAuth();
  const userId = auth?.user?.id;
  const { useGetReplies, useUpdateComment, useDeleteComment } =
    useCommentQueries();
  const { data: replies, fetch: fetchReplies } = useGetReplies(comment.id);

  const { mutate: updateComment } = useUpdateComment(toggleIsEditing);
  const { mutate: deleteComment } = useDeleteComment();

  const [isEditing, setIsEditing] = useState(false);
  function toggleIsEditing() {
    setIsEditing(!isEditing);
  }

  const [showReplyForm, setShowReplyForm] = useState(false);
  function toggleReplyform() {
    if (!showReplyForm) {
      fetchReplies();
    }
    setShowReplyForm(!showReplyForm);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    updateComment({
      commentText: e.target?.commentInput?.value,
      commentId: comment.id,
      isReply: !!comment.parentId,
      rootId: comment.parentId || comment.submissionId,
    });
  }

  return (
    <div className="mb-16 mt-8">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <textarea
            rows={2}
            name="commentInput"
            defaultValue={comment.commentText}
            className="p-2 border-2 border-red-500 text-muted w-3/4"
          />
          <button>Save</button>
        </form>
      ) : (
        <div>{comment.commentText}</div>
      )}

      {showReplyForm && (
        <form onSubmit={() => {}}>
          <textarea
            rows={2}
            name="commentInput"
            className="p-2 border-2 border-red-500 text-muted w-3/4"
          />
          <button>Reply</button>
        </form>
      )}

      {!showReplyForm && (
        <div className="flex gap-x-3">
          {isLoggedIn && <button onClick={toggleReplyform}>Reply</button>}
          {userId === comment.authorId && (
            <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
          )}
          {comment.replyCount && (
            <button onClick={fetchReplies}>Load Replies</button>
          )}
          {userId === comment.authorId && (
            <button
              onClick={() =>
                deleteComment({
                  commentId: comment.id,
                  isReply: !!comment.parentId,
                  rootId: comment.parentId || comment.submissionId,
                })
              }
            >
              Delete
            </button>
          )}
        </div>
      )}

      {replies?.map((reply) => (
        <div className="ml-10" key={reply.id}>
          <Comment comment={reply} />
        </div>
      ))}
    </div>
  );
};

export default Comment;

import { useState } from "react";
import useCommentQueries from "../queries/comment.query";
import { CommentWithAuthor } from "../types";
import { useAuth } from "domains/auth/hooks/useAuth";
import { Button } from "shared/components/ui/button";
import { Textarea } from "shared/components/ui/textarea";

const Comment = ({ comment }: { comment: CommentWithAuthor }) => {
  const { auth, isLoggedIn } = useAuth();
  const userId = auth?.user?.id;
  const {
    useGetReplies,
    useUpdateComment,
    useDeleteComment,
    useReplyToComment,
  } = useCommentQueries();
  const { data: replies, fetch: fetchReplies } = useGetReplies(comment.id);

  const { mutate: updateComment } = useUpdateComment(toggleIsEditing);
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: replyToComment } = useReplyToComment();

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
      rootId: comment.parentId || comment.submissionId,
    });
  }

  function handleReply(e: any) {
    e.preventDefault();
    replyToComment({
      commentText: e.target?.replyInput?.value,
      rootId: comment.id,
    });
  }

  return (
    <div className="my-2">
      <div className="border-1 border-muted-foreground rounded-md">
        <div className="font-extrabold">{comment.author?.name}</div>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            {/* <textarea
              rows={1}
              name="commentInput"
              defaultValue={comment.commentText}
              className="p-2 text-muted w-3/4"
            /> */}
            <div className="relative">
              <Textarea
                name="commentInput"
                className="my-2 no-resize"
                rows={2}
                defaultValue={comment.commentText}
              />
              <div className="absolute top-1/3 pt-2 right-4 py-0 flex">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button variant="ghost" type="submit">
                  Save
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <span>{comment.commentText}</span>
        )}
      </div>

      {!isEditing && (
        <div className="pt-2">
          {/* {!showReplyForm && ( */}
          <div className="flex gap-x-3">
            {isLoggedIn && (
              <Button
                variant="ghost"
                className="px-0 pr-2 pt-0 text-xs hover:bg-transparent hover:underline"
                onClick={toggleReplyform}
              >
                Reply
              </Button>
            )}
            {userId === comment.authorId && (
              <Button
                variant="ghost"
                className="px-0 pr-2 pt-0 text-xs hover:bg-transparent hover:underline"
                onClick={() => setIsEditing(!isEditing)}
              >
                Edit
              </Button>
            )}
            {/* Display Load Replies button if there is reply count and replies haven't been loaded yet */}
            {comment.replyCount && !replies ? (
              <Button
                variant="ghost"
                className="px-0 pr-2 pt-0 text-xs hover:bg-transparent hover:underline"
                onClick={fetchReplies}
              >
                View Replies
              </Button>
            ) : null}
            {userId === comment.authorId && (
              <Button
                variant="ghost"
                className="px-0 pr-2 pt-0 text-xs hover:bg-transparent hover:underline"
                onClick={() =>
                  deleteComment({
                    commentId: comment.id,
                    rootId: comment.parentId || comment.submissionId,
                  })
                }
              >
                Delete
              </Button>
            )}
          </div>
          {/* )}  */}

          {showReplyForm && (
            <form onSubmit={handleReply} className="relative">
              <Textarea
                rows={2}
                name="replyInput"
                className="no-resize mb-10"
              />
              <div className="absolute top-1/3 pt-2 right-4">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setShowReplyForm(false)}
                >
                  Cancel
                </Button>
                <Button variant="ghost" type="submit">
                  Comment
                </Button>
              </div>
            </form>
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

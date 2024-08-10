import { Button } from "shared/components/ui/button";
import { CommentWithAuthor } from "../types";
import useCommentQueries from "../queries/comment.query";
import { useAuth } from "domains/auth/hooks/useAuth";

type CommentActionProps = {
  fetchReplies: () => void;
  comment: CommentWithAuthor;
  toggleReplyform: () => void;
  replies: CommentWithAuthor[] | undefined;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};
const CommentActions = ({
  comment,
  replies,
  fetchReplies,
  setIsEditing,
  toggleReplyform,
}: CommentActionProps) => {
  const { useDeleteComment } = useCommentQueries();
  const { mutate: deleteComment } = useDeleteComment();
  const { auth, isLoggedIn } = useAuth();
  const userId = auth?.user?.id;

  return (
    <div className="pt-2">
      <div className="flex gap-x-3">
        {isLoggedIn && (
          <Button variant="link" className="p-0" onClick={toggleReplyform}>
            Reply
          </Button>
        )}
        {userId === comment.authorId && (
          <Button
            variant="link"
            className="p-0"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            Edit
          </Button>
        )}
        {/* Display Load Replies button if there is reply count and replies haven't been loaded yet */}
        {comment.replyCount && !replies ? (
          <Button variant="link" className="p-0" onClick={fetchReplies}>
            View Replies
          </Button>
        ) : null}
        {userId === comment.authorId && (
          <Button
            variant="link"
            className="p-0"
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
    </div>
  );
};

export default CommentActions;

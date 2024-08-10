import { Button } from "shared/components/ui/button";
import { CommentWithAuthor } from "../types";
import useCommentQueries from "../queries/comment.query";
import { useAuth } from "domains/auth/hooks/useAuth";
import { useState } from "react";

type CommentActionProps = {
  fetchReplies: () => void;
  comment: CommentWithAuthor;
  toggleReplyform: () => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};
const CommentActions = ({
  comment,
  fetchReplies,
  setIsEditing,
  toggleReplyform,
}: CommentActionProps) => {
  const { useDeleteComment } = useCommentQueries();
  const { mutate: deleteComment } = useDeleteComment();
  const [viewedReplies, setViewedReplies] = useState(false);
  const { auth, isLoggedIn } = useAuth();
  const userId = auth?.user?.id;

  function viewReplies() {
    setViewedReplies(true);
    fetchReplies();
  }
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
        {comment.replyCount && !viewedReplies ? (
          <Button variant="link" className="p-0" onClick={viewReplies}>
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

import { useState } from "react";
import useCommentQueries from "../queries/comment.query";
import { CommentWithAuthor } from "../types";
import { useAuth } from "domains/auth/hooks/useAuth";
import { Button } from "shared/components/ui/button";
import RepliesSection from "./replies-section";
import ReplyBox from "./reply-box";
import UpdateComment from "./update-comment";

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

  const { mutate: updateComment } = useUpdateComment(toggleIsEditing);
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: replyToComment } = useReplyToComment(() =>
    setShowReplyForm(false)
  );

  return (
    <div className="my-2">
      <div className="border-2 border-secondary p-4 pb-0 rounded-lg">
        {/* Username, Comment, Edit field */}
        <div className="rounded-md">
          <div className="font-extrabold">{comment.author?.name}</div>
          {isEditing ? (
            <UpdateComment
              updateComment={updateComment}
              comment={comment}
              setIsEditing={setIsEditing}
            />
          ) : (
            <span>{comment.commentText}</span>
          )}
        </div>

        {/* Buttons Row  */}
        {!isEditing && (
          <div className="pt-2">
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
          </div>
        )}
      </div>

      {/* Reply Box */}
      {showReplyForm && (
        <ReplyBox
          replyToComment={replyToComment}
          setShowReplyForm={setShowReplyForm}
          rootId={comment.id}
        />
      )}

      {/* Replies */}
      <RepliesSection replies={replies} />
    </div>
  );
};

export default Comment;

import { useState } from "react";
import useCommentQueries from "../queries/comment.query";
import { CommentWithAuthor } from "../types";
import RepliesSection from "./replies-section";
import ReplyBox from "./reply-box";
import UpdateComment from "./update-comment";
import CommentActions from "./comment-actions";
import { useAuth } from "domains/auth/hooks/useAuth";
import { useNavigate } from 'react-router-dom';

const Comment = ({ comment }: { comment: CommentWithAuthor }) => {
  const { useGetReplies, useUpdateComment, useReplyToComment } =
    useCommentQueries();
  const { isLoggedIn } = useAuth();
  const {
    data: replies,
    fetch: fetchReplies,
    isLoading: isLoadingReplies,
  } = useGetReplies(comment.id);

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  function toggleIsEditing() {
    setIsEditing(!isEditing);
  }

  const [showReplyForm, setShowReplyForm] = useState(false);

  const { mutate: updateComment, isPending: isPendingUpdate } = useUpdateComment(toggleIsEditing);
  const { mutate: replyToComment, isPending: isPendingReply } = useReplyToComment(() =>
    setShowReplyForm(false)
  );

  function toggleReplyform() {
    if (isLoggedIn) {
      setShowReplyForm(!showReplyForm);
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="my-2">
      <div className="border-2 border-secondary p-4 rounded-lg">
        {/* Username, Comment, Edit field */}
        <div className="rounded-md">
          <div className="font-extrabold">{comment.author?.name}</div>
          {isEditing ? (
            <UpdateComment
              updateComment={updateComment}
              comment={comment}
              setIsEditing={setIsEditing}
              isPendingUpdate={isPendingUpdate}
            />
          ) : (
            <span>{comment.commentText}</span>
          )}
        </div>

        {/* Buttons Row  */}
        {!isEditing && (
          <CommentActions
            {...{
              toggleReplyform,
              comment,
              replies,
              isEditing,
              setIsEditing,
              fetchReplies,
            }}
          />
        )}
      </div>

      {/* Reply Input */}
      {showReplyForm && (
        <ReplyBox
          replyToComment={replyToComment}
          setShowReplyForm={setShowReplyForm}
          isPendingReply={isPendingReply}
          rootId={comment.id}
        />
      )}

      {/* Replies */}
      <RepliesSection replies={replies} isLoadingReplies={isLoadingReplies} />
    </div>
  );
};

export default Comment;

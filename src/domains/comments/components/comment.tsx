import { useState } from "react";
import useCommentQueries from "../queries/comment.query";
import { CommentWithAuthor } from "../types";
import RepliesSection from "./replies-section";
import ReplyBox from "./reply-box";
import UpdateComment from "./update-comment";
import CommentActions from "./comment-actions";

const Comment = ({ comment }: { comment: CommentWithAuthor }) => {
  const { useGetReplies, useUpdateComment, useReplyToComment } =
    useCommentQueries();
  const { data: replies, fetch: fetchReplies } = useGetReplies(comment.id);

  const [isEditing, setIsEditing] = useState(false);
  function toggleIsEditing() {
    setIsEditing(!isEditing);
  }

  const [showReplyForm, setShowReplyForm] = useState(false);

  const { mutate: updateComment } = useUpdateComment(toggleIsEditing);
  const { mutate: replyToComment } = useReplyToComment(() =>
    setShowReplyForm(false)
  );

  function toggleReplyform() {
    setShowReplyForm(!showReplyForm);
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
          rootId={comment.id}
        />
      )}

      {/* Replies */}
      <RepliesSection replies={replies} />
    </div>
  );
};

export default Comment;

import { useState } from "react";
import useCommentQueries from "../queries/comment.query";
import { CommentWithAuthor } from "../types";
import { useAuth } from "domains/auth/hooks/useAuth";
import { Button } from "shared/components/ui/button";
import { Textarea } from "shared/components/ui/textarea";
import RepliesSection from "./replies-section";

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
      <div className="border-2 border-secondary p-4 pb-0 rounded-lg">
        {/* Username, Comment, Edit field */}
        <div className="rounded-md">
          <div className="font-extrabold">{comment.author?.name}</div>
          {isEditing ? (
            <form
              onSubmit={handleSubmit}
              className="relative h-24 bg-background  mb-10 rounded-lg"
            >
              <Textarea
                name="commentInput"
                className="my-2 custom-textarea p-4 min-h-fit h-16  custom-scroll"
                defaultValue={comment.commentText}
              />
              <div className="absolute bottom-0 right-4 py-0 flex">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button variant="ghost" type="submit">
                  Update
                </Button>
              </div>
            </form>
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
        <form
          onSubmit={handleReply}
          className="relative h-24 bg-background mb-10 rounded-lg mt-4"
        >
          <Textarea
            rows={2}
            name="replyInput"
            className="mb-10 custom-textarea p-4  min-h-fit h-16 custom-scroll"
          />
          <div className="absolute bottom-0 pt-2 right-4">
            <Button
              variant="ghost"
              type="button"
              className="hover:bg-transparent"
              onClick={() => setShowReplyForm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="ghost"
              type="submit"
              className="hover:bg-transparent"
            >
              Comment
            </Button>
          </div>
        </form>
      )}
      {/* Replies */}
      <RepliesSection replies={replies} />
    </div>
  );
};

export default Comment;

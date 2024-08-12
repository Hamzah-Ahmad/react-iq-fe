import { Textarea } from "shared/components/ui/textarea";
import { CommentWithAuthor } from "../types";
import { Button } from "shared/components/ui/button";
import { MutateOptions } from "@tanstack/react-query";
import { useState } from "react";

type UpdateCommentFnType = (
  variables: {
    commentText: string;
    commentId: string;
    rootId: string;
  },
  options?:
    | MutateOptions<
        any,
        any,
        {
          commentText: string;
          commentId: string;
          rootId: string;
        },
        unknown
      >
    | undefined
) => void;

type UpdateCommentProps = {
  updateComment: UpdateCommentFnType;
  comment: CommentWithAuthor;
  setIsEditing: any;
};
const UpdateComment = ({
  updateComment,
  comment,
  setIsEditing,
}: UpdateCommentProps) => {
  const [updateInput, setUpdateInput] = useState(comment.commentText);

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateComment({
      commentText: updateInput,
      commentId: comment.id,
      rootId: comment.parentId || comment.submissionId,
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setUpdateInput(e.target.value);
  }

  return (
    <form
      onSubmit={handleUpdate}
      className="relative h-24 bg-background  mb-10 rounded-lg"
    >
      <Textarea
        value={updateInput}
        onChange={handleChange}
        className="my-2 custom-textarea p-4 min-h-fit h-16  custom-scroll"
      />
      <div className="absolute bottom-0 right-4 py-0 flex">
        <Button
          variant="ghost"
          type="button"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </Button>
        <Button variant="ghost" type="submit" disabled={!updateInput}>
          Update
        </Button>
      </div>
    </form>
  );
};

export default UpdateComment;

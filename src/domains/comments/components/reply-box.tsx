import { MutateOptions } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "shared/components/ui/button";
import { Textarea } from "shared/components/ui/textarea";

type ReplyToCommentFn = (
  variables: {
    commentText: string;
    rootId: string;
  },
  options?:
    | MutateOptions<
        any,
        any,
        {
          commentText: string;
          rootId: string;
        },
        unknown
      >
    | undefined
) => void;

type ReplyBoxProps = {
  setShowReplyForm: React.Dispatch<React.SetStateAction<boolean>>;
  replyToComment: ReplyToCommentFn;
  rootId: string;
  isPendingReply: boolean;
};

const ReplyBox = ({
  setShowReplyForm,
  replyToComment,
  rootId,
  isPendingReply = false,
}: ReplyBoxProps) => {
  const [commentInput, setCommentInput] = useState<string>("");
  function handleReply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    replyToComment({
      commentText: commentInput,
      rootId: rootId,
    });
  }
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCommentInput(e.target.value);
  }
  function hideReplyForm() {
    setShowReplyForm(false);
  }

  return (
    <form
      onSubmit={handleReply}
      className="relative h-24 bg-background mb-10 rounded-lg mt-4"
    >
      <Textarea
        rows={2}
        name="replyInput"
        value={commentInput}
        onChange={handleChange}
        className="mb-10 custom-textarea p-4  min-h-fit h-16 custom-scroll"
      />
      <div className="absolute bottom-0 pt-2 right-4">
        <Button
          variant="ghost"
          type="button"
          className="hover:bg-transparent"
          onClick={hideReplyForm}
        >
          Cancel
        </Button>
        <Button
          variant="ghost"
          type="submit"
          className="hover:bg-transparent"
          disabled={!commentInput || isPendingReply}
        >
          Comment
        </Button>
      </div>
    </form>
  );
};

export default ReplyBox;

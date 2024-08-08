// import useCommentQueries from "../queries/comment.query";

import { SendHorizonal } from "lucide-react";
import { Button } from "shared/components/ui/button";
import { Textarea } from "shared/components/ui/textarea";
import useCommentQueries from "../queries/comment.query";

const CreateComment = ({ submissionId }: { submissionId: string }) => {
  const { useCreateComment } = useCommentQueries();
  const { mutate } = useCreateComment();
  function createComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const commentBox = form.elements.namedItem("commentBox") as HTMLInputElement;
    const text = commentBox.value;

    mutate({
      submissionId: submissionId,
      commentText: text
    })
  }
  return (
    <form onSubmit={createComment} className="relative">
      <Textarea
        placeholder="Add a comment"
        name="commentBox"
        className="scroll-invisible p-4 pr-16"
      />
      <Button variant="ghost" size="icon" className="absolute bottom-3 right-3">
        <SendHorizonal />
      </Button>
    </form>
  );
};

export default CreateComment;

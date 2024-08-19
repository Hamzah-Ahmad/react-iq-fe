// import useCommentQueries from "../queries/comment.query";

import { SendHorizonal } from "lucide-react";
import { Button } from "shared/components/ui/button";
import { Textarea } from "shared/components/ui/textarea";
import useCommentQueries from "../queries/comment.query";
import { useState } from "react";

const CreateComment = ({ submissionId }: { submissionId: string }) => {
  const { useCreateComment } = useCommentQueries();
  const [userInput, setUserInput] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setUserInput(e.target.value);
  }

  function clearInput() {
    setUserInput("");
  }
  const { mutate, isPending } = useCreateComment(clearInput);
  function createComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutate({
      submissionId: submissionId,
      commentText: userInput,
    });
  }
  return (
    <form onSubmit={createComment} className="relative">
      <Textarea
        placeholder="Add a comment"
        value={userInput}
        rows={4}
        onChange={handleChange}
        className="scroll-invisible p-4 pr-16 custom-textarea placeholder:text-secondary"
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-3 right-3"
        disabled={isPending || !userInput}
      >
        <SendHorizonal />
      </Button>
    </form>
  );
};

export default CreateComment;

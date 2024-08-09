import { CommentWithAuthor } from "../types";
import Comment from "./comment";

type RepliesProps = {
  replies: CommentWithAuthor[] | undefined;
};
const RepliesSection = ({ replies = [] }: RepliesProps) => {
  return (
    <>
      {replies?.map((reply) => (
        <div className="ml-10 mt-4" key={reply.id}>
          <Comment comment={reply} />
        </div>
      ))}
    </>
  );
};

export default RepliesSection;

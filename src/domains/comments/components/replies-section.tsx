import Loader from "shared/components/ui/loader";
import { CommentWithAuthor } from "../types";
import Comment from "./comment";

type RepliesProps = {
  replies: CommentWithAuthor[] | undefined;
  isLoadingReplies: boolean;
};
const RepliesSection = ({ replies = [], isLoadingReplies = false }: RepliesProps) => {
  if(isLoadingReplies) {
    return <div className="ml-10 mt-4">
      <Loader height="127px" />
    </div>
  }
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

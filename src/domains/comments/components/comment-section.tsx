import { isValidUUIDV4 } from "shared/lib/utils";
import useCommentQueries from "../queries/comment.query";
import Comment from "./comment";

const CommentSection = ({ submissionId }: { submissionId: string }) => {
  const { useGetCommentsBySubmissions } = useCommentQueries();
  const { data } = useGetCommentsBySubmissions(
    submissionId,
    !!(submissionId && isValidUUIDV4(submissionId))
  );
  if (!data) return null;
  return (
    <div>
      {data.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentSection;

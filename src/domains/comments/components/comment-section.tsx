import { isValidUUIDV4 } from "shared/lib/utils";
import useCommentQueries from "../queries/comment.query";
import Comment from "./comment";
import CreateComment from "./create-comment";

const CommentSection = ({ submissionId }: { submissionId: string }) => {
  const { useGetCommentsBySubmissions } = useCommentQueries();
  const { data } = useGetCommentsBySubmissions(
    submissionId,
    !!(submissionId && isValidUUIDV4(submissionId))
  );
  if (!data) return null;
  return (
    <div className="mt-12">
      <CreateComment submissionId={submissionId} />
      <div className="mt-16 flex flex-col gap-y-10">
        {data.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;

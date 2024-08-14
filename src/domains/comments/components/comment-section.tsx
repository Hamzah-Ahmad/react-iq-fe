import { isValidUUIDV4 } from "shared/lib/utils";
import useCommentQueries from "../queries/comment.query";
import Comment from "./comment";
import CreateComment from "./create-comment";
import Loader from "shared/components/ui/loader";

const CommentSection = ({ submissionId }: { submissionId: string }) => {
  const { useGetCommentsBySubmissions } = useCommentQueries();
  const { data, isLoading } = useGetCommentsBySubmissions(
    submissionId,
    !!(submissionId && isValidUUIDV4(submissionId))
  );

  if (isLoading) {
    return (
      <>
        <Loader height="7rem" className="mt-12 mb-20" />

        <Loader height="7rem" className="mb-10" />
        <Loader height="7rem" />
      </>
    );
  }
  if (!data) return null;

  return (
    <div className="mt-12 mb-36">
      <CreateComment submissionId={submissionId} />
      <div className="mt-16 flex flex-col gap-y-6">
        {data.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;

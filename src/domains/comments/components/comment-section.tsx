import { isValidUUIDV4 } from "shared/lib/utils";
import useCommentQueries from "../queries/comment.query";
import Comment from "./comment";
import CreateComment from "./create-comment";
import Skeleton from "react-loading-skeleton";

const CommentSection = ({ submissionId }: { submissionId: string }) => {
  const { useGetCommentsBySubmissions } = useCommentQueries();
  const { data, isLoading } = useGetCommentsBySubmissions(
    submissionId,
    !!(submissionId && isValidUUIDV4(submissionId))
  );

  if (isLoading) {
    return (
      <>
        <Skeleton
          height="7rem"
          baseColor="#37475A"
          highlightColor="#232E3E"
          borderRadius="8px"
          className="mt-12 mb-20"
        />
        <Skeleton
          height="8rem"
          baseColor="#37475A"
          highlightColor="#232E3E"
          borderRadius="8px"
        />
        <Skeleton
          height="8rem"
          baseColor="#37475A"
          highlightColor="#232E3E"
          borderRadius="8px"
          className="mt-14"
        />
      </>
    );
  }
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

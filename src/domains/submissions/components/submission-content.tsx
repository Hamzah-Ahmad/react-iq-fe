import { isValidUUIDV4 } from "shared/lib/utils";
import useSubmissionQueries from "../queries/submission.query";
import { LiveEditor, LiveProvider } from "react-live";
import CommentSection from "domains/comments/components/comment-section";

const SubmissionContent = ({
  submissionId,
}: {
  submissionId: string | null;
}) => {
  const { useGetSubmissionById } = useSubmissionQueries();

  const {
    data: submission,
    isLoading: submissionIsLoading,
    error: submissionError,
  } = useGetSubmissionById(
    submissionId as string,
    !!(submissionId && isValidUUIDV4(submissionId))
  );

  if (submissionError) {
    return <div>Error</div>;
  }

  if (submissionIsLoading) {
    return <div>Loading...</div>;
  }

  if (!submissionId || !isValidUUIDV4(submissionId)) {
    return <div>No or invalid ID</div>;
  }

  //   if(!submissionId ||)
  return (
    <div>
      <LiveProvider code={submission?.code} noInline>
        <LiveEditor className="font-mono rounded-md max-h-96 overflow-y-auto custom-scroll" />
      </LiveProvider>

      <CommentSection submissionId={submissionId} />
    </div>
  );
};

export default SubmissionContent;

import { isValidUUIDV4 } from "shared/lib/utils";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
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
    return (
      <div className="text-3xl h-full w-full flex items-center justify-center">
        Looks like something went wrong...
      </div>
    );
  }

  if (!submissionId || !isValidUUIDV4(submissionId)) {
    return (
      <div className="text-3xl h-full w-full flex items-center justify-center">
        Invalid submission ID
      </div>
    );
  }

  return (
    <div>
      {submissionIsLoading ? (
        <Skeleton
          height="24rem"
          baseColor="#37475A"
          highlightColor="#232E3E"
          borderRadius="8px"
        />
      ) : (
        <LiveProvider code={submission?.code} noInline>
          <LiveEditor className="font-mono rounded-md max-h-96 overflow-y-auto custom-scroll" />
        </LiveProvider>
      )}

      <CommentSection submissionId={submissionId} />
    </div>
  );
};

export default SubmissionContent;

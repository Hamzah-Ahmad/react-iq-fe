import { isValidUUIDV4 } from "shared/lib/utils";
import useSubmissionQueries from "../queries/submission.query";

const SubmissionContent = ({
  submissionId,
}: {
  submissionId: string | null;
}) => {
  const { useGetSubmissionById } = useSubmissionQueries();

  const { data, error } = useGetSubmissionById(
    submissionId as string,
    !!(submissionId && isValidUUIDV4(submissionId))
  );
  console.log(
    "submissionData: ",
    data,
    !!(submissionId && isValidUUIDV4(submissionId))
  );

  if (error) {
    return <div>Error</div>;
  }

  if (!submissionId || !isValidUUIDV4(submissionId)) {
    return <div>No or invalid ID</div>;
  }

  //   if(!submissionId ||)
  return <div>SubmissionContent {submissionId}</div>;
};

export default SubmissionContent;

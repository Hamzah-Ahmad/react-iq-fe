import { useSearchParams } from "react-router-dom";
import useSubmissionQueries from "../queries/submission.query";
import SubmissionCard from "./submission-card";
const SubmissionList = () => {
  const { useGetAllSubmissions } = useSubmissionQueries();
  const [searchParams] = useSearchParams();
  const questionId = searchParams.get("questionId")!;
  const { data, isLoading, error } = useGetAllSubmissions(
    questionId,
    !!questionId
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  console.log("==> ", data);
  return (
    <div className="pt-4">
      {data?.map((submission) => (
        <SubmissionCard submission={submission} />
      ))}
    </div>
  );
};

export default SubmissionList;

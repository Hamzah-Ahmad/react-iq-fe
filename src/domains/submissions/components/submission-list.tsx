import { useSearchParams } from "react-router-dom";
import useSubmissionQueries from "../queries/submission.query";
import SubmissionCard from "./submission-card";
import { Accordion } from "@radix-ui/react-accordion";
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
      <Accordion type="single" collapsible className="flex flex-col gap-y-2">
        {data?.map((submission) => (
          <SubmissionCard submission={submission} />
        ))}
      </Accordion>
    </div>
  );
};

export default SubmissionList;

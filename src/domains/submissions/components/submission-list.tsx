import { useSearchParams } from "react-router-dom";
import useSubmissionQueries from "../queries/submission.query";
import SubmissionCard from "./submission-card";
import { Accordion } from "@radix-ui/react-accordion";
import Loader from "shared/components/ui/loader";
const SubmissionList = () => {
  const { useGetAllSubmissions } = useSubmissionQueries();
  const [searchParams] = useSearchParams();
  const questionId = searchParams.get("questionId")!;
  const { data, isLoading, error } = useGetAllSubmissions(
    questionId,
    !!questionId
  );

  if (isLoading)
    return (
      <div className="mt-12 flex flex-col gap-y-4">
        <Loader height="2.5rem" />
        <Loader height="2.5rem" />
        <Loader height="2.5rem" />
      </div>
    );
  if (error) return <div className="mt-8">Something went wrong</div>;

  if (data && !data.length)
    return (
      <div className="mt-8">
        No solutions have been submitted for this question yet.
      </div>
    );
  return (
    <div className="pt-4 max-h-96 overflow-y-scroll scroll-invisible mt-8">
      <Accordion type="single" collapsible className="flex flex-col gap-y-4">
        {data?.map((submission) => (
          <SubmissionCard submission={submission} key={submission.id} />
        ))}
      </Accordion>
    </div>
  );
};

export default SubmissionList;

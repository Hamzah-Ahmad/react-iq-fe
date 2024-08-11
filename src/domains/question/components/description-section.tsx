import { useSearchParams } from "react-router-dom";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "shared/components/ui/tabs";
import SubmissionList from "domains/submissions/components/submission-list";
import useQuestionQueries from "../queries/question.query";
import Loader from "shared/components/ui/loader";
import { cn } from "shared/lib/utils";

const Wrapper = ({
  children,
  className,
}: {
  children: React.ReactElement | React.ReactElement[] | string;
  className?: string;
}) => (
  <div className={cn("bg-card text-muted-foreground description", className)}>
    {children}
  </div>
);
const Description = () => {
  const [searchParams] = useSearchParams();

  const { useGetQuestionById } = useQuestionQueries();

  const {
    data: question,
    isLoading,
    isError,
  } = useGetQuestionById(searchParams.get("questionId") || "");

  if (isLoading)
    return (
      <Wrapper className="px-8">
        <Loader height="2.25rem" className="my-8" />
        <Loader height="2.75rem" className="my-3" />
        <Loader height="2.25rem"  />
      </Wrapper>
    );
  if (isError) return <Wrapper>Something went wrong</Wrapper>;
  const { title, description } = question || {};

  return (
    <Wrapper>
      <Tabs defaultValue="description" className="p-8">
        <TabsList className="tabs-container bg-background">
          <TabsTrigger value="description" className="w-full tab">
            Description
          </TabsTrigger>
          <TabsTrigger value="submissions" className="w-full tab">
            Submissions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <div className="pt-4">
            <h4 className="text-xl">{title}</h4>
            <p className="text-md mt-6">{description}</p>
          </div>
        </TabsContent>
        <TabsContent value="submissions">
          <SubmissionList />
        </TabsContent>
      </Tabs>
    </Wrapper>
  );
};

export default Description;

import { useSearchParams } from "react-router-dom";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "shared/components/ui/tabs";
import SubmissionList from "domains/submissions/components/submission-list";
import useQuestionQueries from "../queries/question.query";

const Wrapper = ({ children }: { children: React.ReactElement | string }) => (
  <div className="bg-background text-muted-foreground description">
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

  if (isLoading) return <Wrapper>Loading question</Wrapper>;
  if (isError) return <Wrapper>Something went wrong</Wrapper>;
  const { title, description } = question || {};

  return (
    <Wrapper>
      <Tabs defaultValue="description" className="p-8">
        <TabsList className="tabs-container">
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

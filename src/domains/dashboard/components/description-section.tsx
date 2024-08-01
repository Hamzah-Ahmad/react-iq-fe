import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { Question } from "../types";
import { useAuth } from "domains/auth/hooks/useAuth";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "shared/components/ui/tabs";
import SubmissionList from "domains/submissions/components/submission-list";

const Description = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { auth } = useAuth();

  const questions = queryClient.getQueryData<Question[]>([
    "questions",
    !!auth?.accessToken,
  ]);

  const selectedQuestion = questions?.find(
    (question) => question.id === searchParams.get("questionId")
  );
  console.log(selectedQuestion);

  const { title, description, submissions, userSubmission } =
    selectedQuestion || {};
  console.log(submissions, userSubmission);

  return (
    <div className="bg-muted description">
      <Tabs defaultValue="description" className="p-8">
        <TabsList className="w-full bg-popover-foreground">
          <TabsTrigger value="description" className="w-full tab">
            Description
          </TabsTrigger>
          <TabsTrigger value="submissions" className="w-full tab">
            Submissions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          {!selectedQuestion ? null : (
            <div className="pt-4">
              <h4 className="text-xl">{title}</h4>
              <p className="text-md mt-6">{description}</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="submissions">
          <SubmissionList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Description;

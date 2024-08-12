import { useState } from "react";
import Sidebar from "../components/sidebar";
import Workspace from "../components/workspace";
import { Button } from "shared/components/ui/button";
import SubmissionViewer from "domains/submissions/components/submission-viewer";
import { List } from "lucide-react";
import useQuestionQueries from "domains/question/queries/question.query";
import { useAuth } from "domains/auth/hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import Spinner from "shared/components/ui/spinner";

const Homepage = () => {
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const { useGetAllQuestions } = useQuestionQueries();
  const { data: questionsList } = useGetAllQuestions(!!auth?.accessToken);

  const [searchParams, setSearchParams] = useSearchParams();

  const questionId = searchParams.get("questionId") || "";

  if (!questionId) {
    setSearchParams({ questionId: questionsList?.[0]?.id! });
  }

  function toggleDrawer() {
    setIsOpen((prevState) => !prevState);
  }

  if (!questionsList) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <Button
        variant="ghost"
        onClick={toggleDrawer}
        className="m-4 border-primary flex gap-x-2 items-center"
      >
        <List /> Problem List
      </Button>
      <Sidebar
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        questionsList={questionsList}
      />
      <Workspace />
      <SubmissionViewer />
    </>
  );
};

export default Homepage;

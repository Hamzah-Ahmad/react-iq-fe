import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Workspace from "../components/workspace";
import { Button } from "shared/components/ui/button";
import SubmissionViewer from "domains/submissions/components/submission-viewer";
import { List } from "lucide-react";
import useQuestionQueries from "domains/question/queries/question.query";
import { useAuth } from "domains/auth/hooks/useAuth";
import { Link, useSearchParams } from "react-router-dom";
import Spinner from "shared/components/ui/spinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "shared/components/ui/popover";
import useLogout from "domains/auth/hooks/useLogout";

const Homepage = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const { useGetAllQuestions } = useQuestionQueries();
  const { data: questionsList } = useGetAllQuestions(!!auth?.accessToken);

  const [searchParams, setSearchParams] = useSearchParams();

  const questionId = searchParams.get("questionId") || "";

  if (!questionId && questionsList?.[0]?.id) {
    setSearchParams({ questionId: questionsList?.[0]?.id });
  }

  useEffect(() => {
    setIsOpen(false);
  }, [questionId]);
  function toggleDrawer() {
    setIsOpen((prevState) => !prevState);
  }

  if (!questionsList?.length) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={toggleDrawer}
          className="m-4 border-primary flex gap-x-2 items-center"
        >
          <List /> Problem List
        </Button>

        {auth?.user ? (
          <Popover>
            <PopoverTrigger className="mr-6 text-sm">Logged in as {auth.user.name}</PopoverTrigger>
            <PopoverContent className="bg-background w-fit py-1">
              <Button variant="link" onClick={logout}>
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <Button className="mr-6 text-foreground" asChild>
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
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

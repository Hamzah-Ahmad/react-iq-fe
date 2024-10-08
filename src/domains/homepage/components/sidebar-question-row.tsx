import { Square, SquareCheck } from "lucide-react";
import { QuestionWithUserSubmission } from "domains/question/components";
import { Link } from "react-router-dom";
import { cn } from "shared/lib/utils";
import { useAuth } from "domains/auth/hooks/useAuth";

const SidebarQuestionRow = ({
  question,
  selected,
}: {
  question: QuestionWithUserSubmission;
  selected?: boolean;
}) => {
  const { isLoggedIn } = useAuth();

  return (
    <Link
      to={`/homepage?questionId=${question.id}`}
      className={cn(
        "px-8 py-2 border-y-2 flex items-center w-full justify-between",
        selected && `bg-primary`
      )}
    >
      <p className="">{question.title}</p>
      <span className="justify-end scale-90">
        {isLoggedIn ? (
          question.userSubmission ? (
            <SquareCheck />
          ) : (
            <Square />
          )
        ) : null}
      </span>
    </Link>
  );
};

export default SidebarQuestionRow;

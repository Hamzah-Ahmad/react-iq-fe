import { Square, SquareCheck } from "lucide-react";
import { QuestionWithUserSubmission } from "domains/question/components";
import { Link } from "react-router-dom";
import { cn } from "shared/lib/utils";

const SidebarQuestionRow = ({
  question,
  selected
}: {
  question: QuestionWithUserSubmission;
  selected?: boolean
}) => {
  return (
    <Link
      to={`/homepage?questionId=${question.id}`}
      className={cn("px-8 py-2 border-y-2 flex items-center w-full justify-between", selected && `bg-input`)}
    >
      <p>{question.title}</p>
      <span className="justify-end scale-90">
        {question.userSubmission ? (
          <SquareCheck className="text-primary" />
        ) : (
          <Square className="text-primary" />
        )}
      </span>
    </Link>
  );
};

export default SidebarQuestionRow;

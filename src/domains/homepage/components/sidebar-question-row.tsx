import { Square, SquareCheck } from "lucide-react";
import { QuestionWithUserSubmission } from "domains/question/components";
import { Link } from "react-router-dom";

const SidebarQuestionRow = ({
  question,
}: {
  question: QuestionWithUserSubmission;
}) => {
  return (
    <Link
      to={`/homepage?questionId=${question.id}`}
      className="px-8 py-2 border-y-2 flex items-center w-full justify-between"
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

import { Square, SquareCheck } from "lucide-react";
import { QuestionWithUserSubmission } from "domains/question/components";

const SidebarQuestionRow = ({
  question,
}: {
  question: QuestionWithUserSubmission;
}) => {
  return (
    <div className="px-8 py-2 border-y-2 flex items-center w-full justify-between">
      <p>{question.title}</p>
      <span className="justify-end scale-90">
        {question.userSubmission ? (
          <SquareCheck className="text-primary" />
        ) : (
          <Square className="text-primary" />
        )}
      </span>
    </div>
  );
};

export default SidebarQuestionRow;

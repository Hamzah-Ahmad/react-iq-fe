import { Square, SquareCheck } from "lucide-react";
import { QuestionWithUserSubmission } from "../types";

const QuestionRow = ({
  question,
}: {
  question: QuestionWithUserSubmission;
}) => {
  return (
    <div className="px-8 py-2 border-y-2 flex items-center w-full justify-between">
      <p>{question.title}</p>
      <span className="justify-end scale-75">
        {question.userSubmission ? <SquareCheck /> : <Square />}
      </span>
    </div>
  );
};

export default QuestionRow;

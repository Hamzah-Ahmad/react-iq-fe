import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Question } from "../types";
import { useAuth } from "domains/auth/hooks/useAuth";

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

  const { title, description, hints } = selectedQuestion || {};
  console.log(title, description, hints);

  return (
    <div className="bg-muted description">
      {!selectedQuestion ? null : (
        <div className="p-8">
          <h4 className="text-xl">{title}</h4>
          <p className="text-md mt-6">{description}</p>
        </div>
      )}
    </div>
  );
};

export default Description;

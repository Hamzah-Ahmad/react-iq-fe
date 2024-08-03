import { useQuery } from "@tanstack/react-query";
import useQuestionsService from "domains/question/services/question.services";

const useQuestionQueries = () => {
  const { getAllQuestions, getQuestionById } = useQuestionsService();

  const useGetAllQuestions = (isLoggedIn?: boolean) => {
    return useQuery({
      queryKey: ["questions", isLoggedIn],
      queryFn: () => getAllQuestions(),
      refetchOnWindowFocus: false,
    });
  };
  const useGetQuestionById = (questionId: string) => {
    return useQuery({
      queryKey: ["question", questionId],
      queryFn: () => getQuestionById(questionId),
      refetchOnWindowFocus: false,
    });
  };

  return { useGetAllQuestions, useGetQuestionById };
};

export default useQuestionQueries;

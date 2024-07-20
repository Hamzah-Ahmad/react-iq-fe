// src/domains/user/queries/useUserQueries.js
import { useQuery } from "@tanstack/react-query";
import useQuestionService from "../services/question.service";

const useQuestionsQuery = () => {
  //   const queryClient = useQueryClient();
  const { getQuestions } = useQuestionService();

  const useGetQuestions = () => {
    return useQuery({
      queryKey: ["posts"],
      queryFn: getQuestions,
    });
  };

  return { useGetQuestions };
};

export default useQuestionsQuery;

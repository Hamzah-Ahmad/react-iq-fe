import { useQuery } from "@tanstack/react-query";
import useQuestionsService from "../services/question.services";

const useQuestionQueries = () => {
  const { getAllQuestions } = useQuestionsService();

  const useGetAllQuestions = (isLoggedIn?:boolean) => {
    return useQuery({
      queryKey: ["questions", isLoggedIn],
      queryFn: () => getAllQuestions(),
    });
  };

  return { useGetAllQuestions };
};

export default useQuestionQueries;

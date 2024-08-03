import useAxiosPrivate from "../../../shared/hooks/useAxiosPrivate";
import { QuestionWithUserSubmission } from "../types";

const useQuestionsService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getAllQuestions = async (): Promise<QuestionWithUserSubmission[]> => {
    const response = await axiosPrivate.get(`/question`);
    return response.data;
  };

  // const getSubmission = async (id: string) => {
  //   const response = await axiosPrivate.get(`/post/${id}`);
  //   return response.data;
  // };

  //   const createSubmission = async (data: any) => {
  //     const response = await axiosPrivate.post(`/submission/${data.questionId}`, {
  //       code: data.code,
  //     });
  //     return response.data;
  //   };

  //   return { getPosts, getPostById, createPost };
  return { getAllQuestions };
};

export default useQuestionsService;

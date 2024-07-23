import useAxiosPrivate from "../../../shared/hooks/useAxiosPrivate";
import { CreateSubmissionDto } from "../types";

const useSubmissionService = () => {
  const axiosPrivate = useAxiosPrivate();

    const getUserSubmission = async (questionId: string) => {
      const response = await axiosPrivate.get(`/submission/user/${questionId}`);
      return response.data;
    };

    // const getSubmission = async (id: string) => {
    //   const response = await axiosPrivate.get(`/post/${id}`);
    //   return response.data;
    // };

  const createSubmission = async (data: CreateSubmissionDto) => {
    const response = await axiosPrivate.post(`/submission/${data.questionId}`, {
      code: data.code,
    });
    return response.data;
  };

  //   return { getPosts, getPostById, createPost };
  return { createSubmission, getUserSubmission };
};

export default useSubmissionService;

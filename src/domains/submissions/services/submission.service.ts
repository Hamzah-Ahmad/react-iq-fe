import useAxiosPrivate from "shared/hooks/useAxiosPrivate";
import { CreateSubmissionDto } from "../types";

const useSubmissionService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getUserSubmission = async (questionId: string) => {
    const response = await axiosPrivate.get(`/submission/user/${questionId}`);
    return response.data;
  };

  const getAllSubmissions = async (questionId: string) => {
    const response = await axiosPrivate.get(`/submission/${questionId}`);
    return response.data;
  };
  const createSubmission = async (data: CreateSubmissionDto) => {
    const response = await axiosPrivate.post(`/submission/${data.questionId}`, {
      code: data.code,
    });
    return response.data;
  };

  const updateLikeOnSubmission = async (submissionId: string) => {
    const response = await axiosPrivate.post(
      `/submission/${submissionId}/like`
    );
    return response.data;
  };

  const getSubmissionById = async (submissionId: string) => {
    const response = await axiosPrivate.get(`/submission/byId/${submissionId}`);
    return response.data;
  };

  return {
    createSubmission,
    getAllSubmissions,
    getUserSubmission,
    updateLikeOnSubmission,
    getSubmissionById,
  };
};

export default useSubmissionService;

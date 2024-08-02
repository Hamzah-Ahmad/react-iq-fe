import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useSubmissionService from "../../submissions/services/submission.services";
import { CreateSubmissionDto, Submission, SubmissionWithLikes } from "../types";

const useSubmissionQueries = () => {
  const queryClient = useQueryClient();
  const { createSubmission, getAllSubmissions, getUserSubmission } =
    useSubmissionService();

  const useCreateSubmission = () => {
    return useMutation({
      mutationFn: (variables: CreateSubmissionDto) =>
        createSubmission({
          code: variables.code,
          questionId: variables.questionId,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error: any) => {
        console.log("Error: ", error);
      },
    });
  };

  const useGetUserSubmission = (
    questionId: string,
    enabled: boolean = false
  ) => {
    return useQuery<Submission>({
      queryKey: ["user_submission", questionId],
      queryFn: () => getUserSubmission(questionId),
      enabled: enabled,
    });
  };

  const useGetAllSubmissions = (
    questionId: string,
    enabled: boolean = false
  ) => {
    return useQuery<SubmissionWithLikes[]>({
      queryKey: ["submissions", questionId],
      queryFn: () => getAllSubmissions(questionId),
      enabled: enabled,
    });
  };

  return { useCreateSubmission, useGetAllSubmissions, useGetUserSubmission };
};

export default useSubmissionQueries;

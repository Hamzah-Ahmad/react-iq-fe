import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useSubmissionService from "../services/submission.services";
import { CreateSubmissionDto } from "../types";

const useSubmissionQueries = () => {
  const queryClient = useQueryClient();
  const { createSubmission, getUserSubmission } = useSubmissionService();

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

  const useGetUserSubmission = (questionId: string, enabled: boolean = false) => {
    return useQuery({
      queryKey: ["user_submission", questionId],
      queryFn: () => getUserSubmission(questionId),
      enabled: enabled
    });
  };

  return { useCreateSubmission, useGetUserSubmission };
};

export default useSubmissionQueries;

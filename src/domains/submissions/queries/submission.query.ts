import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useSubmissionService from "../services/submission.service";
import {
  CreateSubmissionDto,
  Submission,
  SubmissionWithLikesAndCommentCount,
  UpdateLikeDto,
} from "../types";

const useSubmissionQueries = () => {
  const queryClient = useQueryClient();
  const {
    createSubmission,
    getAllSubmissions,
    getUserSubmission,
    getSubmissionById,
    updateLikeOnSubmission,
  } = useSubmissionService();

  const useCreateSubmission = () => {
    return useMutation({
      mutationFn: (variables: CreateSubmissionDto) =>
        createSubmission({
          code: variables.code,
          questionId: variables.questionId,
        }),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["submissions", variables.questionId],
        });
        // invalidting query for sidebar (to add a checkmark inidacting that a solution has been submitted)
        queryClient.invalidateQueries({
          queryKey: ["questions", true],
        });
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
      refetchOnWindowFocus: false,
    });
  };

  const useGetAllSubmissions = (
    questionId: string,
    enabled: boolean = false
  ) => {
    return useQuery<SubmissionWithLikesAndCommentCount[]>({
      queryKey: ["submissions", questionId],
      queryFn: () => getAllSubmissions(questionId),
      enabled: enabled,
      refetchOnWindowFocus: false,
    });
  };

  const useGetSubmissionById = (
    submissionId: string,
    enabled: boolean = false
  ) => {
    return useQuery<Submission>({
      queryKey: ["submission", submissionId],
      queryFn: () => getSubmissionById(submissionId),
      enabled: enabled,
      refetchOnWindowFocus: false,
    });
  };

  const useUpdateLikeOnSubmission = () => {
    return useMutation({
      mutationFn: (
        variables: UpdateLikeDto & { questionId: string; userId: string }
      ) => updateLikeOnSubmission(variables.submissionId),

      onMutate: async (variables) => {
        const queryKey = ["submissions", variables.questionId];
        await queryClient.cancelQueries({
          queryKey: queryKey,
        });

        let previousData =
          queryClient.getQueryData<SubmissionWithLikesAndCommentCount[]>(
            queryKey
          );

        if (previousData) {
          previousData = previousData.map((submission) => {
            if (submission.id !== variables.submissionId) return submission;
            let likes = submission.likes;

            if (likes.includes(variables.userId)) {
              // likes is referencing submission.likes. The statement below will change that so that it refers to a new array.
              // likes = likes.filter(
              //   (userLiked) => userLiked.id !== variables.userId
              // );
              submission.likes = likes.filter(
                (userId) => userId !== variables.userId
              );
            } else {
              likes.push(variables.userId);
            }
            return submission;
          });
        }
        queryClient.setQueryData(queryKey, previousData);
        return { previousData };
      },
      onError: (err, variables, context) => {
        queryClient.setQueryData(
          ["submissions", variables.questionId],
          context?.previousData
        );
        console.log(err);
      },
      onSettled: (_, __, variables) => {
        // queryClient.invalidateQueries({
        //   queryKey: ["submissions", variables.questionId],
        // });
      },
    });
  };

  return {
    useCreateSubmission,
    useGetAllSubmissions,
    useGetUserSubmission,
    useGetSubmissionById,
    useUpdateLikeOnSubmission,
  };
};

export default useSubmissionQueries;

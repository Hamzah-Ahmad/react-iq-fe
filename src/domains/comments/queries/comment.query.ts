// src/domains/user/queries/useUserQueries.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useCommentService from "../services/comment.service";
import { Comment } from "../types";
import useLazyQuery from "shared/hooks/useLazyQuery";

const useCommentQueries = () => {
  const queryClient = useQueryClient();
  const {
    getCommentsByParentId,
    getCommentsBySubmisison,
    updateComment,
    deleteComment,
    createComment,
    replyToComment,
  } = useCommentService();

  // React Query does not provide a native useLazyQuery function. So the initial idea was to set enable to false for this query, and call the refetch function to manualy call the API.
  // A better solution was to implement a custom useLaxyQuery hook
  const useGetReplies = (parentCommentId: string) => {
    return useLazyQuery<Comment[]>(
      () => getCommentsByParentId(parentCommentId),
      ["comments", "replies", parentCommentId]
    );
  };

  const useGetCommentsBySubmissions = (
    submissionId: string,
    enabled: boolean
  ) => {
    return useQuery<Comment[]>({
      queryKey: ["comments", "submission", submissionId],
      queryFn: () => getCommentsBySubmisison(submissionId),
      enabled: enabled,
    });
  };

  const useUpdateComment = (successCb?: () => void) => {
    return useMutation({
      mutationFn: (variables: any) =>
        updateComment(variables.commentText, variables.commentId),
      onSuccess: (data, variables) => {
        if (successCb) successCb();
        queryClient.setQueryData(
          [
            "comments",
            variables.isReply ? "replies" : "submission",
            variables.rootId,
          ],
          (data: any) => {
            console.log("data ==> ", data);
            return data.map((comment: any) => {
              if (comment.id === variables.commentId) {
                return { ...comment, commentText: variables.commentText };
              } else return comment;
            });
          }
        );
      },
      onError: (error: any) => {
        console.log("Error: ", error);
      },
    });
  };

  const useReplyToComment = () => {
    return useMutation({
      mutationFn: (variables: any) =>
        replyToComment(variables.commentText, variables.rootId),
      onSuccess: (_, variables) => {
        // queryClient.setQueryData(
        //   [variables.isReply ? "replies" : "submission", variables.rootId],
        //   (data: any) => {
        //     return data.filter((comment: any) => {
        //       if (comment.id === variables.commentId) return false;
        //       return true;
        //     });
        //   }
        // );
      },
      onError: (error: any) => {
        console.log("Error: ", error);
      },
    });
  };

  const useDeleteComment = () => {
    return useMutation({
      mutationFn: (variables: any) => deleteComment(variables.commentId),
      onSuccess: (_, variables) => {
        queryClient.setQueryData(
          [
            "comments",
            variables.isReply ? "replies" : "submission",
            variables.rootId,
          ],
          (data: any) => {
            return data.filter((comment: any) => {
              if (comment.id === variables.commentId) return false;
              return true;
            });
          }
        );
      },
      onError: (error: any) => {
        console.log("Error: ", error);
      },
    });
  };

  const useCreateComment = (successCb?: () => void) => {
    return useMutation({
      mutationFn: (variables: any) =>
        createComment(variables.submissionId, variables.commentText),
      onSuccess: (data, variables) => {
        // The following only works for root comments, not replies
        if (successCb) successCb();
        queryClient.setQueryData(
          [variables.isReply ? "replies" : "submission", variables.rootId],
          (data: any) => {
            if (variables.isReply) {
              return data.map((comment: any) => {
                if (comment.id === variables.commentId) {
                  return { ...comment, commentText: variables.commentText };
                } else return comment;
              });
            } else {
              return {
                ...data,
                comments: data.comments?.map((comment: any) => {
                  if (comment.id === variables.commentId) {
                    return { ...comment, commentText: variables.commentText };
                  } else return comment;
                }),
              };
            }
          }
        );
      },
      onError: (error: any) => {
        console.log("Error: ", error);
      },
    });
  };

  return {
    useGetReplies,
    useUpdateComment,
    useDeleteComment,
    useCreateComment,
    useReplyToComment,
    useGetCommentsBySubmissions,
  };
};

export default useCommentQueries;

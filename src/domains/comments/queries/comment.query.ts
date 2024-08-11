// src/domains/user/queries/useUserQueries.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useCommentService from "../services/comment.service";
import { CommentWithAuthor } from "../types";
import useLazyQuery from "shared/hooks/useLazyQuery";
import { useAuth } from "domains/auth/hooks/useAuth";

const useCommentQueries = () => {
  const queryClient = useQueryClient();
  const { auth } = useAuth();
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
    return useLazyQuery<CommentWithAuthor[]>(
      () => getCommentsByParentId(parentCommentId),
      ["comments", parentCommentId]
    );
  };

  const useGetCommentsBySubmissions = (
    submissionId: string,
    enabled: boolean
  ) => {
    return useQuery<CommentWithAuthor[]>({
      queryKey: ["comments", submissionId],
      queryFn: () => getCommentsBySubmisison(submissionId),
      enabled: enabled,
    });
  };

  const useUpdateComment = (successCb?: () => void) => {
    return useMutation({
      mutationFn: (variables: {
        commentText: string;
        commentId: string;
        rootId: string;
      }) => updateComment(variables.commentText, variables.commentId),
      onSuccess: (data, variables) => {
        if (successCb) successCb();
        queryClient.setQueryData(
          ["comments", variables.rootId],
          (currData: CommentWithAuthor[]) => {
            return currData.map((comment) => {
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

  const useReplyToComment = (successCb?: () => void) => {
    return useMutation({
      mutationFn: (variables: { commentText: string; rootId: string }) =>
        replyToComment(variables.commentText, variables.rootId),
      onSuccess: (data, variables) => {
        if (successCb) successCb();
        queryClient.setQueryData(
          ["comments", variables.rootId],
          (currData: CommentWithAuthor[]) => {
            if (currData) {
              return [{ ...data, author: auth?.user }, ...currData];
            } else {
              return [{ ...data, author: auth?.user }];
            }
          }
        );
      },
      onError: (error: any) => {
        console.log("Error: ", error);
      },
    });
  };

  const useDeleteComment = () => {
    return useMutation({
      mutationFn: (variables: { commentId: string; rootId: string }) =>
        deleteComment(variables.commentId),
      onSuccess: (_, variables) => {
        queryClient.setQueryData(
          ["comments", variables.rootId],
          (currData: CommentWithAuthor[]) => {
            return currData.filter((comment) => {
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
      mutationFn: (variables: { submissionId: string; commentText: string }) =>
        createComment(variables.submissionId, variables.commentText),
      onSuccess: (data, variables) => {
        if (successCb) successCb();
        queryClient.setQueryData(
          ["comments", variables.submissionId],
          (currData: CommentWithAuthor[]) => {
            if (currData) {
              return [{ ...data, author: auth?.user }, ...currData];
            } else {
              return [{ ...data, author: auth?.user }];
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

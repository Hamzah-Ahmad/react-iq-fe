// src/domains/user/queries/useUserQueries.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useCommentService from "../services/comment.service";

const useCommentQueries = () => {
  const queryClient = useQueryClient();
  const { getCommentsByParentId, updateComment, deleteComment, createComment } =
    useCommentService();

  const useGetReplies = (parentCommentId: string) => {
    return useQuery({
      queryKey: ["replies", parentCommentId],
      queryFn: () => getCommentsByParentId(parentCommentId),
      enabled: false,
    });
  };

  const useUpdateComment = (successCb?: () => void) => {
    return useMutation({
      mutationFn: (variables: any) =>
        updateComment(variables.commentText, variables.commentId),
      onSuccess: (data, variables) => {
        // The following only works for root comments, not replies
        if (successCb) successCb();
        queryClient.setQueryData(
          [variables.isReply ? "replies" : "post", variables.rootId],
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

  const useDeleteComment = () => {
    return useMutation({
      mutationFn: (variables: any) => deleteComment(variables.commentId),
      onSuccess: (_, variables) => {
        // The following only works for root comments, not replies
        queryClient.setQueryData(
          [variables.isReply ? "replies" : "post", variables.rootId],
          (data: any) => {
            if (variables.isReply) {
              return data.filter((comment: any) => {
                if (comment.id === variables.commentId) return false;
                return true;
              });
            } else {
              return {
                ...data,
                comments: data.comments?.filter((comment: any) => {
                  if (comment.id === variables.commentId) return false;
                  return true;
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

  const useCreateComment = (successCb?: () => void) => {
    return useMutation({
      mutationFn: (variables: any) =>
        createComment(variables.postId, variables.commentText),
      onSuccess: (data, variables) => {
        // The following only works for root comments, not replies
        if (successCb) successCb();
        queryClient.setQueryData(
          [variables.isReply ? "replies" : "post", variables.rootId],
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

  return { useGetReplies, useUpdateComment, useDeleteComment, useCreateComment };
};

export default useCommentQueries;

import useAxiosPrivate from "shared/hooks/useAxiosPrivate";

const useCommentService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getCommentsBySubmisison = async (submissionId: string) => {
    const response = await axiosPrivate.get(
      `/comment/submission/${submissionId}`
    );
    return response.data;
  };

  const getCommentsByParentId = async (parentCommentId: string) => {
    const response = await axiosPrivate.get(
      `/comment/reply/${parentCommentId}`
    );
    return response.data;
  };

  const updateComment = async (commentText: string, commentId: string) => {
    const response = await axiosPrivate.put(`/comment/${commentId}`, {
      commentText,
    });
    return response.data;
  };

  const deleteComment = async (commentId: string) => {
    const response = await axiosPrivate.delete(`/comment/${commentId}`);
    return response.data;
  };

  const createComment = async (submissionId: string, commentText: string) => {
    const response = await axiosPrivate.post(`/comment/${submissionId}`, {
      commentText,
    });
    return response.data;
  };

  const replyToComment = async (replyBody: string, parentId: string) => {
    const response = await axiosPrivate.post(`/comment/reply/${parentId}`, {
      commentText: replyBody,
    });
    return response.data;
  };
  return {
    getCommentsByParentId,
    getCommentsBySubmisison,
    updateComment,
    deleteComment,
    createComment,
    replyToComment,
  };
};

export default useCommentService;

import { useAuth } from "domains/auth/hooks/useAuth";
import useAxiosPrivate from "../../../shared/hooks/useAxiosPrivate";

const useCommentService = () => {
  const axiosPrivate = useAxiosPrivate();
  const auth = useAuth();

  const getCommentsByParentId = async (parentCommentId: string) => {
    console.log("auth ", auth);
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

  const createComment = async (postId: string, commentText: string) => {
    const response = await axiosPrivate.post(`/comment/${postId}`, {
      commentText,
    });
    return response.data;
  };
  return { getCommentsByParentId, updateComment, deleteComment, createComment };
};

export default useCommentService;

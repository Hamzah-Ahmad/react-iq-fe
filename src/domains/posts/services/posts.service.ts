import useAxiosPrivate from "../../../shared/hooks/useAxiosPrivate";
import { PostSchemaType } from "../schema/post.schema";

const usePostService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getPosts = async () => {
    const response = await axiosPrivate.get(`/post`);
    return response.data;
  };

  const getPostById = async (id: string) => {
    const response = await axiosPrivate.get(`/post/${id}`);
    return response.data;
  };

  const createPost = async (data: PostSchemaType) => {
    const response = await axiosPrivate.post(`/post`, data);
    return response.data;
  };

  return { getPosts, getPostById, createPost };
};

export default usePostService;

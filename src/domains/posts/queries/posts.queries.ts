// src/domains/user/queries/useUserQueries.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import usePostService from "../services/posts.service";
import { PostSchemaType } from "../schema/post.schema";

const usePostQueries = () => {
  const queryClient = useQueryClient();
  const { getPosts, createPost } = usePostService();

  const useGetPosts = () => {
    return useQuery<PostSchemaType[]>({
      queryKey: ["posts"],
      queryFn: getPosts,
    });
  };

  const useCreatePost = () => {
    return useMutation({
      mutationFn: (variables: PostSchemaType) =>
        createPost({ title: variables.title, body: variables.body }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error: any) => {
        console.log("Error: ", error);
      },
    });
  };

  return { useGetPosts, useCreatePost };
};

export default usePostQueries;

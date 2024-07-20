import useAxiosPrivate from "../../../shared/hooks/useAxiosPrivate";
// import axios from "shared/config/axios";

const useQuestionService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getQuestions = async () => {
    const response = await axiosPrivate.get(`/question`);
    return response.data;
  };

  const getQuestionById = async (id: string) => {
    const response = await axiosPrivate.get(`/question/${id}`);
    return response.data;
  };

  //   const createPost = async (data: PostSchemaType) => {
  //     const response = await axiosPrivate.post(`/posst`, data);
  //     return response.data;
  //   };

  return { getQuestions, getQuestionById };
};

export default useQuestionService;

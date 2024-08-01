export type Submission = {
    id: string;
    code: string;
    userId: string;
    questionId: string;
    user: {
      name: string,
      id: string
    }
  };

  export type CreateSubmissionDto = {
    code: string;
    questionId: string;
  };
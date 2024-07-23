export type Submission = {
  id: string;
  code: string;
  userId: string;
  questionId: string;
};

export type CreateSubmissionDto = {
  code: string;
  questionId: string;
};

export type Question = {
  description: string;
  hints: string[];
  id: string;
  title: string;
  submissions: Submission[];
};

export type QuestionWithUserSubmission = Omit<Question, "submissions"> & {
  userSubmission: Submission;
};

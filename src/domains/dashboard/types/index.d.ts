export type Submission = {
  id: string;
  code: string;
  userId: string;
  questionId: string;
};

export type CreateSubmissionDto = {
  code: string;
  questionId: string;
}
import { Submission } from "domains/submissions/types";

export type Question = {
  description: string;
  hints: string[];
  id: string;
  title: string;
  submissions: Submission[];
  userSubmission?: Submission;
  asset?: string;
  hints?: string[];
};

export type QuestionWithUserSubmission = Omit<Question, "submissions"> & {
  userSubmission: Submission;
};

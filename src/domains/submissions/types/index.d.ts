import { User } from "domains/auth/types";

export type Submission = {
  id: string;
  code: string;
  userId: string;
  questionId: string;
  user?: {
    name: string;
    id: string;
  };
};

export type SubmissionWithLikesAndCommentCount = Submission & {
  likes: string[];
  commentCount: number;
};

export type CreateSubmissionDto = {
  code: string;
  questionId: string;
};

export type UpdateLikeDto = {
  submissionId: string;
};

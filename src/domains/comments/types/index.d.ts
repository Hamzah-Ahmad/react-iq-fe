// {
//     "id": "84ea6a37-7bac-4dfd-b8e4-82ed309c5d0c",
//     "commentText": "New comment on first submission, by Hamzah",
//     "authorId": "731781dd-c15a-4729-a046-f44b15462ee9",
//     "submissionId": "63991561-8579-448c-8e88-0c9db15576d9",
//     "parentId": null,
//     "createdDate": "2024-08-03T19:21:42.140Z",
//     "updatedDate": "2024-08-03T19:21:42.140Z",
//     "replyCount": 0
// }

export type Comment = {
  id: string;
  commentText: string;
  authorId: string;
  submissionId: string;
  parentId?: string | null;
  createdDate: string;
  updatedDate: string;
  replyCount?: number | null;
};

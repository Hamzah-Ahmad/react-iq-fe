import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "shared/components/ui/accordion";

import { SubmissionWithLikesAndCommentCount } from "../types";
import { LiveEditor, LiveProvider } from "react-live";
import { MessageSquareIcon, StarIcon } from "lucide-react";
import useSubmissionQueries from "../queries/submission.query";
import { useAuth } from "domains/auth/hooks/useAuth";
import { MouseEvent } from "react";
import { cn, updateQueryParams } from "shared/lib/utils";
import { useSearchParams } from "react-router-dom";

const SubmissionCard = ({
  submission,
}: {
  submission: SubmissionWithLikesAndCommentCount;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { useUpdateLikeOnSubmission } = useSubmissionQueries();

  const { mutate } = useUpdateLikeOnSubmission();

  const { auth } = useAuth();

  const updateLike = async (e: MouseEvent<Element>) => {
    e.stopPropagation();
    mutate({
      submissionId: submission.id,
      questionId: submission.questionId,
      userId: auth?.user?.id,
    });
  };

  const viewSubmission = async (e: MouseEvent<Element>) => {
    e.stopPropagation();
    const newParams: Record<string, string> = { submission: submission.id };
    updateQueryParams(searchParams, setSearchParams, newParams)
  };

  return (
    <AccordionItem value={submission.id}>
      <AccordionTrigger className="bg-primary p-2 rounded- hover:no-underline rounded-sm">
        <div className="flex w-11/12 justify-between items-center">
          <p>{submission.user.name}</p>

          <div className="align">
            <div
              role="button"
              tabIndex={0}
              className="px-2"
              onClick={updateLike}
            >
              <StarIcon
                className={cn(
                  "h-5 w-5 hover:fill-slate-400 hover:text-slate-400",
                  submission.likes?.includes(auth?.user?.id)
                    ? "fill-neutral-200"
                    : "fill-transparent"
                )}
              />
            </div>
            <span className="text-sm">{submission.likes?.length}</span>

            <div
              role="button"
              tabIndex={0}
              className="px-2 ml-4"
              onClick={viewSubmission}
            >
              <MessageSquareIcon className={cn("h-5 w-5")} />
            </div>
            <span className="text-sm">{submission.commentCount}</span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <LiveProvider code={submission.code} noInline>
          <LiveEditor className="font-mono editor" />
        </LiveProvider>
      </AccordionContent>
    </AccordionItem>
  );

  // <Card className="p-4">{submission.user?.name}</Card>;
};

export default SubmissionCard;

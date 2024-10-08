import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "shared/components/ui/accordion";

import { SubmissionWithLikesAndCommentCount } from "../types";
import { LiveEditor, LiveProvider } from "react-live";
import { themes } from "prism-react-renderer";
import { MessageSquareIcon, StarIcon } from "lucide-react";
import useSubmissionQueries from "../queries/submission.query";
import { useAuth } from "domains/auth/hooks/useAuth";
import { MouseEvent } from "react";
import { cn, updateQueryParams } from "shared/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";

const SubmissionCard = ({
  submission,
}: {
  submission: SubmissionWithLikesAndCommentCount;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { useUpdateLikeOnSubmission } = useSubmissionQueries();

  const { mutate } = useUpdateLikeOnSubmission();
  const navigate = useNavigate();

  const { auth, isLoggedIn } = useAuth();

  const updateLike = async (e: MouseEvent<Element>) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      mutate({
        submissionId: submission.id,
        questionId: submission.questionId,
        userId: auth?.user?.id,
      });
    }
  };

  const viewSubmission = async (e: MouseEvent<Element>) => {
    e.stopPropagation();
    const newParams: Record<string, string> = { submission: submission.id };
    updateQueryParams(searchParams, setSearchParams, newParams);
  };

  return (
    <AccordionItem value={submission.id}>
      <AccordionTrigger className="bg-accent p-2 border-l-2 border-primary rounded- hover:no-underline ">
        <div className="flex w-11/12 justify-between items-center">
          <p>{submission.user?.name}'s solution</p>

          <div className="align">
            <div
              role="button"
              tabIndex={0}
              className="flex gap-x-2"
              onClick={updateLike}
            >
              <StarIcon
                className={cn(
                  "h-5 w-5 hover:fill-input hover:text-input",
                  submission.likes?.includes(auth?.user?.id)
                    ? "fill-primary text-primary"
                    : "fill-transparent"
                )}
              />
              <span className="text-sm">{submission.likes?.length}</span>
            </div>

            <div
              role="button"
              tabIndex={0}
              className="px-2 ml-4 flex gap-x-2"
              onClick={viewSubmission}
            >
              <MessageSquareIcon className={cn("h-5 w-5")} />
              <span className="text-sm">{submission.commentCount}</span>
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <LiveProvider code={submission.code} noInline>
          <LiveEditor
            className="font-mono editor !rounded-none"
            theme={themes.jettwaveDark}
          />
        </LiveProvider>
      </AccordionContent>
    </AccordionItem>
  );

  // <Card className="p-4">{submission.user?.name}</Card>;
};

export default SubmissionCard;

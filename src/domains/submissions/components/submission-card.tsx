import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "shared/components/ui/accordion";

import { SubmissionWithLikes } from "../types";
import { LiveEditor, LiveProvider } from "react-live";
import { StarIcon } from "lucide-react";
import useSubmissionQueries from "../queries/submission.query";
import { useAuth } from "domains/auth/hooks/useAuth";
import { MouseEvent } from "react";
import { cn } from "shared/lib/utils";

const SubmissionCard = ({
  submission,
}: {
  submission: SubmissionWithLikes;
}) => {
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
  return (
    <AccordionItem value={submission.id}>
      <AccordionTrigger className="bg-primary p-2 rounded- hover:no-underline rounded-sm">
        <div className="flex w-4/5 justify-between items-center">
          <p>{submission.user.name}</p>

          <div className="flex items-center">
            <span className="text-sm">{submission.likes?.length}</span>
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

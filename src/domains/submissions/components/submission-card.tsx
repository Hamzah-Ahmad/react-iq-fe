import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "shared/components/ui/accordion";

import { SubmissionWithLikes } from "../types";
import { LiveEditor, LiveProvider } from "react-live";
import { Button } from "shared/components/ui/button";
import { StarIcon } from "lucide-react";

const SubmissionCard = ({
  submission,
}: {
  submission: SubmissionWithLikes;
}) => {
  return (
    <AccordionItem value={submission.id}>
      <AccordionTrigger className="bg-primary p-2 rounded- hover:no-underline">
        <div className="flex w-4/5 justify-between items-center">
          <p>{submission.user.name}</p>

          <div className="flex items-center">
            <span className="text-sm">{submission.likes?.length}</span>
            <Button size="icon">
                <StarIcon className="h-5 w-5 hover:fill-orange-300 hover:text-orange-300" />
            </Button>
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

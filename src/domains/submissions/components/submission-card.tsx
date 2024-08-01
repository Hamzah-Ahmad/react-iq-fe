import { Card } from "shared/components/ui/card";
import { Submission } from "../types";

const SubmissionCard = ({ submission }: { submission: Submission }) => {
  return <Card className="p-4">{submission.user?.name}</Card>;
};

export default SubmissionCard;

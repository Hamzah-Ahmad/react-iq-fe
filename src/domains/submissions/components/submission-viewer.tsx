import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useSearchParams } from "react-router-dom";
import SubmissionContent from "./submission-content";

const SubmissionSidebar = () => {
  const [searchParams] = useSearchParams();
  const submissionId = searchParams.get("submission");
  const shouldOpen = !!submissionId;

  return (
    <Drawer
      open={!!shouldOpen}
      direction="right"
      className="!bg-card !w-4/5 py-8"
    >
      <SubmissionContent submissionId={submissionId} />
    </Drawer>
  );
};

export default SubmissionSidebar;

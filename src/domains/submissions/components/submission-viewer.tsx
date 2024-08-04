import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useSearchParams } from "react-router-dom";
import SubmissionContent from "./submission-content";
import { removeQueryParam } from "shared/lib/utils";

const SubmissionSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const submissionId = searchParams.get("submission");
  const shouldOpen = !!submissionId;

  function closeViewer() {
    removeQueryParam(searchParams, setSearchParams, "submission");
  }
  return (
    <Drawer
      open={!!shouldOpen}
      onClose={closeViewer}
      direction="right"
      className="!bg-card !w-4/5 py-8"
    >
      <SubmissionContent submissionId={submissionId} />
    </Drawer>
  );
};

export default SubmissionSidebar;

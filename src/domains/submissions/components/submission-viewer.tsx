import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useSearchParams } from "react-router-dom";

const SubmissionViewer = () => {
  const [searchParams] = useSearchParams();
  const viewSearchParam = searchParams.get("view");
  const questionId = searchParams.get("questionId");
  const shouldOpen = !!questionId && viewSearchParam === "true";

  return (
    <Drawer open={shouldOpen} direction="right" className="!bg-card !w-96 py-8">
      <h4 className="text-xl pl-8 mb-8">Questions</h4>
    </Drawer>
  );
};

export default SubmissionViewer;

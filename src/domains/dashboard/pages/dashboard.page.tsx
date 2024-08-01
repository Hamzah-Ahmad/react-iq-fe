import { useState } from "react";
import { themes } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LivePreview } from "react-live";

import { useAuth } from "domains/auth/hooks/useAuth";
import Sidebar from "../components/sidebar";
import Description from "../components/description-section";
import useSubmissionQueries from "domains/submissions/queries/submission.query";

const DEFAULT_CODE = `
// Placeholder code for reference
type Props = {
  label: string;
}
const Counter = (props: Props) => {
  const [count, setCount] =
    React.useState<number>(0)
  return (
    <div>
      <h3>
        {props.label}: {count}
      </h3>
      <button
        onClick={() =>
          setCount(c => c + 1)
        }>
        Increment
      </button>
    </div>
  )
}
// Important! Use the render function to render your components
render(<Counter label="Counter" />)    
`;
const QUESTION_ID_PLACEHOLDER = "24ba8f8c-40b1-46ee-9330-445498069666";
const Dashboard = () => {
  const { auth } = useAuth();
  const [code, setCode] = useState(DEFAULT_CODE);
  const { useCreateSubmission, useGetUserSubmission } = useSubmissionQueries();
  const { mutate: createSubmission } = useCreateSubmission();
  const { data: userSubmissionData } = useGetUserSubmission(
    QUESTION_ID_PLACEHOLDER,
    !!auth?.accessToken
  );

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <button onClick={toggleDrawer}>Open</button>
      <Sidebar isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <div className="px-2 py-8">
        <LiveProvider code={userSubmissionData?.code || code} noInline>
          <div className="grid grid-cols-3 gap-4 dashboard">
            <Description />

            <LiveEditor
              className="font-mono editor"
              theme={themes.duotoneDark}
              onChange={setCode}
            />
            <LivePreview className="bg-foreground preview" />
          </div>
        </LiveProvider>

        <button
          onClick={() =>
            createSubmission({
              code: code,
              questionId: QUESTION_ID_PLACEHOLDER,
            })
          }
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Dashboard;

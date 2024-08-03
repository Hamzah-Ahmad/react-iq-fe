import { useEffect, useState } from "react";
import { themes } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LivePreview } from "react-live";

import { useAuth } from "domains/auth/hooks/useAuth";
import Description from "domains/question/components/description-section";
import useSubmissionQueries from "domains/submissions/queries/submission.query";
import { useSearchParams } from "react-router-dom";

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
const Workspace = () => {
  const { auth } = useAuth();
  const [searchParams] = useSearchParams();

  const questionId = searchParams.get("questionId") || "";
  const [code, setCode] = useState(DEFAULT_CODE);
  const { useCreateSubmission, useGetUserSubmission } = useSubmissionQueries();
  const { mutate: createSubmission } = useCreateSubmission();
  const { data: userSubmissionData } = useGetUserSubmission(
    questionId,
    !!auth?.accessToken
  );

  const userCode = userSubmissionData?.code;
  useEffect(() => {
    if (userCode) {
      setCode(userCode);
    }
  }, [userCode]);

  return (
    <div className="px-2 py-8">
      <LiveProvider code={userSubmissionData?.code || code} noInline>
        <div className="grid grid-cols-3 gap-4 homepage">
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
            questionId: questionId,
          })
        }
      >
        Submit
      </button>
    </div>
  );
};

export default Workspace;

import { useEffect, useState } from "react";
import { themes } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";

import { useAuth } from "domains/auth/hooks/useAuth";
import Description from "domains/question/components/description-section";
import useSubmissionQueries from "domains/submissions/queries/submission.query";
import { useSearchParams } from "react-router-dom";
import { Button } from "shared/components/ui/button";

const DEFAULT_CODE = `
// Placeholder code for reference
const Counter = (props: Props) => {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
    return (
    <div style={styles.container}>
      <h1>
        React playground powered by
        <a
          style={styles.link}
          href="https://commerce.nearform.com/open-source/react-live/"
        >
          React Live
        </a>
      </h1>
      <div style={styles.buttonRow}>
        <button style={styles.btn} onClick={decrement}>-</button>
        <span>Count {count} </span>
        <button style={styles.btn} onClick={increment}>+</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column", 
    alignItems: "center",
    justifyContent: "center",
    color: "#232E3E",
    height: "100%"
  },
  link : {
    color: "#F59314",
    marginLeft: "8px"
  },
  buttonRow: {
    display: "flex",
    columnGap: "12px",
    marginTop: "24px"
  },
  btn: {
    width: "40px",
    color: "#ffffff",
    background: "#F59314"
  }
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
  const { mutate: createSubmission, isPending: isPendingCreateSubmssion } =
    useCreateSubmission();
  const { data: userSubmissionData } = useGetUserSubmission(
    questionId,
    !!auth?.accessToken && !!questionId
  );

  function submitCode() {
    createSubmission({
      code: code,
      questionId: questionId,
    });
  }
  const userCode = userSubmissionData?.code;
  useEffect(() => {
    if (userCode) {
      setCode(userCode);
    }
  }, [userCode]);

  return (
    <div className="px-4">
      <LiveProvider code={code} noInline>
        <div className="grid grid-flow-col auto-cols-[minmax(490px,1fr)] gap-4 overflow-x-auto workspace custom-scroll">
          <Description />
          <LiveEditor
            className="font-mono editor"
            theme={themes.vsDark}
            // theme={themes.jettwaveDark}
            // theme={themes.nightOwl}
            onChange={setCode}
          />

          <div className="flex flex-col gap-y-1">
            <LiveError className="rounded-lg bg-red-400 p-2 text-wrap" />
            <LivePreview className="bg-foreground preview flex-1" />
          </div>
        </div>
      </LiveProvider>
      <div className="grid grid-cols-3 gap-4 homepage">
        <Button
          disabled={isPendingCreateSubmssion}
          onClick={submitCode}
          className="bg-primary w-fit col-start-2 justify-self-end mt-3 text-secondary-foreground"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Workspace;

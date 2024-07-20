import { LiveProvider, LiveEditor, LivePreview } from "react-live";

const Playground = () => {
const code  = 
`type Props = {
label: string;
}
const Counter = (props: Props) => {
  const [count, setCount] =
    React.useState<number>(0)
  return (
    <div>
      <h3 style={{
        background: 'darkslateblue',
        color: 'white',
        padding: 8,
        borderRadius: 4
      }}>
        {props.label}: {count} 🧮
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
render(<Counter label="Counter" />)
`
  return (
    <LiveProvider code={code} noInline>
      <div className="playground">
        <LiveEditor className="editor" />
        <LivePreview className="preview" />
      </div>
    </LiveProvider>
  );
};

export default Playground;

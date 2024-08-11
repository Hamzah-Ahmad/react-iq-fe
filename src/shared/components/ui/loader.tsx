import Skeleton from "react-loading-skeleton";

const Loader = ({
  height,
  className = "",
}: {
  height: string;
  className?: string;
}) => {
  return (
    <Skeleton
      height={height}
      baseColor="#37475A"
      highlightColor="#232E3E"
      borderRadius="8px"
      className={className}
    />
  );
};

export default Loader;

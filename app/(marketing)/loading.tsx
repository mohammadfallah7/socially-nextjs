import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="flex flex-col gap-3 items-center h-56 justify-center">
      <Spinner className="size-5" />
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="font-semibold text-lg tracking-tight">
          Loading page...
        </h2>
        <small>Please wait</small>
      </div>
    </div>
  );
};

export default Loading;

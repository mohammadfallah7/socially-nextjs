import { FC } from "react";

interface IEmptyViewProps {
  title: string;
  description: string;
}

const EmptyView: FC<IEmptyViewProps> = ({ title, description }) => {
  return (
    <div className="bg-primary text-primary-foreground px-3 flex justify-between items-center gap-3 py-2 rounded-md">
      <div>
        <h2 className="text-lg font-medium tracking-tighter">{title}</h2>
        <p className="text-sm tracking-tight">{description}</p>
      </div>
    </div>
  );
};

export default EmptyView;

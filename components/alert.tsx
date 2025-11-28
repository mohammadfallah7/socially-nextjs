import { FC, PropsWithChildren } from "react";

interface IAlertProps extends PropsWithChildren {
  title: string;
  description: string;
}

const Alert: FC<IAlertProps> = ({ title, description, children }) => {
  return (
    <div className="bg-primary rounded-md flex items-center px-4 py-2 justify-between">
      <div className="space-y-1 text-primary-foreground">
        <h2 className="text-lg font-semibold tracking-tighter">{title}</h2>
        <p className="text-sm tracking-tight">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default Alert;

type InformationActionsProps = {
  children: React.ReactNode;
};

const InformationActions: React.FC<InformationActionsProps> = ({ children }) => {
  return <div className="flex gap-3">{children}</div>;
};
export default InformationActions;

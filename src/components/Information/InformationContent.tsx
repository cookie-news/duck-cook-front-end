type InformationContentProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

const InformationContent: React.FC<InformationContentProps> = ({
  title = "Ocorreu um erro ao tentar carregar a página",
  description = "Tente novamente ou entre em contato com o administrador",
  children,
}) => {
  return (
    <>
      <h1 className="font-bold text-lg text-center">{title}</h1>
      <span className="font-thin text-gray-800 text-center">{description}</span>
      {children}
    </>
  );
};

export default InformationContent;

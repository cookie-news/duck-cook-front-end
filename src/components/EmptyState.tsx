import { Information } from "./Information";

const EmptyState: React.FC = () => {
  return (
    <Information.Root>
      <Information.Image src="/assets/emtpystate/emptystate.png" />
      <Information.Content
        title="Parece que não há nada para mostrar"
        description="Recarregue a página ou volte novamente mais tarde"
      />
    </Information.Root>
  );
};

export default EmptyState;

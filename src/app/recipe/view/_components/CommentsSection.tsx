const CommentsSection: React.FC<any> = () => {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-slate-700 font-bold  text-xl">Comentários</h3>
      <div className="flex flex-col gap-6">
        <div className="bg-neutral-default border border-gray-dark rounded-md p-3">
          <span className="font-semibold text-slate-700">Lucas Nascimento | @lucas</span>
          <p className="mt-3 text-gray-800">
            Ficou um bolo maravilhoso, bem fofinho e muito gostoso!!!
            Amei!!!👏👏👏 obrigada ❤️
          </p>
        </div>
      </div>
    </div>
  );
};
export default CommentsSection;

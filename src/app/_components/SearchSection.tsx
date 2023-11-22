"use client";

import { Input } from "@components/Input";

import { SearchIcon } from "lucide-react";

const SearchSection: React.FC<any> = () => {
  return (
    <section>
      <Input.Root>
        <Input.Icon icon={SearchIcon} />
        <Input.Textfield
          name="search"
          placeholder="Procure pelo nome ou igrediente da receita desejada"
        />
      </Input.Root>
    </section>
  );
};

export default SearchSection;

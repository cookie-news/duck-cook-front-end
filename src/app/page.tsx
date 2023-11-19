// Mui
import { useCallback, useEffect, useState } from "react";

import Image from "next/image";

import { Search } from "@mui/icons-material";
import { Container, Grid } from "@mui/material";

import { Input } from "@components/Input";
// Components
import PageWrapper from "@components/PageWrapper";
import { Title } from "@components/Title";

import { RecipeService } from "@/data/recipe.service";
import { SearchIcon } from "lucide-react";

function PageRoot() {
  return (
    <PageWrapper isProtected={false} hasMenu>
      <Input.Root>
        <Input.Icon icon={SearchIcon} />
        <Input.Textfield
          name="search"
          placeholder="Procure pelo nome ou igrediente da receita desejada"
        />
      </Input.Root>
    </PageWrapper>
  );
}

export default PageRoot;

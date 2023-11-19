import { Typography, TypographyProps } from "@mui/material";

type TitleProps = TypographyProps;

export function Title(props: TitleProps) {
  return (
    <div className="bg-green-800 w-fit">
      <Typography
        {...props}
        variant="h5"
        className="uppercase font-semibold text-white p-2"
      />
    </div>
  );
}

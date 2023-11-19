'use client'

import React from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

export default function PasswordInput({
	registerInput = (name: string) => { },
	registerParams = {},
	...props
}: any) {
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	}

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	return (

		<TextField
			className={props?.className}
			{...registerInput(props.name, registerParams)}
			variant="outlined"
			fullWidth
			{...props}
			type={showPassword ? "text" : "password"}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
						>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
}

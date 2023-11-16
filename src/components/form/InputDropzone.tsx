'use client'

//React
import { useState } from "react";

//Material UI
import { 
    FormLabel, Typography
} from "@mui/material";
import {
    CloudUploadOutlined as CloudUploadOutlinedIcon
} from "@mui/icons-material";

interface InputDropzoneParams
{
    registerInput: (name:string, params: any) => any,
    name: string,
    files?: FileList
}

const InputDropzone = (props:InputDropzoneParams) => 
{
    const [files, setFiles] = useState<FileList | undefined>(props.files);

    const handleChangeInputDropzoneImages = (event:any) => {
        const newFiles = event.currentTarget.files;
        
        if(newFiles.length > 3) 
        { 
            alert('Número máximo de arquivos é 3.');
            event.currentTarget.value = '';
            setFiles(undefined);
            return;
        }

        setFiles(newFiles);
    }

    return (
        <>
            <FormLabel className="mb-2">Informações da receita:</FormLabel>
            <input
                accept="image/*"
                id="contained-button-file"
                multiple
                style={{display: 'none'}}
                type="file"
                name={props.name}
                {...props.registerInput(props.name, {
                    onChange: handleChangeInputDropzoneImages
                })}
            />
            <label htmlFor="contained-button-file" className="flex flex-1 flex-col justify-center items-center border-2 border-dashed border-gray-400">
                <div>
                    <CloudUploadOutlinedIcon className="hover:cursor-pointer text-9xl" color="info" />
                </div>
                <div>
                    { files && Array.from(files).map((file:File, index: number) => <Typography key={crypto.randomUUID()} color="text.primary" variant="body1">
                        <b>{index+1} - {file?.name}</b>
                    </Typography>)}
                </div>
            </label>
        </>
    )
}

export default InputDropzone;
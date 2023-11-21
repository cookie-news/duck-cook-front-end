'use client'

//React
import { useState } from "react";

import { Upload } from "lucide-react";

interface InputDropzoneProps
{
    register?: any,
    name?: string,
    label?: string,
    files?: FileList
}

const InputDropzone: React.FC<InputDropzoneProps> =  ({
    register,
    name,
    ...props
  }) => 
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
            <h2 className="mb-2 text-gray-600">{props.label}</h2>
            <input
                accept="image/*"
                id="contained-button-file"
                multiple
                style={{display: 'none'}}
                type="file"
                name={name}
                {...(register && register(name, {
                    onChange: handleChangeInputDropzoneImages
                }))}
            />
            <label htmlFor="contained-button-file" className="flex flex-1 flex-col justify-center items-center border-2 border-dashed border-gray-400">
                <div>
                    <Upload className="hover:cursor-pointer text-green-800" size={64} />
                </div>
                <div>
                    { files && Array.from(files).map((file:File, index: number) => <p key={crypto.randomUUID()} color="text.primary" variant="body1">
                        <b>{index+1} - {file?.name}</b>
                    </p>)}
                </div>
            </label>
        </>
    )
}

export default InputDropzone;
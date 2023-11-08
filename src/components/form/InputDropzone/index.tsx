'use client'

import { useState } from "react";

//Material UI
import { InputLabel } from '@mui/material';

//MUI
import { DropzoneArea } from "mui-file-dropzone";

//CSS
import './styles.css';

interface InputDropzoneType
{
    label?:string,
    onChange?: (loadedFiles:File[]) => void,
    acceptedFiles?: Array<string>,
    dropzoneText?:string
}

const InputDropzone = ({label = '',onChange = (loadedFiles:File[]) => {}, acceptedFiles = [], dropzoneText = 'Selecione o arquivo'}:InputDropzoneType) => {
    const [loadedFiles, setLoadedFiles] = useState<File[]>([]);

    const handleChangeDropzone = (loadedFiles:File[]) => {
        setLoadedFiles(loadedFiles);
        
        onChange(loadedFiles);
    }

    return (
        <div>
            <InputLabel color='primary'>{label}</InputLabel>
            <DropzoneArea 
                fileObjects={loadedFiles}
                onChange={handleChangeDropzone} 
                dropzoneClass="dropzone-area-style" 
                dropzoneText={dropzoneText} 
                acceptedFiles={acceptedFiles} 
                getFileLimitExceedMessage={(filesLimit) => `Número máximo de ${filesLimit} arquivos alcançado.`}
                getFileAddedMessage={(fileName) => `Arquivo ${fileName} adicionado.`}
                getFileRemovedMessage={(fileName) => `Arquivo ${fileName} removido.`}
                getDropRejectMessage={(rejectedFile) => `Arquivo ${rejectedFile.name} removido.`}
                showFileNames={true}
                showFileNamesInPreview={true}
            />
        </div>
    );
}

export default InputDropzone;
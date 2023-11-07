'use client'

import { useState } from "react";

//Material UI
import { InputLabel } from '@mui/material';

//MUI
import { DropzoneArea } from "mui-file-dropzone";

//CSS
import './styles.css';

const InputDropzone = ({label = '',onChange = (loadedFiles:any) => {}, acceptedFiles = [], dropzoneText = 'Selecione o arquivo'}) => {
    const [loadedFiles, setLoadedFiles] = useState([]);

    const handleChangeDropzone = (loadedFiles:any) => {
        setLoadedFiles(loadedFiles);
        
        onChange(loadedFiles);
    }

    return (
        <div>
            <InputLabel color='primary'>{label}</InputLabel>
            <DropzoneArea 
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
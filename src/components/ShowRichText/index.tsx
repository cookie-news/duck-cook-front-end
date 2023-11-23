'use client'

import { useEffect, useRef } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import './styles.css';
import parseToHtml from "html-react-parser";

interface ShowRichTextProps
{
    richText: string
}

import './styles.css'

export const ShowRichText:React.FC<ShowRichTextProps> = ({richText}) => {
    const richTextElementRef = useRef<HTMLDivElement>(null);

    /*useEffect(() => {
        if(!richTextElementRef) { return; }

        let divRichText = document.createElement('div');
        divRichText.innerHTML = richText;
        richTextElementRef.current?.attachShadow({ mode: "closed" }).appendChild(divRichText);
    }, []);*/

    return (
        <div className="ShowRichText">
            {document && <ReactQuill
                theme="snow"
                defaultValue={richText}
                readOnly={true}
            />}
        </div>
    );
}
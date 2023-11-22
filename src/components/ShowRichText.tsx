'use client'

import { useEffect, useRef } from "react";

import parseToHtml from "html-react-parser";

interface ShowRichTextProps
{
    richText: string
}

export const ShowRichText:React.FC<ShowRichTextProps> = ({richText}) => {
    const richTextElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!richTextElementRef) { return; }

        let divRichText = document.createElement('div');
        divRichText.innerHTML = richText;
        richTextElementRef.current?.attachShadow({ mode: "closed" }).appendChild(divRichText);
    }, []);

    return <div ref={richTextElementRef}></div>;
}
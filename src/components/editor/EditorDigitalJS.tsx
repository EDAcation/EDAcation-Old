import React, {useEffect, useRef} from 'react';
import {yosys2digitaljs} from 'yosys2digitaljs';
import {Circuit} from 'digitaljs';

import {BaseEditorProps} from './BaseEditor';

export type EditorDigitalJSProps = BaseEditorProps;

export const EditorDigitalJS: React.FC<EditorDigitalJSProps> = ({panelId, file}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const json = JSON.parse(file.content);
        console.log(json);
        const digitalJs = yosys2digitaljs(json);
        console.log(digitalJs);
        const circuit = new Circuit(digitalJs);
        console.log(circuit);
        const paper = circuit.displayOn(ref.current);
        console.log(paper);
    }, [panelId, file.id, file.content]);

    return (
        <div id={`digitaljs-${panelId}-${file.id}`} ref={ref} />
    );
};

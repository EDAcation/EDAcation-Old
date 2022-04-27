import React, {useEffect, useRef, useState} from 'react';
import {yosys2digitaljs} from 'yosys2digitaljs';
import {Circuit} from 'digitaljs';

import {BaseEditorProps} from './BaseEditor';

export type EditorDigitalJSProps = BaseEditorProps;

export const EditorDigitalJS: React.FC<EditorDigitalJSProps> = ({panelId, file}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<Error | null>(null);
    let circuit: Circuit;

    useEffect(() => {
        try {
            const json = JSON.parse(file.content);
            console.log(json);
            const digitalJs = yosys2digitaljs(json);
            console.log(digitalJs);
            circuit = new Circuit(digitalJs);
            console.log(circuit);
            const paper = circuit.displayOn(ref.current);
            console.log(paper);

            setError(null);
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err);
            }
        }
    }, [panelId, file.id, file.content]);

    return (
        <>
            <button onClick={() => circuit?.start()}>Start</button>
            <button onClick={() => circuit?.stop()}>Stop</button>
            <button onClick={() => circuit?.updateGates()}>Step</button>
            <div id={`digitaljs-${panelId}-${file.id}`} ref={ref} />

            {error && (
                <div style={{padding: '0.5rem 1rem'}}>
                    <code>{error.stack || error.toString()}</code>
                </div>
            )}
        </>
    );
};

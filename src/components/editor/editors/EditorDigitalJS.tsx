import React, {useEffect, useRef, useState} from 'react';
import {yosys2digitaljs} from 'yosys2digitaljs';
import {Circuit} from 'digitaljs';

import {BaseEditorProps} from './BaseEditor';

export type EditorDigitalJSProps = BaseEditorProps;

export const EditorDigitalJS: React.FC<EditorDigitalJSProps> = ({panelId, file}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<Error | null>(null);
    const [circuit, setCircuit] = useState<Circuit | null>(null);

    useEffect(() => {
        setError(null);
        setCircuit(null);

        try {
            const json = JSON.parse(file.content);
            const digitalJs = yosys2digitaljs(json);
            const circuit = new Circuit(digitalJs);
            circuit.displayOn(ref.current);

            setCircuit(circuit);
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error('Unknown error.'));
            }
        }
    }, [panelId, file.id, file.content]);

    return (
        <>
            {circuit && (
                <>
                    <button onClick={() => circuit.start()}>Start</button>
                    <button onClick={() => circuit.stop()}>Stop</button>
                    <button onClick={() => circuit.updateGates()}>Step</button>
                </>
            )}

            <div id={`digitaljs-${panelId}-${file.id}`} ref={ref} />

            {error && (
                <div style={{padding: '0.5rem 1rem'}}>
                    <code>{error.stack || error.toString()}</code>
                </div>
            )}
        </>
    );
};

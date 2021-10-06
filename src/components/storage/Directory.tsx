import React, {useState} from 'react';

import {StorageDirectory, StorageEntry, StorageFile} from '../../storage';

import {File} from './File';

export interface DirectoryProps {
    directory: StorageDirectory<unknown, unknown>;
}

export const Directory: React.FC<DirectoryProps> = ({directory}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [entries, setEntries] = useState<StorageEntry<unknown, unknown>[] | undefined>(undefined);

    const handleClick = async () => {
        if (!isOpen) {
            setEntries(await directory.getEntries());
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            <span onClick={handleClick}>{directory.name}</span>

            {isOpen && entries && (
                <ul className="list-style-none">
                    {entries.map((entry) => {
                        let component: JSX.Element;
                        if (entry instanceof StorageDirectory) {
                            component = <Directory directory={entry} />;
                        } else if (entry instanceof StorageFile) {
                            component = <File file={entry} />;
                        } else {
                            throw new Error(`Unknown storage entry type "${entry.type}".`);
                        }

                        return (
                            <li key={entry.name}>{component}</li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};

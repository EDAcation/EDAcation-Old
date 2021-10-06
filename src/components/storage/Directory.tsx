import {Box, StyledOcticon, Text} from '@primer/components';
import {ChevronDownIcon, ChevronRightIcon} from '@primer/octicons-react';
import React, {useMemo, useState} from 'react';

import {StorageDirectory, StorageEntry, StorageFile} from '../../storage';

import {File} from './File';

export interface DirectoryProps {
    directory: StorageDirectory<unknown, unknown>;
}

export const Directory: React.FC<DirectoryProps> = ({directory}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [entries, setEntries] = useState<StorageEntry<unknown, unknown>[] | undefined>(undefined);

    const sortedEntries = useMemo(() => {
        return entries?.sort((a, b) => {
            if (a.type !== b.type) {
                return a.type < b.type ? -1 : 1;
            }
            return a.name < b.name ? -1 : 1;
        });
    }, [entries]);

    const handleClick = async () => {
        if (!isOpen) {
            setEntries(await directory.getEntries());
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Text onClick={handleClick} style={{cursor: 'pointer', userSelect: 'none'}}>
                <StyledOcticon icon={isOpen ? ChevronDownIcon : ChevronRightIcon} mr={1} />
                {directory.name}
            </Text>

            {isOpen && sortedEntries && (
                <Box>
                    {sortedEntries.map((entry) => {
                        let component: JSX.Element;
                        if (entry instanceof StorageDirectory) {
                            component = <Directory directory={entry} />;
                        } else if (entry instanceof StorageFile) {
                            component = <File file={entry} />;
                        } else {
                            throw new Error(`Unknown storage entry type "${entry.type}".`);
                        }

                        return (
                            <Box key={entry.name} pl={3}>{component}</Box>
                        );
                    })}
                </Box>
            )}
        </>
    );
};

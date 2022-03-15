import React from 'react';

export interface RightClickAnchorProps {
    children: React.ReactElement;
    onClick?: React.MouseEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
    childProps?: React.HTMLAttributes<Element>;
}

export const RightClickAnchor: React.FC<RightClickAnchorProps> = React.forwardRef(
    ({children, onClick: onAnchorClick, onKeyDown: onAnchorKeyDown, childProps = {}, ...props}, ref) => {
        const onMouseDown: React.MouseEventHandler = (event) => {
            if (event.button === 0) {
                return;
            }

            if (event.defaultPrevented) {
                return;
            }

            event.button = 0;
            event.buttons = 0;

            if (onAnchorClick) {
                onAnchorClick(event);
            }
        };

        const onKeyDown: React.KeyboardEventHandler = (event) => {
            if (childProps.onKeyDown) {
                childProps.onKeyDown(event);
            }

            if (event.defaultPrevented) {
                return;
            }

            if (onAnchorKeyDown) {
                onAnchorKeyDown(event);
            }
        };

        const onContextMenu: React.MouseEventHandler = (event) => {
            event.preventDefault();
        };

        return React.cloneElement(children, {
            ...props,
            ...childProps,
            ref,
            onMouseDown,
            onKeyDown,
            onContextMenu
        });
    }
);

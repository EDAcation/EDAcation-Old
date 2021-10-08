import {Icon as IconType} from '@primer/octicons-react';
import {COMMON, get, LAYOUT, SystemCommonProps, SystemLayoutProps} from '@primer/components/lib-esm/constants';
import sx, {SxProp} from '@primer/components/lib-esm/sx';
import {ComponentProps} from '@primer/components/lib-esm/utils/types';
import React, {forwardRef} from 'react';
import styled from 'styled-components';

// Based on Primer React's ButtonClose component (https://github.com/primer/react/blob/main/src/Button/ButtonClose.tsx)

type StyledButtonProps = SystemCommonProps & SystemLayoutProps & SxProp;

const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  padding: 0;
  background: transparent;
  outline: none;
  cursor: pointer;
  border-radius: ${get('radii.2')};
  color: ${get('colors.fg.muted')};
  &:focus {
    box-shadow: ${get('shadows.btn.focusShadow')};
  }
  &:hover {
    color: ${get('colors.accent.fg')};
  }
  ${COMMON};
  ${LAYOUT};
  ${sx};
`;

export const ButtonIcon = forwardRef<HTMLButtonElement, ComponentProps<typeof StyledButton> & {icon: IconType}>(({icon: Icon, ...props}, ref) => (
    <StyledButton ref={ref} {...props}>
        <Icon />
    </StyledButton>
));

export type ButtonIconProps = ComponentProps<typeof ButtonIcon>;

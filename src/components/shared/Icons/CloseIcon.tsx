import { FunctionComponent } from 'react';

interface CloseIconProps {
    height?: number;
    width?: number;
}

export const CloseIcon: FunctionComponent<CloseIconProps> = ({ height = 15, width = 15 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 371.23 371.23"
        height={height}
        width={width}>
        <path d="M371.23 21.213 350.018 0 185.615 164.402 21.213 0 0 21.213l164.402 164.402L0 350.018l21.213 21.212 164.402-164.402L350.018 371.23l21.212-21.212-164.402-164.403z" />
    </svg>
);
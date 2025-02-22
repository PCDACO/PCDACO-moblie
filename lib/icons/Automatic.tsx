import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface Props extends SvgProps {
  fill?: string;
}

const Automatic: React.FC<Props> = ({ fill = '#4B5563', ...props }) => (
  <Svg fill="none" {...props}>
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M4.256 3.25a1.94 1.94 0 0 0 0 3.878 1.94 1.94 0 0 0 0-3.878Zm0 1.058a.881.881 0 1 1 0 1.762.881.881 0 0 1 0-1.762Zm0 8.814a1.94 1.94 0 0 0 0 3.878 1.94 1.94 0 0 0 0-3.878Zm0 1.058a.881.881 0 1 1 0 1.762.881.881 0 0 1 0-1.762ZM9.897 3.25a1.94 1.94 0 0 0 0 3.878 1.94 1.94 0 0 0 0-3.878Zm0 1.058a.881.881 0 1 1 0 1.763.881.881 0 0 1 0-1.763Zm0 8.814a1.94 1.94 0 0 0 0 3.878 1.94 1.94 0 0 0 0-3.878Zm0 1.058a.881.881 0 1 1 0 1.762.881.881 0 0 1 0-1.762Zm5.641-10.93a1.94 1.94 0 0 0 0 3.878 1.94 1.94 0 0 0 0-3.878Zm0 1.058a.881.881 0 1 1 0 1.763.881.881 0 0 1 0-1.763Zm0 8.814a1.94 1.94 0 0 0 0 3.878 1.94 1.94 0 0 0 0-3.878Zm0 1.058a.881.881 0 1 1 0 1.761.881.881 0 0 1 0-1.761Z"
      clipRule="evenodd"
    />
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M3.728 6.6v7.05a.529.529 0 1 0 1.057 0V6.6a.529.529 0 0 0-1.057 0Zm5.64 0v7.05a.529.529 0 1 0 1.058 0V6.6a.529.529 0 1 0-1.057 0Z"
      clipRule="evenodd"
    />
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M15.01 6.6v2.82a.176.176 0 0 1-.177.176H4.256a.529.529 0 0 0 0 1.058h10.577a1.234 1.234 0 0 0 1.234-1.234V6.6a.53.53 0 0 0-1.057 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default Automatic;

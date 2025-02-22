import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface Props extends SvgProps {
  fill?: string;
}

const FuelConsumption: React.FC<Props> = ({ fill = '#4B5563', ...props }) => (
  <Svg fill="none" {...props}>
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={22.926}
      d="M7.025 9.521 4.49 13.193l2.356 1.627c.231.16.444.095.572-.091 1.643-2.38 1.486-1.841 1.505-4.725 0-.996-1.27-1.39-1.897-.483Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={22.926}
      d="M2.746 15.358 1 14.152 5.263 7.98c.078-.114.18-.214.303-.295l6.331-4.17c.103-.074.219-.13.34-.165l4.819-1.399.616 2.125-4.66 1.353-1.17.77c-.351 1.311-.239 2.501.07 3.653.224.836-.177 1.278-.663 1.981L8.37 16.002c-.408.59-1.267.777-1.934.352-.889-.565-2.03-1.384-2.897-1.983L1 18.047M11.842 6.2l-1.14-1.731m-4.935 9.587 3.068-4.443m.653-4.695-.436-.662a.76.76 0 0 0-1.05-.216L6.42 5.082a.76.76 0 0 0-.216 1.05l.436.662m10.908-.532c-.341 0-1.452 1.24-1.452 2.195 0 .79.656 1.466 1.452 1.463.796.003 1.452-.673 1.452-1.463 0-.955-1.11-2.195-1.452-2.195Z"
    />
  </Svg>
);
export default FuelConsumption;

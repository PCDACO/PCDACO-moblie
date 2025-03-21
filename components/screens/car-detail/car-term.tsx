import { FunctionComponent } from 'react';
import { View } from 'react-native';
import Markdown from 'react-native-markdown-display';

import FieldLayout from '~/components/layouts/field-layout';

interface CarTermProps {
  term: string;
}

const CarTerm: FunctionComponent<CarTermProps> = ({ term }) => {
  return (
    <FieldLayout label="Điều khoản">
      <View className="gap-2 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
        <Markdown>{term}</Markdown>
      </View>
    </FieldLayout>
  );
};

export default CarTerm;

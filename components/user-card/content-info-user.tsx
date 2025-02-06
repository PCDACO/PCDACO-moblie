import React from 'react';
import { View } from 'react-native';

import TitleWithIcon from '../typography/title-with-icon';

import { Car, Mail, MapPin, Phone } from '~/lib/icons/icon';

interface ContentInfoUserProps {
  phone?: string;
  email?: string;
  address?: string;
  rentalTimes?: number;
}

const ContentInfoUser: React.FC<ContentInfoUserProps> = ({
  phone,
  email,
  address,
  rentalTimes,
}) => {
  return (
    <View className="gap-2">
      {phone && <TitleWithIcon title={phone} icon={Phone} />}
      {email && <TitleWithIcon title={email} icon={Mail} />}
      {address && <TitleWithIcon title={address} icon={MapPin} />}
      {rentalTimes && <TitleWithIcon title={`Đã thuê ${rentalTimes} lần`} icon={Car} />}
    </View>
  );
};

export default ContentInfoUser;

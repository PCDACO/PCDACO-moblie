import React from 'react';
import { View } from 'react-native';

import MenuItem, { MenuItemProps } from '~/components/personal-profile/menu-item';
import { Car, CalendarDays, DollarSign, Star, Shield } from '~/lib/icons/icon';

const MenuList: React.FC = () => {
  const menuItems: MenuItemProps[] = [
    { label: 'Xe của tôi', icon: Car },
    { label: 'Yêu cầu đặt xe', icon: CalendarDays },
    { label: 'Thu nhập & hình thức thanh toán', icon: DollarSign },
    { label: 'Đánh giá', icon: Star },
    { label: 'Chính sách bảo hành & Tài liệu tham khảo', icon: Shield },
  ];

  return (
    <View className="rounded-lg bg-white shadow-sm">
      {menuItems.map((item, index) => (
        <MenuItem key={index} label={item.label} icon={item.icon} />
      ))}
    </View>
  );
};

export default MenuList;

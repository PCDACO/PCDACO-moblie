import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import Description from '../car-editor/description';
import Subtitle from '../car-editor/subtitle';
import ScheduleBadge from '../schedule/schedule-bagde';

import CardBasic from '~/components/plugins/card-basic';
import { InspectionScheduleDetailResponse } from '~/constants/models/schedule.model';
import { DateFormat, formatDateToString } from '~/lib/format';
import { translate } from '~/lib/translate';
import { COLORS } from '~/theme/colors';

interface ScheduleInfoProps {
  address?: InspectionScheduleDetailResponse['address'];
  date?: InspectionScheduleDetailResponse['date'];
  note?: InspectionScheduleDetailResponse['notes'];
  technician?: InspectionScheduleDetailResponse['technician'];
  createdAt?: InspectionScheduleDetailResponse['createdAt'];
  status?: InspectionScheduleDetailResponse['status'];
  type?: InspectionScheduleDetailResponse['type'];
}

const ScheduleInfo: FunctionComponent<ScheduleInfoProps> = ({
  address,
  date,
  note,
  technician,
  createdAt,
  status,
  type,
}) => {
  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? '' : date;
  };

  const formattedCreatedAt = formatDate(createdAt);
  const formattedDate = formatDate(date);

  const translateStatus = translate.schedule.type[type as keyof typeof translate.schedule.type];

  return (
    <CardBasic className="gap-4">
      <View>
        <View className="flex-row items-center justify-between">
          <Subtitle title={`Lịch hẹn ${translateStatus.toLowerCase()} `} />
          <ScheduleBadge statusName={status || 'Chưa có thông tin'} />
        </View>
        <Description
          title={
            formattedCreatedAt
              ? `Được tạo vào ${formatDateToString(formattedCreatedAt, DateFormat.Day)} lúc ${formatDateToString(formattedCreatedAt, DateFormat.Time)}`
              : 'Chưa có thông tin'
          }
        />
      </View>
      <View className="gap-2">
        <InfoItem
          icon={<Feather name="calendar" size={20} color={COLORS.gray} />}
          field="Ngày hẹn"
          subField={
            formattedDate ? formatDateToString(formattedDate, DateFormat.Day) : 'Chưa có thông tin'
          }
        />
        <InfoItem
          icon={<Feather name="map-pin" size={20} color={COLORS.gray} />}
          field="Địa chỉ"
          subField={address || 'Chưa có thông tin'}
        />
        <InfoItem
          icon={<MaterialCommunityIcons name="note-text-outline" size={20} color={COLORS.gray} />}
          field="Ghi chú"
          subField={note || 'Không có ghi chú'}
        />
        <View className="h-0.5 bg-gray-200" />
        <InfoItem
          icon={<Feather name="user" size={20} color={COLORS.gray} />}
          field="Kỹ thuật viên"
          subField={technician?.name || 'Chưa có thông tin'}
        />
      </View>
    </CardBasic>
  );
};

export default ScheduleInfo;

interface InfoItemProps {
  icon?: React.ReactNode;
  field: string;
  subField: string;
}

const InfoItem: FunctionComponent<InfoItemProps> = ({ icon, field, subField }) => {
  return (
    <View className="flex-row items-start gap-2">
      <View>{icon}</View>
      <View className="gap-1">
        <Subtitle title={field} className="text-sm" />
        <Description title={subField} className="text-sm" />
      </View>
    </View>
  );
};

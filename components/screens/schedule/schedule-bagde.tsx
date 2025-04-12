import { Text, View } from 'react-native';

import { ScheduleStatus } from '~/constants/enums';
import { cn } from '~/lib/cn';
import { translate } from '~/lib/translate';

interface BadgeProps {
  statusName: string;
}

const ScheduleBadge = ({ statusName }: BadgeProps) => {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case ScheduleStatus.Pending:
        return {
          container: 'bg-yellow-100',
          text: 'text-yellow-600',
          translate: translate.schedule.status.Pending,
        };
      case ScheduleStatus.Approved:
        return {
          container: 'bg-green-100',
          text: 'text-green-600',
          translate: translate.schedule.status.Approved,
        };
      case ScheduleStatus.Rejected:
        return {
          container: 'bg-red-100',
          text: 'text-red-600',
          translate: translate.schedule.status.Rejected,
        };
      case ScheduleStatus.InProgress:
        return {
          container: 'bg-green-100',
          text: 'text-green-600',
          translate: translate.schedule.status.InProgress,
        };
      case ScheduleStatus.Expired:
        return {
          container: 'bg-red-100',
          text: 'text-red-600',
          translate: translate.schedule.status.Expired,
        };
      case ScheduleStatus.Signed:
        return {
          container: 'bg-green-100',
          text: 'text-green-600',
          translate: translate.schedule.status.Signed,
        };
      default:
        return {
          container: 'bg-gray-100',
          text: 'text-gray-600',
          translate: translate.schedule.status.Pending,
        };
    }
  };

  const classes = getStatusClasses(statusName);

  return (
    <View className={cn('self-start rounded-xl px-2 py-1', classes.container)}>
      <Text className={cn('text-xs font-semibold', classes.text)}>{classes.translate}</Text>
    </View>
  );
};

export default ScheduleBadge;

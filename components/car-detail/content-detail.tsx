import React from 'react';
import { FlatList, Text, View } from 'react-native';

import FeatureItem from './features-item';
import Title from '../typography/title';

import {
  Map,
  Bluetooth,
  Video,
  Camera,
  AlertCircle,
  Sun,
  Circle,
  Monitor,
  Activity,
  AlertTriangle,
  MapPin,
  Usb,
  List,
  Shield,
} from '~/lib/icons/icon';
import StatusDetail from './status-detail';

const ContentDetail = () => {
  const features = [
    { icon: Map, text: 'Bản đồ' },
    { icon: Bluetooth, text: 'Bluetooth' },
    { icon: Video, text: 'Camera hành trình' },
    { icon: Camera, text: 'Camera Lùi' },
    { icon: AlertCircle, text: 'Cảnh báo tốc độ' },
    { icon: Sun, text: 'Cửa sổ trời' },
    { icon: Circle, text: 'Lốp dự phòng' },
    { icon: Monitor, text: 'Màn hình DVD' },
    { icon: Camera, text: 'Camera 360' },
    { icon: Camera, text: 'Camera cập lề' },
    { icon: Activity, text: 'Cảm biến lốp' },
    { icon: AlertTriangle, text: 'Cảm biến va chạm' },
    { icon: MapPin, text: 'Định vị GPS' },
    { icon: Usb, text: 'Khe cắm USB' },
    { icon: List, text: 'ETC' },
    { icon: Shield, text: 'Túi khí an toàn' },
  ];

  return (
    <View className="gap-8 bg-background p-4">
      <View>
        <Title title="Mô tả" />
        <Text>
          - Toyota Camry SE 2025 là mẫu sedan cao cấp 5 chỗ với thiết kế sang trọng, hiện đại, phù
          hợp cho những ai đang tìm kiếm sự thoải mái và đẳng cấp trong mọi hành trình. Xe sở hữu
          động cơ mạnh mẽ, vận hành êm ái cùng hệ thống tiết kiệm nhiên liệu, đảm bảo trải nghiệm
          lái tuyệt vời. Camry SE được trang bị không gian nội thất rộng rãi, ghế ngồi êm ái với
          chất liệu cao cấp, cùng các tiện ích vượt trội như: Máy lạnh hiện đại: Hệ thống điều hòa
          không khí tối ưu, mang lại sự mát mẻ ngay cả trong những ngày nắng nóng. Kết nối Wifi: Phù
          hợp cho nhu cầu làm việc và giải trí khi di chuyển. Khoang hành lý rộng rãi: Dễ dàng chứa
          đồ cho những chuyến đi xa hoặc hành lý cồng kềnh. - Đây là lựa chọn lý tưởng không chỉ cho
          gia đình mà còn cho các doanh nhân hoặc những chuyến công tác yêu cầu sự thoải mái và
          phong cách. Toyota Camry SE không chỉ là phương tiện, mà còn là người bạn đồng hành hoàn
          hảo trên mọi nẻo đường.
        </Text>
      </View>

      <View className="gap-4">
        <Title title="Các tiện nghi khác" />
        <FlatList
          data={features}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <FeatureItem icon={item.icon} text={item.text} />
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <View className="h-4" />}
          numColumns={2}
        />
      </View>
      <View className="gap-4">
        <View>
          <Title title="Điều khoản" />
          <Text className="text-lg">Quy định khác:</Text>
        </View>
        <Text>
          - Sử dụng xe đúng mục đích. - Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.
          - Không sử dụng xe thuê để cầm cố, thế chấp. - Không hút thuốc, nhả kẹo cao su, xả rác
          trong xe. - Không chở hàng quốc cấm dễ cháy nổ. - Không chở hoa quả, thực phẩm nặng mùi
          trong xe. - Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe
          sạch sẽ hoặc gửi phụ thu phí vệ sinh xe. Trân trọng cảm ơn, chúc quý khách hàng có những
          chuyến đi tuyệt vời !
        </Text>
      </View>
      <StatusDetail />
    </View>
  );
};

export default ContentDetail;

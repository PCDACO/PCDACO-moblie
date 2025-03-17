import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '~/assets/svg/logo.svg';
import RegisterAccountForm from '~/components/form/auth-form/register/register-account-form';
import RegisterInfoForm from '~/components/form/auth-form/register/register-info-form';
import ResultRegister from '~/components/form/auth-form/register/result-register';
import { Button } from '~/components/nativewindui/Button';
import { Text as TextUI } from '~/components/nativewindui/Text';
import StepProgress from '~/components/plugins/progress-step';
import { useAuthForm } from '~/hooks/auth/use-auth-form';
import { useStepStore } from '~/store/use-step';
import { COLORS } from '~/theme/colors';

const Register: FunctionComponent = () => {
  const [checked, setChecked] = React.useState(false);
  const { step, prevStep } = useStepStore();
  const { form, onSubmit, isLoading, checkConditionOfEachStep } = useAuthForm({ type: 'register' });

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-between gap-8 px-6 py-8">
        {/* Logo + Tiêu đề */}
        <View>
          <View className="w-60 flex-row items-center gap-2">
            <Logo width={100} height={100} />
            <View className="gap-2">
              <Text className="w-52 text-3xl font-semibold text-foreground">
                Chào mừng đến với FreeDriver!
              </Text>
            </View>
          </View>

          {step === 3 && !isLoading ? (
            <View className="mt-6 w-full flex-col items-center gap-4">
              <ResultRegister />
            </View>
          ) : (
            <>
              <StepProgress currentStep={step} steps={2} />
              {/* Form đăng ký */}
              <View className="mt-6 w-full flex-col items-center gap-4">
                {/* check step */}
                {step === 1 && <RegisterAccountForm form={form} />}
                {step === 2 && <RegisterInfoForm form={form} />}
              </View>
            </>
          )}
        </View>

        {/* Checkbox & Nút đăng ký */}
        {step !== 3 && (
          <View className="flex-col gap-4 ">
            {step === 1 && (
              <>
                <View className="flex-row items-center gap-2">
                  <Checkbox
                    value={checked}
                    onValueChange={() => {
                      setChecked(!checked);
                    }}
                    // disabled={checked}
                    color={COLORS.light.primary}
                  />
                  {/* <Checkbox checked={checked} onCheckedChange={setChecked} disabled={checked} /> */}
                  <Text className="w-80 text-foreground">
                    Tôi đã đọc và đồng ý với{' '}
                    <Link className="text-primary" href="/">
                      Chính sách & quy định
                    </Link>{' '}
                    và{' '}
                    <Link className="text-primary" href="/">
                      Chính sách bảo vệ dữ liệu cá nhân
                    </Link>{' '}
                    của FreeDriver
                  </Text>
                </View>
                <Button
                  onPress={() => {
                    if (!checked) {
                      ToastAndroid.show(
                        'Vui lòng đồng ý với chính sách và quy định của FreeDriver',
                        ToastAndroid.SHORT
                      );
                    } else {
                      checkConditionOfEachStep(step);
                    }
                  }}
                  disabled={isLoading}>
                  <TextUI>Đăng ký</TextUI>
                </Button>
              </>
            )}
            {step === 2 && (
              <View className="flex-row items-center gap-4">
                <Button variant="secondary" onPress={prevStep} size="icon">
                  <Icon name="step-backward" color="black" />
                </Button>
                <Button
                  className="w-[260px] flex-1"
                  onPress={async () => {
                    const isValid = await checkConditionOfEachStep(step);
                    if (isValid) {
                      onSubmit();
                    }
                  }}
                  disabled={isLoading}>
                  <TextUI>{isLoading ? 'Đang xử lý...' : 'Hoàn tất đăng ký'}</TextUI>
                </Button>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Register;

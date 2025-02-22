import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Text, TextInput, View, Platform, TouchableOpacity } from 'react-native';

import { FormKeyboardAvoiding } from '~/components/layout/form-keyboard-avoiding';
import { Button } from '~/components/ui/button';
import { useAuthForm } from '~/hooks/auth/use-auth-form';
import { Lock, Mail, Calendar, User, PhoneCall, MapPin } from '~/lib/icons/icon';

const RegisterScreen = () => {
  const { form, onSubmit, isLoading } = useAuthForm({ type: 'register' });

  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <FormKeyboardAvoiding className="flex-1 justify-center bg-background px-6">
      <Text className="mb-2 text-center text-2xl font-bold">Đăng ký</Text>
      {/* Name Field */}
      <View className="mb-4">
        <Text className="text-sm font-medium">Họ và tên*</Text>
        <View className="mt-1 flex-row items-center rounded-lg border border-muted-foreground px-3 py-2">
          <User size={18} className="text-muted-foreground" />
          <Controller
            control={form.control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nhập họ và tên..."
                className="ml-2 flex-1 text-foreground"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        {form.formState.errors.name && (
          <Text className="text-xs text-destructive">{form.formState.errors.name.message}</Text>
        )}
      </View>

      {/* Email Field */}
      <View className="mb-4">
        <Text className="text-sm font-medium">Email*</Text>
        <View className="mt-1 flex-row items-center rounded-lg border border-muted-foreground px-3 py-2">
          <Mail size={18} className="text-muted-foreground" />
          <Controller
            control={form.control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nhập email..."
                className="ml-2 flex-1 text-foreground"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        {form.formState.errors.email && (
          <Text className="text-xs text-destructive">{form.formState.errors.email.message}</Text>
        )}
      </View>

      {/* Password Field */}
      <View className="mb-4">
        <Text className="text-sm font-medium">Mật khẩu*</Text>
        <View className="mt-1 flex-row items-center rounded-lg border border-muted-foreground px-3 py-2">
          <Lock size={18} className="text-muted-foreground" />
          <Controller
            control={form.control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nhập mật khẩu..."
                className="ml-2 flex-1 text-foreground"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        {form.formState.errors.password && (
          <Text className="text-xs text-destructive">{form.formState.errors.password.message}</Text>
        )}
      </View>

      {/* Phone Field */}
      <View className="mb-4">
        <Text className="text-sm font-medium">Số điện thoại*</Text>
        <View className="mt-1 flex-row items-center rounded-lg border border-muted-foreground px-3 py-2">
          <PhoneCall size={18} className="text-muted-foreground" />
          <Controller
            control={form.control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nhập số điện thoại..."
                className="ml-2 flex-1 text-foreground"
                keyboardType="phone-pad"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        {form.formState.errors.phone && (
          <Text className="text-xs text-destructive">{form.formState.errors.phone.message}</Text>
        )}
      </View>

      {/* Address Field */}
      <View className="mb-4">
        <Text className="text-sm font-medium">Địa chỉ*</Text>
        <View className="mt-1 flex-row items-center rounded-lg border border-muted-foreground px-3 py-2">
          <MapPin size={18} className="text-muted-foreground" />
          <Controller
            control={form.control}
            name="address"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nhập địa chỉ..."
                className="ml-2 flex-1 text-foreground"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        {form.formState.errors.address && (
          <Text className="text-xs text-destructive">{form.formState.errors.address.message}</Text>
        )}
      </View>

      {/* Date of Birth Field */}
      <View className="mb-4">
        <Text className="text-sm font-medium">Ngày sinh*</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View className="mt-1 flex-row items-center rounded-lg border border-muted-foreground px-3 py-2">
            <Calendar size={18} className="text-muted-foreground" />
            <Controller
              control={form.control}
              name="dateOfBirth"
              render={({ field: { onChange, value } }) => (
                <Text className="ml-2 flex-1 text-foreground">
                  {value ? new Date(value).toLocaleDateString() : 'Chọn ngày sinh'}
                </Text>
              )}
            />
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_, date) => {
              setShowDatePicker(false);
              if (date) form.setValue('dateOfBirth', date);
            }}
          />
        )}
      </View>

      {/* Submit Button */}
      <Button className="w-full rounded-lg bg-primary py-3" onPress={onSubmit} disabled={isLoading}>
        <Text className="text-center font-semibold text-background">
          {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
        </Text>
      </Button>

      <View>
        <Text className="mt-4 text-center text-muted-foreground">
          Bạn đã có tài khoản?{' '}
          <Text onPress={() => router.push('/(auth)/login')} className="font-semibold text-primary">
            Đăng nhập
          </Text>
        </Text>
      </View>
    </FormKeyboardAvoiding>
  );
};

export default RegisterScreen;

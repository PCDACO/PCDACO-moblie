import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';

import WithdrawalForm from '~/components/form/with-drawal-form';
import { useWithdrawForm } from '~/hooks/transaction/use-withdraw-form';

const WithdrawScreen: FunctionComponent = () => {
  const { form, onSubmit, isLoading } = useWithdrawForm();
  const { id } = useLocalSearchParams();

  return <WithdrawalForm form={form} onSubmit={onSubmit} isLoading={isLoading} id={id as string} />;
};

export default WithdrawScreen;

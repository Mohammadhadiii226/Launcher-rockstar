import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setAlertUserName } from '../../actions/alertActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAlertUserName } from '../../selectors/alertSelectors';
import { AlertLauncher } from '../AlertLauncher/AlertLauncher';

export const AlertUserName = React.memo(() => {
  const show = useAppSelector(selectAlertUserName);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressCancel = useCallback(async () => {
    dispatch(setAlertUserName(false));
    return navigation.jumpTo('Настройки');
  }, []);

  const onConfirmPressed = useCallback(() => {
    dispatch(setAlertUserName(false));
  }, []);

  return (
    <AlertLauncher
      show={show}
      title="سرنخ"
      useNativeDriver={true}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      message=شما اول باید نام و نام خانوادگی خود را در راکستار وارد کنید"
      showConfirmButton={true}
      confirmText="تنطیمات"
      showCancelButton={true}
      cancelText="بستن"
      onCancelPressed={onConfirmPressed}
      onConfirmPressed={onPressCancel}
    />
  );
});

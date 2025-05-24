import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setAlertProtectionSound } from '../../actions/alertActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAlertSound } from '../../selectors/alertSelectors';
import { AlertLauncher } from '../AlertLauncher/AlertLauncher';

export const AlertSound = React.memo(() => {
  const show = useAppSelector(selectAlertSound);

  const dispatch = useDispatch();

  const onPressCancel = useCallback(async () => {
    try {
      // RNAndroidSettingsTool.ACTION_APPLICATION_DETAILS_SETTINGS(null);
    } catch (error) {}

    dispatch(setAlertProtectionSound(false));
  }, []);

  const onConfirmPressed = useCallback(() => {
    dispatch(setAlertProtectionSound(false));
  }, []);

  return (
    <AlertLauncher
      show={show}
      title:"!مشکل!"
      useNativeDriver={true}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      message="حق استفاده از میکرفون وجود ندارد"
      showConfirmButton={true}
      confirmText="تنظیمات"
      showCancelButton={true}
      cancelText="بستن"
      onConfirmPressed={onPressCancel}
      onCancelPressed={onConfirmPressed}
    />
  );
});

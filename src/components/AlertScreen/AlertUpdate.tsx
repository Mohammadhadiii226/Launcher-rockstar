import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setAlertUpdating } from '../../actions/alertActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAlertUpdate } from '../../selectors/alertSelectors';
import { AlertLauncher } from '../AlertLauncher/AlertLauncher';

export const AlertUpdate = React.memo(() => {
  const show = useAppSelector(selectAlertUpdate);

  const dispatch = useDispatch();

  const onPressCancel = useCallback(async () => {
    dispatch(setAlertUpdating(false));
  }, []);

  const onConfirmPressed = useCallback(() => {
    dispatch(setAlertUpdating(false));
  }, []);

  return (
    <AlertLauncher
      show={show}
      title="توجه"
      useNativeDriver={true}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      message="نسخه جدید کلاینت ویژه راکستار منتشر شد.برای تجربه متفاوت همین الان نسخه جدید رو دانلود کن!"
      showConfirmButton={true}
      confirmText="تازه کردن"
      showCancelButton={true}
      cancelText="بستن"
      onCancelPressed={onConfirmPressed}
      onConfirmPressed={onPressCancel}
    />
  );
});

import React from 'react';
import { Text, View } from 'react-native';
import { InstallSvg } from '../../assets/svg/index';
import { ButtonLauncher, LoaderContainer } from '../../components';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { styles } from '../../styles/LoaderStyle';
import { installLauncher } from '../../thunks/launcherTunks';

export const LauncherUpdateScreen = React.memo(() => {
  const dispatch = useAppDispatch();

  const installHandler = React.useCallback(() => {
    dispatch(installLauncher());
  }, []);

  return (
    <LoaderContainer>
      <Text style={[styles.title, styles.titleUppercase]}>
        بروزرسانی لانچر راکستار
      </Text>
      <Text style={styles.alert}>
        کلیک
        <Text style={styles.accent}> بروزرسانی</Text>, تایید کردن
        {'\n'} بروزرسانی لانچر راکستار.
      </Text>
      <View style={styles.buttons}>
        <ButtonLauncher
          background={'#5476db'}
          btnWidth={'100%'}
          IconLeft={InstallSvg}
          onPress={installHandler}>
          Обновить
        </ButtonLauncher>
      </View>
    </LoaderContainer>
  );
});

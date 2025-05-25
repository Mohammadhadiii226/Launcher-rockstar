import React, { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { ReloadSvg, downloadSvg } from '../../assets/svg/index';
import { ButtonLauncher, LoaderContainer } from '../../components';
import { formatSizeUnits } from '../../helpers';
import { verticalScale } from '../../helpers/demensions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { usePermisionFile } from '../../hooks/usePermisionFile';
import { useSpaceDownlload } from '../../hooks/useSpaceDownload';
import { selectLoaderDownload } from '../../selectors/loaderSelectors';
import { styles } from '../../styles/LoaderStyle';
import { updateLauncher } from '../../thunks/launcherTunks';
const width = Dimensions.get('window').width;

export const LauncherDownloadScreen = React.memo(() => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isFetchDownload, setIsFetchDownload] = useState<boolean>(false);

  const { fetchPermision } = usePermisionFile();
  const { fetchSpace } = useSpaceDownlload();

  const download = useAppSelector(selectLoaderDownload);
  const currentBytes = download.currentBytes || 0;
  const needBytes = download.needBytes || 0;

  const dispatch = useAppDispatch();

  const onPressUpdateHandler = React.useCallback(() => {
    if (isError) {
      setIsError(false);
    }

    if (!fetchPermision()) {
      return;
    }

    if (!fetchSpace()) {
      return;
    }

    if (!isFetchDownload) {
      setIsFetchDownload(true);
      dispatch(
        updateLauncher({
          setIsError: setIsError,
          setIsFetchDownload: setIsFetchDownload,
        }),
      );
    }
  }, [isError, isFetchDownload]);

  return (
    <LoaderContainer>
      <Text style={[styles.title, styles.titleUppercase]}>
        نسخه جدید لانچر راکستار
      </Text>

      <View style={styles.progress}>
        {!isError && !isFetchDownload && (
          <LauncherDownload onPressUpdateHandler={onPressUpdateHandler} />
        )}
        {!isError && isFetchDownload && (
          <LauncherDownloadStart
            currentBytes={currentBytes}
            needBytes={needBytes}
          />
        )}
        {isError && (
          <LauncherDownloadError onPressUpdateHandler={onPressUpdateHandler} />
        )}
      </View>
    </LoaderContainer>
  );
});

const LauncherDownload = (props: { onPressUpdateHandler: () => void }) => {
  return (
    <>
      <Text style={styles.alert}>
        کلیک
        <Text style={styles.accent}> загрузить</Text>, чтобы подтвердить
        {'\n'} بارگیری لانچر راکستار
      </Text>
      <View style={styles.buttons}>
        <ButtonLauncher
          btnWidth={'100%'}
          background={'#5476db'}
          IconLeft={downloadSvg}
          onPress={props.onPressUpdateHandler}>
          دانلود
        </ButtonLauncher>
      </View>
    </>
  );
};

const LauncherDownloadError = (props: { onPressUpdateHandler: () => void }) => {
  return (
    <>
      <Text style={styles.alert}> خطایی در بارگیری رخ داد</Text>
      <View style={styles.buttons}>
        <ButtonLauncher
          background={'#5476db'}
          btnWidth={'100%'}
          IconLeft={ReloadSvg}
          onPress={props.onPressUpdateHandler}>
          دوباره
        </ButtonLauncher>
      </View>
    </>
  );
};

const LauncherDownloadStart = (props: {
  currentBytes: number;
  needBytes: number;
}) => {
  const loaders = Math.floor((props.currentBytes * 100) / props.needBytes);

  return (
    <>
      <Text style={[styles.progressTitle, { textAlign: 'center' }]}>
        <Text style={[styles.progressMemory]}>
          [{formatSizeUnits(props.currentBytes)} از{' '}
          {formatSizeUnits(props.needBytes)}]
        </Text>
      </Text>

      <Progress.Bar
        progress={loaders / 100 < 0.001 ? 0.0 : loaders / 100}
        animated={true}
        useNativeDriver={true}
        borderWidth={0}
        color={'#647fd3'}
        unfilledColor={'#2f3545'}
        borderRadius={20}
        height={10}
        width={width - verticalScale(40)}
      />
      <Text style={styles.progressPercent}>{loaders > 0 ? loaders : 0}%</Text>
    </>
  );
};

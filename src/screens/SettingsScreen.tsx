import {StyleSheet, Text, View} from 'react-native';
import {version} from '../../package.json';
import getTheme from '../globalConstant/theme';

const SettingsScreen = () => {
  const theme = getTheme();

  return (
    <View style={[styles.contentContainer, theme === 'dark' && {backgroundColor: '#1D212D'}]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, theme === 'dark' && {color: '#f6f6f6'}]}>Settings</Text>
      </View>
      <View style={[styles.containerSettings, theme === 'dark' && {backgroundColor: '#33373D'}]}>
        <View style={[styles.versionContent, theme === 'dark' && {backgroundColor: '#4C5056'}]}>
          <Text style={[styles.titleSettingContent, theme === 'dark' && {color: '#f6f6f6'}]}>Version</Text>
          <Text style={[styles.infoSettingContent, theme === 'dark' && {color: '#f6f6f6', opacity: 0.6}]}>
            {version}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  titleContainer: {
    alignSelf: 'center',
    marginTop: 24,
  },
  titleText: {
    color: '#1D212D',
    fontSize: 24,
  },
  containerSettings: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 28,
    backgroundColor: '#EFEFEF',
    borderRadius: 16,
    elevation: 6,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  versionContent: {
    height: 57,
    borderRadius: 20,
    backgroundColor: '#e7e7e7',
    paddingHorizontal: 20,
  },
  titleSettingContent: {
    color: '#1D212D',
    fontSize: 16,
    fontWeight: '500',
  },
  infoSettingContent: {
    color: 'black',
    fontWeight: '400',
    opacity: 0.6,
  },
});

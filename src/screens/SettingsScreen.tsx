import {StyleSheet, Text, View} from 'react-native';
import {version} from '../../package.json';

const SettingsScreen = () => {

  return (
    <View style={styles.contentContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Settings</Text>
      </View>
      <View style={styles.containerSettings}>
        <View style={styles.versionContent}>
          <Text style={styles.titleSettingContent}>Version</Text>
          <Text style={styles.infoSettingContent}>{version}</Text>
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

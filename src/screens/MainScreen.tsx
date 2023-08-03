import {StyleSheet, Text, View} from 'react-native';
import CurrencyBar from '../components/CurrencyBar';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.upperView}></View>
      <View style={styles.currenciesBars}>
        <View>
          <CurrencyBar />
        </View>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperView: {
    height: 304,
    width: '100%',
    backgroundColor: '#1D212D',
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
  },
  currenciesBars: {
    marginTop: 29,
    marginHorizontal: 15,
    borderRadius: 16,
    backgroundColor: '#f6f6f6',
    elevation: 33,
    flex: 1,
    marginBottom: 24,
  },
  currencyItem: {},
});

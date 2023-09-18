import {StyleSheet, View, Text} from 'react-native';
import CoinLogo from '../assets/logoIcon/coinLogo.svg';
import ContentSlider from '../components/mainscreen/ComponentSlider';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.upperView}>
        <Text style={styles.textLogo}>Coinvertly</Text>
        <View style={styles.logoIconContainer}>
          <CoinLogo width={117} height={114} />
        </View>
      </View>
      <View style={styles.currenciesBars}>
        <View style={{flex: 1}}>
          <Text style={styles.baseValueText}>Base Value: USD</Text>
          <ContentSlider />
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
    height: 300,
    width: '100%',
    backgroundColor: '#1D212D',
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
    alignItems: 'center',
  },
  currenciesBars: {
    marginTop: 29,
    marginHorizontal: 15,
    borderRadius: 16,
    backgroundColor: '#f6f6f6',
    elevation: 6,
    flex: 1,
    marginBottom: 24,
  },
  currencyItem: {},
  baseValueText: {
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  textLogo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 30,
    color: '#F8F8F8',
  },
  logoIconContainer: {
    marginTop: 28,
  },
});

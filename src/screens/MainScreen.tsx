import {StyleSheet, View, Text, Button, Image} from 'react-native';
import CoinLogo from '../assets/logoIcon/coinLogo.svg';
import ContentSlider from '../components/mainscreen/ComponentSlider';
import store from '../redux-saga/store';
import {useDispatch} from 'react-redux';
import {useLayoutEffect} from 'react';

const MainScreen = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch({type: 'FETCH_CURRENCY_RATE'});
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.upperView}>
        <Text style={styles.textLogo}>Coinvertly</Text>
        <View style={styles.logoIconContainer}>
          <CoinLogo width={117} height={114} />
        </View>
      </View>
      <View style={styles.currenciesBars}>
        <View style={styles.content}>
          <Text style={styles.baseValueText}>Base Value: {store.getState().AllRates.baseValue}</Text>
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
  content: {
    flex: 1,
  },
});

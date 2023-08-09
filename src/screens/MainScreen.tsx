import {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import CurrencyBar from '../components/CurrencyBar';
import {useCurrencyHandler} from '../apiHandler/useCurrencyHandler';
import CoinLogo from '../assets/logoIcon/coinLogo.svg';

const MainScreen = () => {
  const [getLatestRates] = useCurrencyHandler();
  const [latestRates, setLatestRates] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      setLatestRates(await getLatestRates());
      // setLatestRates(Object.entries(latestRates));
    };

    fetchData();
  }, []);

  console.log(latestRates);
  // const data = Object.entries(latestRates);

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
          <FlatList
            data={latestRates}
            keyExtractor={item => item[0]} // Use the currency code as the key
            renderItem={({item}) => (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <CurrencyBar name={item[0]} value={item[1]} />
              </View>
            )}
          />
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

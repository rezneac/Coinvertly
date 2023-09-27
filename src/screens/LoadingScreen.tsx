import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {useEffect, useLayoutEffect} from 'react';
import LoadIco from '../assets/loadScreen/loadIco.svg';
import {useDispatch} from 'react-redux';
import store from '../redux-saga/store';

interface IProps {
  navigation: any;
}

const LoadingScreen = ({navigation}: IProps) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch({type: 'FETCH_CURRENCY_RATE'});
  }, []);

  useEffect(() => {
    const handleAPIFetch = () => {
      if (store.getState().AllRates.currencyRate.length !== 0) {
        navigation.replace('TabStack');
      } else {
        setTimeout(() => {
          navigation.navigate('TabStack');
        }, 3500);
      }
    };

    const listenToStore = store.subscribe(handleAPIFetch);

    handleAPIFetch();

    return () => {
      // unsubscribe from listening to store changes
      listenToStore();
    };
  }, [store]);

  return (
    <View style={styles.container}>
      <View style={styles.textPosition}>
        <Text style={styles.customFontText}> Coinvertly </Text>
      </View>
      <View style={styles.imagePosition}>
        <LoadIco width={161} height={165} />
      </View>
      <View style={styles.bottomContent}>
        <ActivityIndicator color={'#181A4B'} size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    flex: 1,
  },
  imagePosition: {
    marginTop: 45,
    alignItems: 'center',
  },
  textPosition: {
    alignItems: 'center',
    marginTop: 180,
  },
  customFontText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#181A4B',
  },
  bottomContent: {
    marginTop: 100,
  },
});

export default LoadingScreen;

import React, {useCallback, useEffect, useState} from 'react';
import store from '../redux-saga/store';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Outline from '../assets/currencyExchangerView/outline.svg';
import ArrowBack from '../assets/currencyExchangerView/arrowLeftFace.svg';
import CurrencyExchanger from '../components/currencyExchanger/CurrencyExchanger';
import {useCurrencyHandler} from '../apiHandler/useCurrencyHandler';
import {useNavigation} from '@react-navigation/native';

import {currencyFlags} from '../assets/icons/currencyFlags';
import axios from 'axios';

interface CurrencyProp {
  currency: {
    name: string;
  };
  countrySelected: string;
  selector: string;
}

interface Currency {
  currencyName: string;
  value: string;
}

const CurrencyExchangerScreen = ({route, navigation}: any) => {
  // const navigation = useNavigation();

  const {currency, countrySelected, selector}: CurrencyProp = route.params;
  const baseValue = store.getState().AllRates.baseValue;

  const [firstCurrency, setFirstCurrency] = useState<Currency>({currencyName: baseValue, value: '1'});
  const [secondCurrency, setSecondCurrency] = useState<Currency>({
    currencyName: currency ? currency.name : '',
    value: '0',
  });
  const [focusedCurrency, setFocusedCurrency] = useState<string>(firstCurrency.currencyName);
  var a = firstCurrency.value;
  var b = secondCurrency.value;

  const [getLatestRates, getLatestRatesCrypto, getCurrencyConvert] = useCurrencyHandler();

  const updateCurrency = useCallback(() => {
    if (countrySelected !== null && selector !== null) {
      if (selector === 'firstCurrency') {
        setFirstCurrency({
          ...firstCurrency,
          currencyName: countrySelected,
        });
      } else if (selector === 'secondCurrency') {
        setSecondCurrency({
          ...secondCurrency,
          currencyName: countrySelected,
        });
      }
    }
  }, [countrySelected, selector]);

  const handleCurrencyUpdate = async (a1: string, b1: string, c1: string) => {
    return await getCurrencyConvert(a1, b1, c1);
  };
  useEffect(() => {
    const getLatestRate = async () => {
      if (focusedCurrency == firstCurrency.currencyName) {
        setSecondCurrency({
          ...secondCurrency,
          value: await handleCurrencyUpdate(
            firstCurrency.currencyName,
            secondCurrency.currencyName,
            firstCurrency.value,
          ),
        });
      } else if (focusedCurrency == secondCurrency.currencyName) {
        setFirstCurrency({
          ...firstCurrency,
          value: await handleCurrencyUpdate(
            secondCurrency.currencyName,
            firstCurrency.currencyName,
            secondCurrency.value,
          ),
        });
      }
    };

    let timer = setTimeout(getLatestRate, 1100);

    return () => {
      clearTimeout(timer);
    };
  }, [focusedCurrency, a, b]);

  useEffect(() => {
    updateCurrency();
  }, [countrySelected, selector]);

  const onSwapCurrencyHandler = () => {
    setFirstCurrency(prevCurrency => {
      setSecondCurrency(firstCurrency);
      return secondCurrency;
    });
  };

  const onImageHandler = (currency: string) => {
    return currencyFlags[currency.toLowerCase()];
  };

  const onNavigateToFinder = (selector: string) => {
    navigation.navigate('CurrencyFinder', {selector: selector});
  };

  const onBackHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleAppView}>
        <View style={styles.backButton}>
          <Pressable onPress={onBackHandler} style={({pressed}) => [pressed && styles.pressed]}>
            <ArrowBack />
          </Pressable>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.titleAppText}>Coinvertly</Text>
        </View>
      </View>

      <View style={styles.convertor}>
        <CurrencyExchanger
          onPress={() => onNavigateToFinder('firstCurrency')}
          image={onImageHandler(firstCurrency.currencyName)}
          currencyName={firstCurrency.currencyName}
          currencyRate={firstCurrency.value}
          focusedCurrency={currencyName => {
            setFocusedCurrency(currencyName);
          }}
          onChange={value => {
            setFirstCurrency({
              ...firstCurrency,
              value: value,
            });
          }}
        />

        <View style={styles.outlineView}>
          <Pressable onPress={onSwapCurrencyHandler} style={({pressed}) => [pressed && styles.pressed]}>
            <Outline />
          </Pressable>
        </View>

        <CurrencyExchanger
          onPress={() => onNavigateToFinder('secondCurrency')}
          image={onImageHandler(secondCurrency.currencyName)}
          currencyName={secondCurrency.currencyName}
          currencyRate={secondCurrency.value}
          focusedCurrency={currencyName => {
            setFocusedCurrency(currencyName);
          }}
          onChange={value => {
            setSecondCurrency({
              ...secondCurrency,
              value: value,
            });
          }}
        />
      </View>
    </View>
  );
};

export default CurrencyExchangerScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    flex: 1,
  },
  innerConteiner: {
    margin: 20,
  },
  convertor: {
    marginTop: 47,
    backgroundColor: '#F8F8F8',
    marginHorizontal: 35,
    borderRadius: 20,
    elevation: 4,
  },
  currencyConteiner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  currencyName: {
    fontSize: 20,
    color: '#26278D',
    marginLeft: 10,
  },
  outlineView: {
    alignSelf: 'center',
  },
  pressableText: {
    flexDirection: 'row',
  },
  pressed: {
    opacity: 0.7,
  },
  titleAppView: {
    flexDirection: 'row',
    marginTop: 24,
    width: '100%',
  },
  titleAppText: {
    color: '#1F2261',
    textAlign: 'center',
    fontSize: 26,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 48,
  },
  backButton: {
    marginLeft: 22,
  },
});

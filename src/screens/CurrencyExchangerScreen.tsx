import React, {useCallback, useEffect, useState} from 'react';
import store from '../redux-saga/store';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Outline from '../assets/currencyExchangerView/outline.svg';
import ArrowBack from '../assets/currencyExchangerView/arrowLeftFace.svg';
import CurrencyExchanger from '../components/currencyExchanger/CurrencyExchanger';
import {useCurrencyHandler} from '../apiHandler/useCurrencyHandler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getCurrencyConvert} from '../apiHandler/useCurrencyHandler';

import {currencyFlags} from '../assets/icons/currencyFlags';

interface CurrencyProp {
  currency: {
    name: string;
  };
  updatedCountry: string;
  selector: string;
}

interface Currency {
  currencyName: string;
  value: string;
}

type AppNavigation = NavigationProp<Record<string, object | undefined>>;

const CurrencyExchangerScreen = ({route}: any) => {
  const navigation = useNavigation<AppNavigation>();

  const {currency, selector}: CurrencyProp = route.params;
  const baseValue = store.getState().AllRates.baseValue;

  const [firstCurrency, setFirstCurrency] = useState<Currency>({currencyName: baseValue, value: '1'});
  const [secondCurrency, setSecondCurrency] = useState<Currency>({
    currencyName: currency ? currency.name : '',
    value: '0',
  });

  var a = firstCurrency;
  var b = secondCurrency;

  const [focusedCurrency, setFocusedCurrency] = useState<string>(firstCurrency.currencyName);

  const handleCurrencyUpdateApi = async (a1: string, b1: string, c1: string) => {
    return await getCurrencyConvert(a1, b1, c1);
  };

  useEffect(() => {
    if (route.params && route.params.currency) {
      const newCurrency = route.params.currency;
      if (selector === 'firstCurrency') {
        setFirstCurrency({currencyName: newCurrency.code, value: firstCurrency.value});
      } else {
        setSecondCurrency({currencyName: newCurrency.name || newCurrency.code, value: secondCurrency.value});
      }
    }
  }, [route.params]);

  //TODO: make this component to update less times
  const updateLatestRate = useCallback(async () => {
    if (focusedCurrency === firstCurrency.currencyName) {
      const updatedValue = await handleCurrencyUpdateApi(
        firstCurrency.currencyName,
        secondCurrency.currencyName,
        firstCurrency.value,
      );

      setSecondCurrency({
        ...secondCurrency,
        value: await updatedValue,
      });
    } else {
      const updatedValue = await handleCurrencyUpdateApi(
        secondCurrency.currencyName,
        firstCurrency.currencyName,
        secondCurrency.value,
      );
      setFirstCurrency({
        ...firstCurrency,
        value: await updatedValue,
      });
    }
  }, [firstCurrency, secondCurrency]);

  useEffect(() => {
    const timer = setTimeout(updateLatestRate, 900);
    return () => {
      clearTimeout(timer);
    };
  }, [a.value, b.value, a.currencyName, b.currencyName, selector]);

  const onSwapCurrencyHandler = useCallback(() => {
    setFirstCurrency(prevCurrency => {
      setSecondCurrency(firstCurrency);
      return secondCurrency;
    });
  }, [firstCurrency, secondCurrency]);

  const onImageHandler = useCallback(
    //TODO: Move to currencyExchanger
    (currency: Currency) => {
      console.log(currency);
      if (firstCurrency.currencyName && secondCurrency.currencyName) {
        return currencyFlags[currency.currencyName.toLowerCase()];
      } else {
        return '';
      }
    },
    [currency, firstCurrency, secondCurrency],
  );

  const onNavigateToFinder = useCallback(
    (selector: string) => {
      navigation.navigate('CurrencyFinder', {selector: selector});
    },
    [selector],
  );

  const onBackHandler = useCallback(() => {
    navigation.goBack();
  }, []);

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
          image={onImageHandler(firstCurrency)}
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
          image={onImageHandler(secondCurrency)}
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

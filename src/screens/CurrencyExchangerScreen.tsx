import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {handlerIcon} from '../components/handlerIcon';
import Outline from '../assets/currencyExchangerView/outline.svg';

interface IProp {
  currency: {
    name: string;
  };
}

const CurrencyExchangerScreen = ({route}: any) => {
  const {currency}: IProp = route.params;
  const iconComponent = handlerIcon[currency.name];

  return (
    <View style={styles.container}>
      <View style={styles.convertor}>
        <View style={styles.innerConteiner}>
          <Text>Amount</Text>
          <View style={styles.currencyConteiner}>
            <View>{iconComponent}</View>
            <Text style={styles.currencyName}>{currency.name}</Text>
          </View>
        </View>

        <View style={styles.outlineView}>
          <Outline />
        </View>

        <View style={styles.innerConteiner}>
          <Text>Amount</Text>
          <View style={styles.currencyConteiner}>
            <View>{iconComponent}</View>
            <Text style={styles.currencyName}>{currency.name}</Text>
          </View>
        </View>
      </View>
      <Text>{currency.name}</Text>
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
  },
  currencyName: {
    fontSize: 20,
    color: '#26278D',
    marginLeft: 10,
  },
  outlineView: {
    alignSelf: 'center',
  },
});

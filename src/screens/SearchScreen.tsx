import React from 'react';
import {Text, View} from 'react-native';
import CurrencyFinder from '../components/currencyFinder/CurrencyFinder';

const SearchScreen = () => {
  return (
    <View style={{flex: 1}}>
      <CurrencyFinder />
    </View>
  );
};

export default SearchScreen;

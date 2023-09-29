import React from 'react';
import {Text, View} from 'react-native';
import CurrencyFinder from '../components/currencyFinder/CurrencyFinder';
import getTheme from '../globalConstant/theme';

const SearchScreen = () => {
  const theme = getTheme();

  return (
    <View style={[{flex: 1}, theme === 'dark' ? {backgroundColor: '#1D212D'} : {backgroundColor: '#F6F6F6'}]}>
      <CurrencyFinder />
    </View>
  );
};

export default SearchScreen;

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, Image, Pressable, StyleSheet, TextInput} from 'react-native';
import Arrow from '../../assets/currencyExchangerView/arrowDownFace.svg';
import Outline from '../../assets/currencyExchangerView/outline.svg';
import getTheme from '../../globalConstant/theme';

interface IProps {
  image: string;
  currencyName: string;
  currencyRate: string;
  onPress?: () => void;
  focusedCurrency: (currencyName: string) => void;
  onChange: (value: string) => void;
}

const CurrencyExchanger = ({image, currencyName, currencyRate, focusedCurrency, onPress, onChange}: IProps) => {
  const theme = getTheme();
  const textInputRef = useRef<TextInput>(null);
  var amount: string = currencyRate;

  const handleInputPress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const handleTextChange = (value: string) => {
    amount = value;
    onChange(value);
  };

  return (
    <View style={styles.innerConteiner}>
      <Text style={theme === 'dark' ? {color: '#F8F8F8'} : {color: '#989898'}}>Amount</Text>
      <View style={styles.currencyConteiner}>
        <View style={styles.countryCurrencyConteiner}>
          <Image style={{height: 30, width: 40, alignSelf: 'center'}} source={{uri: image}} />
          <Pressable onPress={onPress} style={({pressed}) => [styles.pressableText, pressed && styles.pressed]}>
            <Text style={[styles.currencyName, theme === 'dark' && {color: '#F8F8F8'}]}>{currencyName}</Text>
            <Arrow />
          </Pressable>
        </View>

        <Pressable onPress={handleInputPress} style={({pressed}) => [pressed && styles.pressed]}>
          <View style={[styles.currencyRateView, theme === 'dark' && {backgroundColor: '#989898'}]}>
            <TextInput
              ref={textInputRef}
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="off"
              keyboardType="number-pad"
              style={[styles.textInputRate]}
              value={amount}
              onChangeText={value => handleTextChange(value)}
              onFocus={() => focusedCurrency(currencyName)}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default CurrencyExchanger;

const styles = StyleSheet.create({
  innerConteiner: {
    margin: 20,
  },
  currencyConteiner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  countryCurrencyConteiner: {
    flex: 1,
    flexDirection: 'row',
  },
  currencyName: {
    fontSize: 20,
    color: '#26278D',
    marginLeft: 10,
  },
  currencyRateView: {
    height: 45,
    width: 140,
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textInputRate: {
    flex: 1,
    color: '#3C3C3C',
  },
  pressableText: {
    flexDirection: 'row',
  },
  outlineView: {
    alignSelf: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});

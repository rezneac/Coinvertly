import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import Arrow from '../../assets/currencyExchangerView/arrowDownFace.svg';

interface IProps {
  image: string;
  currencyName: string;
  currencyRate: string;
  onPress?: () => void;
  focusedCurrency: (currencyName: string) => void;
  onChange: (value: string) => void;
}

const CurrencyExchanger = ({image, currencyName, currencyRate, focusedCurrency, onPress, onChange}: IProps) => {
  const textInputRef = useRef<TextInput>(null);

  console.log(currencyName);

  useEffect(() => {
    setAmount(currencyRate);
  }, [currencyRate]);

  const [amount, setAmount] = useState<string>(currencyRate);

  const handleInputPress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const handleTextChange = (value: string) => {
    setAmount(value);
    onChange(value);
  };

  return (
    <View style={styles.innerConteiner}>
      <Text>Amount</Text>
      <View style={styles.currencyConteiner}>
        <View style={styles.countryCurrencyConteiner}>
          <Image style={{height: 30, width: 40, alignSelf: 'center'}} source={{uri: image}} />
          <Pressable onPress={onPress} style={({pressed}) => [styles.pressableText, pressed && styles.pressed]}>
            <Text style={styles.currencyName}>{currencyName}</Text>
            <Arrow />
          </Pressable>
        </View>

        <Pressable onPress={handleInputPress} style={({pressed}) => [pressed && styles.pressed]}>
          <View style={styles.currencyRateView}>
            <TextInput
              ref={textInputRef}
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="off"
              keyboardType="number-pad"
              style={styles.textInputRate}
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
  textInputRate: {flex: 1},
  pressableText: {
    flexDirection: 'row',
  },
  pressed: {
    opacity: 0.7,
  },
});

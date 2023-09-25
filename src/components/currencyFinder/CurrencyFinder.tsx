import React, {useRef, useState} from 'react';
import {View, TouchableOpacity, Pressable, Text, StyleSheet, FlatList, Image, TextInput} from 'react-native';
import {AvailableCurrency} from '../../assets/icons/availableCurrency';
import {currencyFlags} from '../../assets/icons/currencyFlags';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import ArrowBack from '../../assets/currencyExchangerView/arrowLeftFace.svg';
import Star from '../../assets/currencyExchangerView/star.svg';
import Search from '../../assets/currencyExchangerView/searchIcon.svg';

interface CurrencyProp {
  selector: string;
}
interface CountryObject {
  code: string;
  description: string;
}
type AppNavigation = NavigationProp<Record<string, object | undefined>>;

const CurrencyFinder = ({route}: any) => {
  const navigation = useNavigation<AppNavigation>();
  const [query, setQuery] = useState<string>('');
  const textInputRef = useRef<TextInput>(null);
  const [flatCurrencyList, setFlatCurrencyList] = useState<CountryObject[]>(Object.values(AvailableCurrency));
  const {selector}: CurrencyProp = route && route.params ? route.params : {selector: 'secondCurrency'};

  const onBackHandler = () => {
    navigation.goBack();
  };

  const handleInputPress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const handleSearch = (item: string) => {
    const filteredList = Object.values(AvailableCurrency).filter(currencyCountry => {
      return (
        currencyCountry.description.toLowerCase().includes(item.trim()) ||
        currencyCountry.code.toLowerCase().includes(item.trim())
      );
    });

    if (item == '') {
      setFlatCurrencyList(Object.values(AvailableCurrency));
    } else {
      setFlatCurrencyList(filteredList);
    }

    setQuery(item);
  };

  const onSelectHandler = (countrySelected: CountryObject) => {
    navigation.navigate('CurrencyExchangerScreen', {
      currency: countrySelected,
      selector,
    });
  };

  const renderItem = ({item}: any) => (
    <View style={styles.renderItemContainer}>
      <Pressable onPress={() => onSelectHandler(item)} style={({pressed}) => [pressed && styles.pressed]}>
        <View style={styles.currencyItem}>
          <Image style={styles.imageFlags} source={{uri: currencyFlags[item.code.toLowerCase()]}} />
          <View style={styles.textContainer}>
            <Text style={styles.currencyCode}>{item.code}</Text>
            <Text style={styles.countryName}>{item.description}</Text>
          </View>
        </View>
      </Pressable>
      <View style={styles.iconView}>
        <Star />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleAppView}>
        <View style={styles.backButton}>
          <Pressable onPress={onBackHandler} style={({pressed}) => [pressed && styles.pressed]}>
            <ArrowBack />
          </Pressable>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.titleAppText}>Find </Text>
        </View>
      </View>

      <Pressable onPress={handleInputPress}>
        <View style={styles.seachContainer}>
          <Search />
          <TextInput
            placeholder="Search Currency"
            ref={textInputRef}
            autoCorrect={false}
            autoCapitalize="none"
            autoComplete="off"
            style={styles.textInput}
            value={query}
            onChangeText={queryText => handleSearch(queryText)}
          />
        </View>
      </Pressable>

      <View style={styles.contentContainer}>
        <FlatList data={flatCurrencyList} keyExtractor={item => item.code} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default CurrencyFinder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  seachContainer: {
    marginTop: 26,
    marginHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: 'rgba(218, 218, 218, 0.93)',
    borderRadius: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 28,
    backgroundColor: '#EFEFEF',
    borderRadius: 16,
    elevation: 6,
    paddingVertical: 20,
  },
  textInput: {
    flex: 1,
    color: 'black',
    lineHeight: 22,
  },
  renderItemContainer: {
    flexDirection: 'row',
  },
  imageFlags: {
    height: 30,
    width: 40,
    marginVertical: 10,
  },
  iconView: {
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 18,
    justifyContent: 'space-around',
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
  currencyItem: {
    height: 50,
    width: 300,
    marginLeft: 20,
    flexDirection: 'row',
    marginTop: 12,
    flex: 1,
  },
  currencyCode: {
    fontSize: 16,
    color: '#1D212D',
  },
  countryName: {
    fontSize: 14,
    color: 'black',
    opacity: 0.6,
  },
  backButton: {
    marginLeft: 22,
  },
  pressed: {
    opacity: 0.7,
  },
});

import {View, Text, StyleSheet, FlatList, Pressable, Dimensions} from 'react-native';
import CurrencyBar from './CurrencyBar';
import {useNavigation, NavigationProp} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface IProps {
  valueData?: [string, any][];
  slideId: number;
}

type AppNavigation = NavigationProp<Record<string, object | undefined>>;

export const ContentSlider = [
  {
    id: 1,
    content: ({valueData, slideId}: IProps) => {
      const navigation = useNavigation<AppNavigation>();
      const pressHandler = (name: string) => {

        navigation.navigate('CurrencyExchangerScreen', {currency: {name}, selector: 'secondCurrency'});
      };

      return (
        <View style={styles.container}>
          <FlatList
            key={`flatlist-${slideId}`}
            data={valueData}
            keyExtractor={item => item[0]} // Use the currency code as the key
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Pressable onPress={() => pressHandler(item[0])}>
                  <CurrencyBar name={item[0]} value={item[1]} />
                </Pressable>
              </View>
            )}
          />
        </View>
      );
    },
  },
  {
    id: 2,
    content: ({valueData, slideId}: IProps) => {
      const navigation = useNavigation<AppNavigation>(); // Specify the type
      const pressHandler = (name: string) => {
        navigation.navigate('CurrencyExchangerScreen', {currency: {name}});
      };

      return (
        <View style={styles.container}>
          <FlatList
            key={`flatlist-${slideId}`}
            data={valueData}
            keyExtractor={item => item[0]} // Use the currency code as the key
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Pressable onPress={() => pressHandler(item[0])}>
                  <CurrencyBar name={item[0]} value={item[1]} />
                </Pressable>
              </View>
            )}
          />
        </View>
      );
    },
  },
];

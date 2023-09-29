import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
// import MDL from '../assets/countryFlags/gbp.svg';
// import {Svg} from 'react-native-svg';
// import {handlerIcon} from '../handlerIcon';
import {currencyFlags} from '../../assets/icons/currencyFlags';
import store from '../../redux-saga/store';
import getTheme from '../../globalConstant/theme';

interface IProps {
  name: string;
  value: string;
}

const CurrencyBar = ({name, value}: IProps) => {
  const theme = getTheme();
  let rates = parseFloat(value).toFixed(2);

  // const iconComponent = handlerIcon[name];

  const iconData = currencyFlags[name.toLowerCase()];

  return (
    <View style={styles.container}>
      {/* <View style={{}}>{iconComponent}</View> */}
      <Image style={{height: 30, width: 40, alignSelf: 'center'}} source={{uri: iconData}} />
      <View style={styles.content}>
        <Text style={[styles.title, theme === 'dark' && {color: '#f6f6f6'}]}>{name}</Text>
        <View style={styles.rates}>
          <Text>
            1 {store.getState().AllRates.baseValue} ⁓ {rates} {name}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CurrencyBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 44,
    // marginHorizontal: 30,
    paddingHorizontal: 30,
    marginTop: 24,
    flexDirection: 'row',
  },
  content: {
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  rates: {
    borderRadius: 8,
  },
});

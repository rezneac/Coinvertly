import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
// import MDL from '../assets/countryFlags/gbp.svg';
// import {Svg} from 'react-native-svg';
// import {handlerIcon} from '../handlerIcon';
import {currencyFlags} from '../../assets/icons/currencyFlags';

interface IProps {
  name: string;
  value: string;
}

const CurrencyBar = ({name, value}: IProps) => {
  let rates = parseFloat(value).toFixed(2);

  // const iconComponent = handlerIcon[name];

  const iconData = currencyFlags[name.toLowerCase()];

  return (
    <View style={styles.container}>
      {/* <View style={{}}>{iconComponent}</View> */}
      <Image
        style={{height: 30, width: 40, alignSelf: 'center'}}
        source={{uri: iconData}}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.rates}>
          <Text> 1$ ⁓ {rates} </Text>
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
    backgroundColor: '#989898CC',
    borderRadius: 8,
  },
});

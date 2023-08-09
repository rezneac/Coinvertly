import {StyleSheet, Text, View} from 'react-native';
import MDL from '../assets/countryFlags/gbp.svg';
import {Image, Svg} from 'react-native-svg';
import {handlerIcon} from './handlerIcon';

interface IProps {
  name: string;
  value: string;
}

const CurrencyBar = ({name, value}: IProps) => {
  // console.log(name);

  const iconComponent = handlerIcon[name];

  return (
    <View style={styles.container}>
      <View style={{}}>{iconComponent}</View>
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text> {value}</Text>
      </View>
    </View>
  );
};

export default CurrencyBar;

const styles = StyleSheet.create({
  container: {
    height: 44,
    marginHorizontal: 30,
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
});

import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {useEffect} from 'react';
import LoadIco from './loadIco.svg';

interface IProps {
  navigation: any;
}

const LoadScreen = ({navigation}: IProps) => {

//   useEffect(() => {
//     setTimeout(() => {
//       navigation.navigate('MainScreen');
//     }, 2000);
//   }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textPosition}>
        <Text style={styles.customFontText}> Coinvertly </Text>
      </View>
      <View style={styles.imagePosition}>
        <LoadIco width={161} height={165} />
      </View>
      <View style={styles.bottomContent}>
        <ActivityIndicator color={'#181A4B'} size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    flex: 1,
  },
  imagePosition: {
    marginTop: 45,
    alignItems: 'center',
  },
  textPosition: {
    alignItems: 'center',
    marginTop: 180,
  },
  customFontText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#181A4B',
  },
  bottomContent: {
    marginTop: 48,
  },
});

export default LoadScreen;

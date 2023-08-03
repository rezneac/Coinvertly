import {StyleSheet, Text, View} from 'react-native';

const CurrencyBar = () => {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
    </View>
  );
};

export default CurrencyBar;

const styles = StyleSheet.create({
  container: {
    height: 44,
    marginHorizontal: 30,
    marginTop: 24,
    borderColor: 'red',
    borderWidth: 5,
  },
});

import {View, Text, Pressable, StyleSheet} from 'react-native';
import CoinIcon from '../../assets/bottomBar/Coin.svg';
import SettingsIcon from '../../assets/bottomBar/Settings.svg';
import SearchIcon from '../../assets/bottomBar/Search.svg';

const CustomBottomBar = ({state, descriptors, navigation}: any) => {
  const handlerIcon: any = {
    MainScreen: <CoinIcon height={30} width={30} />,
    SearchScreen: <SearchIcon height={30} width={30} />,
    SettingsScreen: <SettingsIcon height={30} width={30} />,
  };

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPressHandler = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        return (
          <View style={styles.tabItem} key={index}>
            {isFocused ? (
              <View style={styles.outline} />
            ) : (
              <View
                style={[styles.outline, {backgroundColor: 'transparent'}]}
              />
            )}
            <Pressable
              onPress={onPressHandler}
              style={[{alignItems: 'center'}]}>
              {handlerIcon[label]}
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 54,
  },
  tabItem: {
    flex: 1,
  },
  outline: {
    backgroundColor: 'black',
    height: 2,
    width: '50%',
    marginBottom: 9,
    alignSelf: 'center',
  },
});

export default CustomBottomBar;

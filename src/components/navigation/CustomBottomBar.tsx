import {View, Text, Pressable, StyleSheet} from 'react-native';
import CoinIcon from '../../assets/bottomBar/Coin.svg';
import CoinIconLight from '../../assets/bottomBar/CoinLight.svg';
import SettingsIcon from '../../assets/bottomBar/Settings.svg';
import SettingsIconLight from '../../assets/bottomBar/SettingsLight.svg';
import SearchIcon from '../../assets/bottomBar/Search.svg';
import SearchIconLight from '../../assets/bottomBar/SearchLight.svg';
import getTheme from '../../globalConstant/theme';

const CustomBottomBar = ({state, descriptors, navigation}: any) => {
  const theme = getTheme();
  const handlerIcon: any = {
    MainScreen: theme === 'light' ? <CoinIcon height={30} width={30} /> : <CoinIconLight height={30} width={30} />,
    SearchScreen: theme === 'light' ? <SearchIcon height={30} width={30} /> : <SearchIconLight height={30} width={30} />,
    SettingsScreen:
      theme === 'light' ? <SettingsIcon height={30} width={30} /> : <SettingsIconLight height={30} width={30} />,
  };

  return (
    <View style={[styles.tabContainer, theme === 'dark' && {backgroundColor: '#33373D'}]}>
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
              <View style={[styles.outline,theme==="dark" && {backgroundColor:'white'}]} />
            ) : (
              <View style={[styles.outline, {backgroundColor: 'transparent'}]} />
            )}
            <Pressable onPress={onPressHandler} style={[{alignItems: 'center'}]}>
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

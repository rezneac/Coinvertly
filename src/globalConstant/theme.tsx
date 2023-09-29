import {useColorScheme} from 'react-native';

const getTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme;
};

export default getTheme;

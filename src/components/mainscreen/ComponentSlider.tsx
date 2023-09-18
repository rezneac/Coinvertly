import {useRef, useCallback, useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet, useWindowDimensions} from 'react-native';
import {ContentSlider} from './ContentSlider';
import {useCurrencyHandler} from '../../apiHandler/useCurrencyHandler';

import FocusedDot from '../../assets/ComponentSlider/FocusedScreen.svg';
import UnFocusedDot from '../../assets/ComponentSlider/UnFocusedScreen.svg';

const ComponentSlider = () => {
  const windowWidth = useWindowDimensions().width;
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [getLatestRates, getLatestRatesCrypto] = useCurrencyHandler();
  const [latestRates, setLatestRates] = useState<object>();
  const [latestRatesCrypto, setLatestRatesCrypto] = useState<any>();
  var valueData: any;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rates = await getLatestRates();
        const cryptoRates = await getLatestRatesCrypto();
        setLatestRates(rates);
        setLatestRatesCrypto(cryptoRates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (activeSlide == 0) {
    valueData = latestRates;
  } else {
    valueData = latestRatesCrypto;
  }

  const handleScroll = useCallback((event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(contentOffset / windowWidth);
    setActiveSlide(activeIndex);
  }, []);

  return (
    <>
      <View style={styles.paginationContainer}>
        {ContentSlider.map((slide, index) => (
          <View key={slide.id} style={[styles.paginationDot]}>
            {index === activeSlide ? <FocusedDot /> : <UnFocusedDot />}
          </View>
        ))}
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {ContentSlider.map(slide => (
          <View key={slide.id} style={{width: windowWidth - 30}}>
            {slide.content({valueData, slideId: slide.id})}
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default ComponentSlider;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  paginationDot: {
    // width: 8,
    // height: 8,
    // borderRadius: 4,
    // backgroundColor: '#D9D9D9',
    marginHorizontal: 6,
    // overflow:'hidden'
  },
  activeDot: {
    backgroundColor: '#0F8743',
  },
});

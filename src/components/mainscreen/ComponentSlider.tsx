import {useRef, useCallback, useState} from 'react';
import {ScrollView, View, StyleSheet, useWindowDimensions} from 'react-native';
import {ContentSlider} from './ContentSlider';
import {useSelector} from 'react-redux';

import FocusedDot from '../../assets/ComponentSlider/FocusedScreen.svg';
import UnFocusedDot from '../../assets/ComponentSlider/UnFocusedScreen.svg';

type RootState = {
  AllRates: {
    currencyRate: string[];
    cryptoRates: string[];
  };
};

const ComponentSlider = () => {
  const windowWidth = useWindowDimensions().width;
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const latestRates = useSelector(
    (state: RootState) => state.AllRates.currencyRate,
  );
  const latestRatesCrypto = useSelector(
    (state: RootState) => state.AllRates.cryptoRates,
  );

  var valueData: any;

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
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#0F8743',
  },
});

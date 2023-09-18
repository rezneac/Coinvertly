import axios from 'axios';

export const useCurrencyHandler = () => {
  const getLatestRates = async () => {
    try {
      const response = await axios.get('https://api.exchangerate.host/latest', {
        params: {base: 'USD', symbols: 'EUR,GBP,CHF,JPY'},
      });

      console.log(Object.entries(response.data.rates).flat());

      return Object.entries(response.data.rates);
    } catch (error) {
      console.error(error);
    }
  };
  const getLatestRatesCrypto = async () => {
    try {
      const response = await axios.get('https://api.exchangerate.host/latest', {
        params: {
          base: 'USD',
          source: 'crypto',
          symbols: 'BTC,XRP,DOGE',
        },
      });

      return Object.entries(response.data.rates);
    } catch (error) {
      console.error(error);
    }
  };

  return [getLatestRates, getLatestRatesCrypto];
};

import axios from 'axios';

export const useCurrencyHandler = () => {
  const getLatestRates = async () => {
    try {
      const response = await axios.get('https://api.exchangerate.host/latest', {
        params: {base: 'USD', symbols: 'EUR,GBP,CHF,JPY,MDL',},
      });

      return Object.entries(response.data.rates);
    } catch (error) {
      console.error(error);
    }
  };

  return [getLatestRates];
};

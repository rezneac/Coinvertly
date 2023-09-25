import axios from 'axios';

export const useCurrencyHandler = () => {
  const getLatestRates = async () => {
    try {
      const response = await axios.get('https://api.exchangerate.host/latest', {
        params: {base: 'USD', symbols: 'EUR,GBP,CHF,JPY'},
      });

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

export const getCurrencyConvert = async (firstCurrency: string, secondCurrency: string, amount: string) => {
  try {
    const response = await axios.get('https://api.exchangerate.host/convert', {
      params: {
        from: firstCurrency,
        to: secondCurrency,
        amount: amount,
        places: 2,
      },
    });

    const result = response.data.result;

    if (result !== null) {
      return result.toString();
    } else {
      return '0';
    }
  } catch (error) {
    console.error(error);
    return '0';
  }
};

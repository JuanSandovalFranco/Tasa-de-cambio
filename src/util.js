export const getExchangeCurrency = async () => {


  

  const response = await fetch(`${window.location.href}api/latestcurrencies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const currencies = await response.json();

  return currencies;



};

export const getHistoryExchangeCurrency = async (date) => {
  const response = await fetch(`${window.location.href}api/historical/${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const currencies = await response.json();

  return currencies;
};

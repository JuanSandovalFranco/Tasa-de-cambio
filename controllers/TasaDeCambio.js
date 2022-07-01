exports.getTasaDeCambios = async (req, res, next) => {
  const responseCurrency = await fetch(
    "https://openexchangerates.org/api/latest.json?app_id=f82fbc62c8894edcbfa8de710a742254",
    {
      method: "GET",
      headers: {
        "Content-Type": "applicaction/json",
      },
    }
  );

  const currency = await responseCurrency.json();

  res.status(200).json({
    status: "success",
    timestamp: currency.timestamp,
    timeUTC: new Date(currency.timestamp * 1000),
    localHour: new Date(new Date(currency.timestamp * 1000)).toLocaleString(),
    base: currency.base,
    rates: currency.rates,
  });

  next();
};

exports.getHistoriaTasaDeCambio = async (req, res, next) => {
  const regex = /\d\d\d\d-\d\d-\d\d/g;

  const comprobacion = regex.exec(req.params.date);

  let responseCurrency;

  if (comprobacion) {
    responseCurrency = await fetch(
      `https://openexchangerates.org/api/historical/${req.params.date}.json?app_id=f82fbc62c8894edcbfa8de710a742254`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const currency = await responseCurrency.json();

  res.status(200).json({
    status: "success",
    ...currency,
  });

  next();
};

export class RateResponse{
  id: string;
  usdRate: number;
  eurRate: number
  etbRate: number;
  exchangeDate: Date;
}

export class ConversionRespose{
  fromCurrency: string;
  toCurrency: string
  Amount: number;
}
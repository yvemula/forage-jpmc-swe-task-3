import { ServerRespond } from './DataStreamer';

export interface Row {
  timestamp: Date,
  price_abc: number,
  price_def: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number,
}

export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const price_abc = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const price_def = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = price_abc / price_def;
    const upper_bound = 1.05;
    const lower_bound = 0.95;

    return {
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
                 serverRespond[0].timestamp : serverRespond[1].timestamp,
      price_abc: price_abc,
      price_def: price_def,
      ratio: ratio,
      upper_bound: upper_bound,
      lower_bound: lower_bound,
      trigger_alert: (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined,
    };
  }
}

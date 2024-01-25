export type Paginated<T> = {
  limit: number;
  total: number;
  results: Array<T>;
};

export type OrdinalUtxo = {
  txid: string;
  vout: number;
  block_height: number;
  value: number;
  sats: Array<{
    number: number;
    rarity_ranking: string;
    offset: number;
  }>;
  inscriptions: Array<{
    id: string;
    offset: 0;
    content_type: string;
  }>;
};

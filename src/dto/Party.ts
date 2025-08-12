import { Interface } from "readline/promises";

interface TransactionPartyInfo {
  transactionPartyId: string;
  name: string;
  relationType: string;
  active: boolean;
}

export type { TransactionPartyInfo };

interface DailyExpenseSummary {
  title: string;
  amount: number;
  percentage: number;
  description: string;
}

interface PartyExpDetailInfo {
  id: string;
  amount: number;
  percentage: number;
  name: string;
}

export type { DailyExpenseSummary, PartyExpDetailInfo };

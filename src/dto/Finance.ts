import { CategoryDto, SubCategoryDto } from "./ClassificationDto";
import { TransactionPartyInfo } from "./Party";

interface TransactionDto {
  transactionId: string;
  category: CategoryDto;
  subCategory: SubCategoryDto;
  incurredBy: TransactionPartyInfo;
  incurredFor: TransactionPartyInfo[];
  description: string;
  amount: number;
  spentOn: string;
  transactionType: string;
}

export type { TransactionDto };

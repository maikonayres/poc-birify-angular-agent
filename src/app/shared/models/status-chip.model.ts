import { StatusEnum } from '../enums/status.enum';
import { FilterColorEnum } from '../enums/filter-color.enum';

export interface StatusChipModel {
  key: StatusEnum;
  label: string;
  color: FilterColorEnum;
}

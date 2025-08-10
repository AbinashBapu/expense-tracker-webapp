interface CategoryDto {
  categoryId: string;
  type: TypeDto;
  label: string;
  description: string;
  active: boolean;
  deleted: boolean;
  subCategoryInfos: Array<SubCategoryDto>;
}

interface TypeDto {
  typeId: string;
  typeName: string;
  typeDescription: string;
  active: boolean;
  deleted: boolean;
}

interface SubCategoryDto {
  pkSubCategoryId: string;
  label: string;
  description: null | string;
  categoryInfo: null;
  active: boolean;
  deleted: boolean;
}

export { CategoryDto, TypeDto, SubCategoryDto };

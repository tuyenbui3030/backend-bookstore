export class CreateBookDto {
  name!: string;
  author!: string;
  categoryId!: number;
  quantity!: number;
  photo!: string;
}

export class SearchBook {
  name: string;
  author: string;
  categoryId: number;
}
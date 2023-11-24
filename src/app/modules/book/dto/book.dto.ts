export class CreateBookDto {
  name!: string;
  author!: string;
  categoryId!: number;
  quantity!: number;
  photo!: string;
}

export class BookInfo {
  name: string;
  author: string;
  categoryId: number;
  quantity: number;
}

export class UpdateBook extends BookInfo {
  id: number;
}
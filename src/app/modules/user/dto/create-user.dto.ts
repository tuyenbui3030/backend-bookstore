export class CreateUserDto {
  username: string;
  password: string;
  fullname: string;
  phone: string;
}

export class LoginInput {
  username: string;
  password: string;
  grantType?: string;
}

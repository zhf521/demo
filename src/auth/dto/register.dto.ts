import { IsNotEmpty } from 'class-validator';
import { IsConfirmRule } from 'src/rules/is-confirm.rule';
import { IsNotExistsRule } from 'src/rules/is-not-exists.rule';

export class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsNotExistsRule('user', { message: '该用户名已经注册' })
  name: string;
  @IsNotEmpty({ message: '密码不能为空' })
  @IsConfirmRule({ message: '两次输入的密码不一致' })
  password: string;
  @IsNotEmpty({ message: '确认密码不能为空' })
  password_confirm: string;
}

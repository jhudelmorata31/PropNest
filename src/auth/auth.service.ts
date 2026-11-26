import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/user.entity';
@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private users: Repository<User>, private jwt: JwtService) {}
  async register(data: { fullName: string; email: string; password: string }) {
    const email = data.email.trim().toLowerCase();
    if (await this.users.findOne({ where: { Email: email } })) throw new ConflictException('Email is already registered');
    const user = this.users.create({ FullName: data.fullName.trim(), Email: email, Password: await bcrypt.hash(data.password, 12), Role: UserRole.CLIENT });
    let saved: User;
    try { saved = await this.users.save(user); } catch (error) { if (error instanceof QueryFailedError) throw new ConflictException('Email is already registered'); throw error; }
    return { user: this.safeUser(saved), accessToken: await this.token(saved) };
  }
  async login(email: string, password: string) {
    const user = await this.users.createQueryBuilder('user').addSelect('user.Password').where('user.Email = :email', { email: email.trim().toLowerCase() }).getOne();
    if (!user || !(await bcrypt.compare(password, user.Password))) throw new UnauthorizedException('Invalid email or password');
    return { user: this.safeUser(user), accessToken: await this.token(user) };
  }
  private token(user: User) { return this.jwt.signAsync({ sub: user.UserID, email: user.Email, role: user.Role }); }
  private safeUser(user: User) { return { UserID: user.UserID, FullName: user.FullName, Email: user.Email, Role: user.Role, CreatedAt: user.CreatedAt }; }
}

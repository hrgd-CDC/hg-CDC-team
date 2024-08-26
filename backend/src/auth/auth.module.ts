import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { FileModule } from 'src/file/file.module';
import { FilesAzureService } from 'src/file/file.azure.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
    FileModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, FilesAzureService],
  exports: [JwtStrategy, PassportModule, TypeOrmModule, FileModule],
})
export class AuthModule {}

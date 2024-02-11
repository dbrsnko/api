import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CryptoModuleOptions } from './types';

@Injectable()
export class CryptoService {
  saltRounds: number;

  constructor(@Inject('CRYPTO_OPTIONS') private options: CryptoModuleOptions) {
    this.saltRounds = Number(this.options.cryptoHash);
  }

  async hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, this.saltRounds);
  }

  async compare(payload: string, hashedPayload: string): Promise<boolean> {
    return bcrypt.compare(payload, hashedPayload);
  }
}

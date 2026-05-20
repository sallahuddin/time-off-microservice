import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class HcmService {
  async validate(payload: any) {
    const failure = Math.random() < 0.2;

    if (failure) {
      throw new InternalServerErrorException(
        'HCM unavailable'
      );
    }

    return {
      success: true,
      referenceId: `HCM-${Date.now()}`
    };
  }
}
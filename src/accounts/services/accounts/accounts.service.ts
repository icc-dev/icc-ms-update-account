import { LoggerService } from '@icc-dev/icc-log-service';
import { IAccount } from '@accounts/interface/accounts.interface';
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { UpdateAccountDto } from '@accounts/dto/update-account.dto';

@Injectable()
export class AccountsService {
    constructor(
        @Inject('ACCOUNTS_MODEL')
        private accountsModels: Model<IAccount>
    ) {}

    async updateAccount(updateAccountDto: UpdateAccountDto, logger: LoggerService): Promise<IAccount> {
        logger.log('Updating user', updateAccountDto);
        const filter = { email: updateAccountDto.email };
        const accountRef = new this.accountsModels(updateAccountDto);
        const validateError = accountRef.validateSync();
        if (validateError) {
            throw validateError['errors'];
        }
        let doc = await this.accountsModels.findOneAndUpdate(filter, updateAccountDto, {
            timestamps: true,
            new: true
        });
        return doc;
    }
}

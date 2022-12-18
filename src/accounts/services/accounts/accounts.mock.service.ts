import { LoggerService } from '@icc-dev/icc-log-service';
import { IAccount } from '@accounts/interface/accounts.interface';
import { Injectable } from '@nestjs/common';
import { UpdateAccountDto } from '@accounts/dto/update-account.dto';
import { ACCOUNTS_MOCK } from '../mock/accounts.mock';
import { equals } from '@utils/object.utils';
@Injectable()
export class AccountsMockService {
    private data = ACCOUNTS_MOCK;
    private keysRequired = ['email', 'status', 'accountType'];
    constructor() {}

    async updateAccount(updateAccountDto: UpdateAccountDto, logger: LoggerService): Promise<IAccount> {
        logger.log('Updating user', updateAccountDto);
        if (!equals(UpdateAccountDto.describe(updateAccountDto), this.keysRequired)) {
            throw new Error("ValidationError");
        }
        let updatedAccount: IAccount = null;
        this.data.forEach((account) => {
            if (account.email === updateAccountDto.email) {
                account = {...account, updateAccountDto } as unknown as IAccount;
                updatedAccount = account;
                return;
            }
        });
        
        return !updatedAccount ? 
            Promise.reject('Nothing to update') : 
            updatedAccount as IAccount;
    }
}

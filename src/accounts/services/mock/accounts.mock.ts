import { IAccount } from '@accounts/interface/accounts.interface';
import { StatusAccountAvailable, TypeAccountAvailable } from "@accounts/enums/accounts.enum";

export const VALID_UPDATE_ACCOUNT_DTO = {
    email: "iancardenas96@gmail.com",
    status: StatusAccountAvailable.INACTIVE,
    accountType: TypeAccountAvailable.USER,
}

export const NOT_FOUND_UPDATE_ACCOUNT_DTO = {
    email: "iancardenas96@gmail.cl",
    status: StatusAccountAvailable.ACTIVE,
    accountType: TypeAccountAvailable.USER,
}

export const MISSING_CREATE_ACCOUNT_DTO = {
    email: "iancardenas96@gmail.com",
    status: StatusAccountAvailable.BLOCKED,
}

export const ACCOUNTS_MOCK = [
    {
        status: "active",
        accountType: "user",
        restrictedByLevel: false,
        accountLevel: null,
        subscripted: false,
        email: "iancardenas96@gmail.com",
        createdAt: null,
        updatedAt: null,
    }
] as unknown as IAccount[];

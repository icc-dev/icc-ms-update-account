import { TypeAccountAvailable, StatusAccountAvailable } from "@accounts/enums/accounts.enum";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDto {
    @ApiProperty({
        type: String,
        required: true,
    })
    email: string;
    @ApiProperty({
        type: String,
        required: false,
        enum: TypeAccountAvailable
    })
    accountType: TypeAccountAvailable;
    @ApiProperty({
        type: String,
        required: false,
        enum: StatusAccountAvailable
    })
    status: StatusAccountAvailable;
    @ApiProperty({
        type: Boolean,
        required: false,
    })
    restrictedByLevel: Boolean;
    @ApiProperty({
        type: Number,
        required: false,
    })
    accountLevel: Number;
    @ApiProperty({
        type: Boolean,
        required: false,
    })
    subscripted: Boolean;
    static describe(instance): Array<string> {
        return Object.getOwnPropertyNames(instance);
    }
}
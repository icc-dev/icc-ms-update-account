import { LoggerService } from '@icc-dev/icc-log-service'
import { Controller, Put, Res, Body, HttpStatus, HttpCode, Version } from '@nestjs/common';
import { Response } from 'express';
import { UpdateAccountDto } from '@accounts/dto/update-account.dto';
import { AccountsService } from '@accounts/services/accounts/accounts.service';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatedAccountDto } from '@accounts/dto/updated-account.dto';

@Controller('update')
@ApiTags('update')
export class UpdateController {
    constructor(
        private accountsService: AccountsService,
        private loggerService: LoggerService,
    ) { }

    @Put()
    @HttpCode(200)
    @Version('1')
    @ApiCreatedResponse({
        description: 'The account has been successfully updated.',
        type: UpdatedAccountDto,
      })
    @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'Unprocessable entity.'})
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error in proccess.'})
    async updateAccount(@Res() res: Response, @Body() updateAccountDto: any) {
        try {
            this.loggerService.log('Update account controller init', updateAccountDto);
            if (!updateAccountDto || !Object.keys(updateAccountDto).length) {
                this.loggerService.warn('Unprocessable entity', updateAccountDto);
                return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
            }
            const accountUpdated = await this.accountsService.updateAccount(updateAccountDto, this.loggerService);
            this.loggerService.log('Update account intruction finished correctly', accountUpdated);
            return res.status(HttpStatus.OK).send({accountUpdated});
        } catch (error) {
            this.loggerService.error('An error has occurred', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                error
            });
        }
    }
}

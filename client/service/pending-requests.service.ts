import {Injectable}     from '@angular/core';

@Injectable()
export class PendingRequestsService {
    public hasPendingRequest: boolean = false;
    public httpResponseErrors: undefined[] = [];
}

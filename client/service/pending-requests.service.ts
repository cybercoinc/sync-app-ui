import {Injectable}     from '@angular/core';
import {CanActivate}    from '@angular/router';

@Injectable()
export class PendingRequestsService implements CanActivate {
    canActivate() {
        return true;
    }

    public hasPendingRequest: boolean = false;
}

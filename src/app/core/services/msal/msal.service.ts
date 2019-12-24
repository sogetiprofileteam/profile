import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Msal from 'msal';

declare var bootbox: any;
@Injectable()
export class MsalService {

    B2CTodoAccessTokenKey = 'b2c.todo.access.token';

    tenantConfig = {
        tenant: '669360db-3d12-42e7-9571-89df03395a8e',
        clientID: 'cbdaa17c-8bff-43be-b785-c7b1718fc059',
        signUpSignInPolicy: 'b2c_1_susi',
        b2cScopes: ['https://sogetiazureprofileapp.onmicrosoft.com/demoapi/demo.read']
    };

    // Configure the authority for Azure AD B2C
    authority = 'https://login.microsoftonline.com/tfp/' + this.tenantConfig.tenant + '/' + this.tenantConfig.signUpSignInPolicy;

    /*
     * B2C SignIn SignUp Policy Configuration
     */
    clientApplication = new Msal.UserAgentApplication(
        this.tenantConfig.clientID, this.authority,
        function(errorDesc: any, token: any, error: any, tokenType: any) {
            // Called after loginRedirect or acquireTokenPopup
        }
    );

    public login(): void {
        var _this = this;
        this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function(idToken: any) {
            _this.clientApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(
                function(accessToken: any) {
                    _this.saveAccessTokenToCache(accessToken);
                }, function(error: any) {
                    _this.clientApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes).then(
                        function(accessToken: any) {
                            _this.saveAccessTokenToCache(accessToken);
                        }, function(error: any) {
                            bootbox.alert('Error acquiring the popup:\n' + error);
                        });
                });
        }, function(error: any) {
            bootbox.alert('Error during login:\n' + error);
        });
    }

    saveAccessTokenToCache(accessToken: string): void {
        sessionStorage.setItem(this.B2CTodoAccessTokenKey, accessToken);
    }

    logout(): void {
        this.clientApplication.logout();
    }

    isOnline(): boolean {
        return this.clientApplication.getUser() != null;
    }
}

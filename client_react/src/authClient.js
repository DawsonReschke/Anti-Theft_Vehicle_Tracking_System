import { createAuth0Client } from '@auth0/auth0-spa-js';
import axios from 'axios'

/** 
 * @module Client
 * @description wrapper class for the Auth0Client class adding in simple caching and auth-wrapped axios functionality. 
*/

/** 
 * @constant authConfig
 * @property {String} domain found here : [https://manage.auth0.com/dashboard/us/__domain__/applications/__clientId__/settings] 
 * @property {String} clientId found here : [https://manage.auth0.com/dashboard/us/__domain__/applications/__clientId__/settings] 
 * @property {String} response_type what response type we expect from auth0 (we use token)  
 * @property {String} redirect_uri where auth0 should redirect back to (make sure you set this in your application settings *Application URIs->*Allowed Callback URLs)  
 * @property {String} authorizationParams.audience uri where you are requesting data from. found here: [https://manage.auth0.com/dashboard/us/__domain__/apis/__apiId__/settings] *Identifier
 * @property {String} redirect_uri Same as before...  
*/
const authConfig = {
    domain:'dev-o8dg7r4j31g8ighn.us.auth0.com',
    clientId:'Qa0a1idqKZYlJcpKT3Z6ZRkg2DcIlyWu',
    response_type:'token',
    redirect_uri:'http://localhost:3000',
    authorizationParams:{
        audience: 'https://localhost:3000',
        redirect_uri: 'http://localhost:3000/'
    }
}

const logoutConfig = {
    logoutParams:{
        returnTo:window.location.origin
    }
}

class Client {
    /** 
     * @method initClient
     * @description returns a new Auth0Client if one does not already exist or returns the already existing client object. 
     * We are avoiding creating multiple Auth0Client instances. This function is also responsible for handling the redirect after a user logs in to authenticate them using the url params. 
     * @returns {Promise<import('@auth0/auth0-spa-js').Auth0Client>} 
    */
    async initClient(){
        this.client = this.client ? this.client : await createAuth0Client(authConfig); 
        try{
            await this.client.handleRedirectCallback()
            window.location = '/' 
        }catch(e){}
        return this.client
    }

    /** 
     * @method getClient 
     * @description gets the cached Auth0Client synchronously 
     * @returns {import('@auth0/auth0-spa-js').Auth0Client} 
    */
    getClient(){
        return this.client; 
    }

    /** 
     * @method isAuthenticated
     * @description uses the Auth0Client to check if the user is currently logged in.
     * @returns {Promise<Boolean>}   
    */
    async isAuthenticated(){
        return await (await this.initClient()).isAuthenticated() || false; 
    }

    /** 
     * @method getAccessToken
     * @description If the user is logged in, returns the cached access token or gets a new one using the Auth0Client
     * @returns {Promise<String>} the access token. 
     * @throws {Error} if the user is not authenticated or there is an error when fetching the access token throws an error
    */
    async getAccessToken(){ 
        if(!await this.isAuthenticated()) throw new Error('The user could not be authenticated.'); 
        try{
            return this.token ? this.token : await this.getClient().getTokenSilently()
        }catch(e){
            throw new Error('The user could not be authenticated.')
        }
    }

    /** 
     * @method login
     * @description redirects the user to a sign in page (Auth0)
     * @return {Promise<Boolean>} was the login successful  
     * @throws {Error} if the user login failed throws an error. 
    */
    async login(){
        if(await this.isAuthenticated()) return true; 
        try{
            await this.getClient().loginWithRedirect();
            return true;
        }catch(e){
            throw new Error('The user could not be logged in... Try again later.') 
        }
    }
    
    /** 
     * @method logout
     * @description logout the current user
     * @returns {Promise<Boolean>} false if the user was logged out  
    */
    async logout(){
        await this.getClient().logout(logoutConfig);
        return await this.isAuthenticated();     
    }

    /** 
     * @method getUser
     * @description fetches the user data associated with their social provider (email, name, profile_image, etc)  
     * @returns {Promise<Object>} the object containing the user data.
     * @throws {Error} if the user data could not be fetched.  
    */
    async getUser(){
        if(!await this.isAuthenticated()) throw new Error('The user could not be authenticated.')
            return await this.getClient().getUser(); 
    }

    /** 
     * @method createAuthenticatedRequest
     * @description Creates a new axios instance if one does not already exist. Set the authorization header using the value received by this.getAccessToken. Caches the axios instance for later use. 
     * @argument {import('axios').AxiosRequestConfig} requestConfig the request config used to make the request.  
     * @returns {Promise<import('axios').AxiosResponse>} the server response. 
    */
    async createAuthenticatedRequest(requestConfig){
        if(!this.axios){
            const token = await this.getAccessToken(); 
            this.axios = axios.create({
                baseURL: 'http://localhost:1337/api',
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
        } 
        return (await this.axios.request(requestConfig))
    }
}

const authClient = new Client(); 
export default authClient; 
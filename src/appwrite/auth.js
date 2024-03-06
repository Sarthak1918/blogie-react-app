import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";


export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) { //it will come inside if   only when the response is successful i.e. the account is being created successfully
                //login function
               return this.login({ email, password })
            }
            else {
                return userAccount;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async login({ email, password }) {

        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log(error);
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log(error);
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get()
            if (user) {
                return user;
            }
            else{
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }

}

const authService = new AuthService()

export default authService;
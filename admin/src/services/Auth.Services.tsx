import Notiflix from "notiflix";
import {Rest} from "./Rest.Services";
import {UrlService} from "./Url.Services";

const fakeAuthProvider = {
    isAuthenticated: false,
    signIn(username: string, password: string, callback: VoidFunction) {
        return Rest.post(UrlService.login, {
            "username": username,
            "password": password,
        }).then(result => {
            if (result.message) {
                Notiflix.Notify.failure(result.message)
                return
            }

            fakeAuthProvider.isAuthenticated = true;
            fakeAuthProvider.setName(result.data.Name)
            fakeAuthProvider.setToken(result.data.Token)

            callback()
        })
    },
    signOut(callback: VoidFunction) {
        sessionStorage.clear()
        fakeAuthProvider.isAuthenticated = false;
        callback()
    },

    user: function () {
        return sessionStorage.getItem("user")
    },
    token: function () {
        return sessionStorage.getItem("token") || ''
    },
    isLogged() {
        fakeAuthProvider.isAuthenticated = !!sessionStorage.getItem('token') || false
        return fakeAuthProvider.isAuthenticated
    },
    setName: function (name: string) {
        return sessionStorage.setItem("user", name)
    },
    setToken: function (name: string) {
        return sessionStorage.setItem("token", name)
    },
}
export {fakeAuthProvider};
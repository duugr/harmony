import Notiflix from "notiflix";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeAuthProvider } from "../../services/Auth.Services";

export default function Login() {
    let navigate = useNavigate()
    const [isUser, setIsUser] = useState('is-primary')
    const [isPass, setIsPass] = useState('is-primary')

    const handleUsernameChange = (username: string) => {
        const reg = new RegExp(/^[A-Za-z0-9]{4,16}$/s)
        if (reg.test(username)) {
            setIsUser('is-success')
        } else {
            setIsUser('is-danger')
        }
    }
    const handlePasswordChange = (password: string) => {
        const reg = new RegExp(/^[A-Za-z0-9]{8,16}$/s)
        if (reg.test(password)) {
            setIsPass('is-success')
        } else {
            setIsPass('is-danger')
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!(isUser==='is-success' && isPass==='is-success')) {
            Notiflix.Notify.warning('用户名 或 密码不正确')
            return
        }

        // this.context.signIn(
        fakeAuthProvider.signIn(
            event.currentTarget.username.value,
            event.currentTarget.password.value,
            () => {
                if (fakeAuthProvider.isAuthenticated) {
                    navigate("/", { replace: true })
                }
                // return <Navigate to="/"/>
            })
    }

    return (
        <section className="hero is-fullheight bg-login has-background-grey-darker">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="column is-4 is-offset-4">
                        <form className="login box" onSubmit={event => handleSubmit(event)} method='post'>
                            <div className="image mb-5 has-text-centered">
                                <img src="/img/brand/duugr-full.png" alt="duugr" height="80" />
                            </div>

                            <div className="control">
                                <input className={'input is-large bottom '+ isUser}
                                    type="text" id="username"
                                    onChange={event => handleUsernameChange(event.currentTarget.value)}
                                    placeholder="账号" />
                            </div>

                            <div className="control">
                                <input className={'input is-large top '+ isPass}
                                    type="password" id="password"
                                    onChange={event => handlePasswordChange(event.currentTarget.value)}
                                    placeholder="*** *** ***" />
                            </div>

                            <button type={"submit"}
                                className="button is-large is-fullwidth is-primary mt-6">Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="hero-foot">
                <div className="container has-text-centered">
                    <p className="footer-text">
                        <strong>Duugr</strong> by <a href="https://duugr.com">Russell</a>.
                    </p>
                </div>
            </div>
        </section>
    )
}

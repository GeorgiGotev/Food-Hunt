import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

import * as authService from "../../services/authService";
import useForm from "../../hooks/useForm";
import style from "../Register/Register.module.css";

export default function Register() {
    const [registerErrors, setRegisterErrors] = useState({});
    const [error, setError] = useState()
    const { onLogin } = useAuthContext();

    const navigate = useNavigate();
    const registerSubmitHandler = async (values) => {
        try {
            const registeredUser = await authService.register(values);

            onLogin(registeredUser)
            navigate('/recipes');
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError(null);
            }, 2000);
        }
    };

    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        liked: [],
        displayName: "",
        email: "",
        password: "",
        rePassword: "",
    });
    const nameValidator = () => {
        if (values.displayName.length < 2) {
            setRegisterErrors((state) => ({
                ...state,
                displayName: "Name should be at least 2 characters",
            }));
        } else {
            if (registerErrors.displayName) {
                setRegisterErrors((state) => ({ ...state, displayName: "" }));
            }
        }
    };
    const emailValidator = () => {
        if (!values.email.includes("@")) {
            setRegisterErrors((state) => ({
                ...state,
                email: "E-mail should include '@', please enter a valid e-mail.",
            }));
        } else {
            if (registerErrors.email) {
                setRegisterErrors((state) => ({ ...state, email: "" }));
            }
        }
    };
    const passwordValidator = () => {
        if (values.password.length < 6) {
            setRegisterErrors((state) => ({
                ...state,
                password: "Password should be at least 6 characters",
            }));
        } else {
            if (registerErrors.password) {
                setRegisterErrors((state) => ({ ...state, password: "" }));
            }
        }
    };

    const rePasswordValidator = () => {
        if (values.password !== values.rePassword) {
            setRegisterErrors((state) => ({
                ...state,
                rePassword: "Passwords don't match!",
            }));
        } else {
            if (registerErrors.rePassword) {
                setRegisterErrors((state) => ({ ...state, rePassword: "" }));
            }
        }
        if (values.rePassword.length < 6) {
            setRegisterErrors((state) => ({
                ...state,
                rePassword: "Repeat password should be at least 6 characters",
            }));
        } else {
            if (registerErrors.rePassword) {
                setRegisterErrors((state) => ({ ...state, rePassword: "" }));
            }
        }
    };

    return (
        <>
            <header className={style.headerRegister}>
                <div className={`${style.login} ${style.page}`}>
                    <form
                        onSubmit={onSubmit}
                        className={`${style.register} ${style.form}`}
                    >
                        <h1>Register</h1>

                        <label htmlFor="username">Username</label>
                        <input
                            type="username"
                            name="displayName"
                            value={values["displayName"]}
                            onChange={onChange}
                            onBlur={nameValidator}
                            placeholder="username"
                        />
                        {registerErrors.displayName && (
                            <p className={style.errorMessage}>{registerErrors.displayName}</p>
                        )}
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={values['email']}
                            onChange={onChange}
                            onBlur={emailValidator}
                            placeholder="name@abv.bg"
                        />
                        {registerErrors.email && (
                            <p className={style.errorMessage}>{registerErrors.email}</p>
                        )}
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={values['password']}
                            onChange={onChange}
                            onBlur={passwordValidator}
                            placeholder="*********"
                        />
                        {registerErrors.password && (
                            <p className={style.errorMessage}>{registerErrors.password}</p>
                        )}

                        <label htmlFor="password">Repeat Password</label>

                        <input
                            type="password"
                            name="rePassword"
                            id="rePassword"
                            value={values['rePassword']}
                            onChange={onChange}
                            onBlur={rePasswordValidator}
                            placeholder="*********"
                        />
                        {registerErrors.rePassword && (
                            <p className={style.errorMessage}>{registerErrors.rePassword}</p>
                        )}
                        {error && <p className={style.errorMessage}>{error}</p>}
                        <button
                            disabled={Object.values(registerErrors).some((x) => x !== "")}
                        >
                            create
                        </button>
                        <p className={style.message}>
                            Already registered? <Link to="/login">Sign In</Link>
                        </p>
                        <div>Please note that all fields are mandatory!</div>
                    </form>
                </div>
            </header>
        </>
    );
}

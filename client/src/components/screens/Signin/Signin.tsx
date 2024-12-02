import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import Field from "@/components/Field/Field";
import Button from "@/components/button/Button";
import Layout from "@/components/layout/Layout";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import * as yup from "yup";
import { login } from "@/store/slices/authSlice/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";

const schema = yup.object().shape({
    email: yup.string().email().required("Поле не должно быть пустым"),
    password: yup
        .string()
        .min(4, "Введите не менее 4 символов")
        .required("Поле не должно быть пустым"),
});

const Signin: FC = () => {
    const { isAuth, role } = useAppSelector((state) => state.authReducer);
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useAppDispatch();

    const onSubmit = (data: any) => {
        dispatch(login(data));
    };

    useEffect(() => {
        if (isAuth && role) router.push("/admin");
        else if (isAuth) router.push("/");
    }, [isAuth]);

    return (
        <Layout>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h2>Вход</h2>
                    <div className={styles.field}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Field
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        onChange={onChange}
                                        value={value}
                                    />
                                    {errors.email && (
                                        <span className={styles.error}>
                                            {errors.email.message?.toString()}
                                        </span>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    <div className={styles.field}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Field
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        onChange={onChange}
                                        value={value}
                                    />
                                    {errors.password && (
                                        <span className={styles.error}>
                                            {errors.password.message?.toString()}
                                        </span>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    <Button text="Войти" type="submit" />

                    <div className={styles.registerContainer}>
                        <span>Нет аккаунта? </span>
                        <Link type="submit" href="/auth/signup" scroll={false}>
                            Зарегистрироваться
                        </Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Signin;

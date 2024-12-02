import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./styles.module.scss";
import Field from "@/components/Field/Field";
import Button from "@/components/button/Button";
import Layout from "@/components/layout/Layout";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { signup } from "@/store/slices/authSlice/authSlice";
import Link from "next/link";
import { useRouter } from "next/router";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Неверный формат")
        .required("Поле не должно быть пустым"),
    password: yup
        .string()
        .min(4, "Пароль слишком короткий")
        .required("Поле не должно быть пустым"),
    responsiblePerson: yup.string().required("Поле не должно быть пустым"),
    name: yup.string().required("Поле не должно быть пустым"),
    phone: yup.string().required("Поле не должно быть пустым"),
});

const Signup: FC = () => {
    const isAuth = useAppSelector((state) => state.authReducer.isAuth);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const dispatch = useAppDispatch();

    const onSubmit = (data: any) => {
        console.log(data);
        dispatch(signup(data));
    };

    useEffect(() => {
        if (isAuth) router.push("/");
    }, [isAuth]);

    return (
        <Layout>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h2>Регистрация</h2>
                    <div className={styles.field}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Field
                                        type="text"
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
                            name="responsiblePerson"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Field
                                        type="text"
                                        id="responsiblePerson"
                                        placeholder="Ответственное лицо"
                                        onChange={onChange}
                                        value={value}
                                    />
                                    {errors.responsiblePerson && (
                                        <span className={styles.error}>
                                            {errors.responsiblePerson.message?.toString()}
                                        </span>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    <div className={styles.field}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Field
                                        type="text"
                                        id="name"
                                        placeholder="Название организации"
                                        onChange={onChange}
                                        value={value}
                                    />
                                    {errors.name && (
                                        <span className={styles.error}>
                                            {errors.name.message?.toString()}
                                        </span>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    <div className={styles.field}>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Field
                                        type="text"
                                        id="phone"
                                        placeholder="Телефон"
                                        onChange={onChange}
                                        value={value}
                                    />
                                    {errors.phone && (
                                        <span className={styles.error}>
                                            {errors.phone.message?.toString()}
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

                    <Button text="Зарегистрироваться" styles={styles.button} />

                    <div className={styles.loginContainer}>
                        <span>Есть аккаунт? </span>
                        <Link href="/auth/signin" scroll={false}>
                            Войти
                        </Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Signup;

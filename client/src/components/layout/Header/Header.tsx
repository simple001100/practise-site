import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/store/slices/authSlice/authSlice";

const Header: FC = () => {
    const { isAuth, role } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    return (
        <div className={styles.headerContainer}>
            <header className={styles.header}>
                <Link href="/">
                    <Image
                        className={styles.logo}
                        width="90"
                        height="54"
                        src="/logo.png"
                        alt="logo"
                    />
                </Link>
                <menu className={styles.menu}>
                    <li>
                        <Link href="/#hero" scroll={false}>
                            Главная
                        </Link>
                    </li>
                    {isAuth && role ? (
                        <li>
                            <Link href="/admin" scroll={false}>
                                Панель администратора
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link href="/#projects" scroll={false}>
                                    Проекты
                                </Link>
                            </li>
                            <li>
                                <Link href="/#practices" scroll={false}>
                                    Практики
                                </Link>
                            </li>
                        </>
                    )}
                    {isAuth ? (
                        <li>
                            <Link
                                onClick={() => dispatch(logout())}
                                href="/"
                                scroll={false}
                                style={{ color: "red" }}
                            >
                                Выйти
                            </Link>
                        </li>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <li>
                                <Link
                                    style={{
                                        color: "#478ac9",
                                        fontWeight: "bold",
                                    }}
                                    href="/auth/signin"
                                    scroll={false}
                                >
                                    Войти
                                </Link>
                            </li>
                        </div>
                    )}
                </menu>
            </header>
        </div>
    );
};

export default Header;

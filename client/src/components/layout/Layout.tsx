import { FC, PropsWithChildren, useEffect } from "react";
import Header from "./Header/Header";
import styles from "./styles.module.scss";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/router";
import { refresh } from "@/store/slices/authSlice/authSlice";

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
    const router = useRouter();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(refresh());

        // if (role) router.push("/admin");
    }, []);

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.wrapper}>{children}</main>

            <footer className={styles.footer}>
                <div className={styles.contacts}>
                    <Link href="tel:+375222628970">+375222628970</Link>
                    <Link href="mailto:asu@bru.by">asu@bru.by</Link>
                </div>

                <div className={styles.copyright}>
                    ​© 2023 All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;

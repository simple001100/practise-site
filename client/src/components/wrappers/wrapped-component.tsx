import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { refresh } from "@/store/slices/authSlice/authSlice";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

export default function withAuth(WrappedComponent: FC) {
    return function WithAuth() {
        const router = useRouter();
        const dispatch = useAppDispatch();
        const isAuthenticated = useAppSelector(
            (state) => state.authReducer.isAuth
        );

        useEffect(() => {
            if (!isAuthenticated) {
                dispatch(refresh());
            }
        }, []);

        useEffect(() => {
            if (!isAuthenticated) {
                router.push("/auth/signin");
            }
        }, [isAuthenticated, router]);

        return isAuthenticated ? <WrappedComponent /> : null;
    };
}

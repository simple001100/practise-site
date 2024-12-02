import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

export default function withAdmin(WrappedComponent: FC) {
    return function WithAuth() {
        const router = useRouter();
        const role = useAppSelector((state) => state.authReducer.role);

        useEffect(() => {
            if (!role) {
                router.push("/auth/signin");
            }
        }, [role, router]);

        return role ? <WrappedComponent /> : null;
    };
}

import Home from "@/components/screens/Home/Home";
import { useAppDispatch } from "@/hooks/redux";
import { refresh } from "@/store/slices/authSlice/authSlice";
import { useEffect } from "react";

export default function HomePage() {
    return <Home />;
}

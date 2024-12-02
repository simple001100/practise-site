import Practices from "@/components/screens/Practices/Practices";
import { useAppDispatch } from "@/hooks/redux";
import { refresh } from "@/store/slices/authSlice/authSlice";
import { useEffect } from "react";

export default function PracticesPage() {
    return <Practices />;
}

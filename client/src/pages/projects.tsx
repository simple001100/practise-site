import Projects from "@/components/screens/Projects/Projects";
import { useAppDispatch } from "@/hooks/redux";
import { refresh } from "@/store/slices/authSlice/authSlice";
import { useEffect } from "react";

export default function ProjectsPage() {
    return <Projects />;
}

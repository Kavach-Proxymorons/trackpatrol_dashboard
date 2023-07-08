import { useStateContext } from "../Contexts/ContextProvider";

export default function Dashboard() {
    const { state, setState } = useStateContext(); // dummy state
    return <><h1>Dashboard</h1></>;
}
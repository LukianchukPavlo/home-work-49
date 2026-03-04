import { useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"

export default function Home() {
    useEffect(() => {
        toast(" Час сесії завершено ");
    }, [])

    return (
    <div>
        <h1> This is homepage </h1>
        <ToastContainer position="top-right" autoClose={3000} />
    </div>
    )
}
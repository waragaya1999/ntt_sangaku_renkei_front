import "../styles/globals.css";
import Header from "@/components/header";
import UpperPost from "@/components/upperPost";

export default function Test() {
    const imageUrl = "https://placehold.jp/150x150.png"
    const tailwindUrl = "bg-[url(" + imageUrl + ")]"
    return (
        <>
            <Header/>
            <main>
                <div className={"w-[90%] m-auto mt-4"}>
                    <UpperPost bgImage={tailwindUrl}/>
                    <div></div>
                </div>
            </main>
        </>
    )
}

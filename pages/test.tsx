import "../styles/globals.css";
import Header from "@/components/header";
import UpperPost from "@/components/upperPost";

export default function Test() {
    const imageUrl = "https://placehold.jp/150x150.png"
    const tailwindUrl = "bg-[url(" + imageUrl + ")]"
    return (
        <>
            <Header/>
            <main className={"h-[calc(100%-4rem)] overflow-scroll"}>
                <div className={"w-[500%] flex m-auto pt-16"}>
                    <UpperPost bgImage={tailwindUrl}/>
                    <UpperPost bgImage={tailwindUrl}/>
                    <UpperPost bgImage={tailwindUrl}/>
                    <UpperPost bgImage={tailwindUrl}/>
                    <UpperPost bgImage={tailwindUrl}/>
                </div>
            </main>
            <footer className={"w-full h-16 fixed bottom-0 bg-[#f1f1f1]"}>
                <div className={"w-[80%] h-full flex items-center justify-between m-auto"}>
                    <div className={"w-10 h-10 bg-[#d9d9d9] rounded"}></div>
                    <div className={"w-10 h-10 bg-[#d9d9d9] rounded"}></div>
                    <div className={"w-10 h-10 bg-[#d9d9d9] rounded"}></div>
                    <div className={"w-10 h-10 bg-[#d9d9d9] rounded"}></div>
                </div>
            </footer>
        </>
    )
}

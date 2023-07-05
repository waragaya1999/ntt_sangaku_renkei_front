import { CategoriesResponseDto } from "@/types/CategoriesResponseDto"

type Props = {
    mx: string
    cat: CategoriesResponseDto
}
export default function CatList({ mx, cat }: Props) {
    return (
        <div
            className={`w-[27%] h-[50%] flex items-center justify-center shrink-0 bg-[#f1f1f1] rounded-xl mx-[2%] ${mx}`}
        >
            <div className={"w-[80%] flex items-center"}>
                <div
                    className={
                        "w-[7vw] h-[7vw] max-w-[40px] max-h-[40px] bg-center bg-cover bg-no-repeat rounded mr-[5%]"
                    }
                    style={{
                        backgroundImage: `url(${cat.category_image_path})`,
                    }}
                ></div>
                <p className={"text-[13px] leading-4"}>{cat.category_name}</p>
            </div>
        </div>
    )
}

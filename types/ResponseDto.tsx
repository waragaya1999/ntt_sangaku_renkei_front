export type ResponseDto = {
    post_id: number
    image_path: string
    content: string
    like_count: number
    user: {
        user_id: number
        user_name: string
        user_thumbnail_path: string
        user_like: boolean
    }
    categories: [
        {
            category_id: number
            category_name: string
            category_image_path: string
        },
    ]
}

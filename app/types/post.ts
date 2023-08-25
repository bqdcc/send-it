export type CommentType = {
    id: string;
    content: string;
    createdAt: string;
    postId: string;
    userId: string;
    user: {
        email: string;
        id: string;
        image: string;
        name: string;
    };
};

export type PostType = {
    title: string;
    id: string;
    createdAt?: string;
    user: {
        name: string;
        image: string;
    };
    comments: CommentType[];
};

'use client';

import { PostType } from '@/app/types/post';
import AddComment from '@/components/comment/add-comment';
import Comment from '@/components/comment/comment';
import Post from '@/components/post/post';
import { useQuery } from '@tanstack/react-query';

async function getPost(id: string) {
    const response = await fetch('/api/post/' + id, {
        method: 'GET',
    });
    const { data }: { data: PostType } = await response.json();
    return data;
}

export default function PostDetail({ params }: { params: { id: string } }) {
    const { data, error, isLoading } = useQuery<PostType>({
        queryFn: async () => getPost(params.id),
        queryKey: ['post-detail'],
    });
    if (error) {
        return <div>{JSON.stringify(error)}</div>;
    }
    if (isLoading) {
        return <div className="py-4 text-center text-xl text-green-500">Loading...</div>;
    }

    return (
        <main className="p-4">
            {!!data && (
                <Post
                    image={data.user.image}
                    name={data.user.name}
                    title={data.title}
                    id={data.id}
                    comments={data.comments}
                />
            )}

            <AddComment id={params.id} />

            {data?.comments.map((comment) => (
                <Comment
                    key={comment.id}
                    image={comment.user.image}
                    name={comment.user.name}
                    content={comment.content}
                    createdAt={comment.createdAt}
                    id={comment.id}
                />
            ))}
        </main>
    );
}

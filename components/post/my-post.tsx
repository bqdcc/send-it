'use client';

import queryString from 'query-string';
import { useQuery } from '@tanstack/react-query';
import { PostType } from '@/app/types/post';
import EditPost from './edit-post';

async function getPosts() {
    const response = await fetch('/api/posts?' + queryString.stringify({ isAuth: true }), {
        method: 'GET',
    });
    const { data }: { data: PostType[] } = await response.json();
    return data;
}

export default function MyPost() {
    const { data, error, isLoading } = useQuery<PostType[]>({
        queryFn: getPosts,
        queryKey: ['auth-posts'],
    });
    if (error) {
        return <div>{JSON.stringify(error)}</div>;
    }
    if (isLoading) {
        return <div className="py-4 text-center text-xl text-green-500">Loading...</div>;
    }

    return (
        <div>
            {data?.map((post) => (
                <EditPost
                    key={post.id}
                    image={post.user.image}
                    name={post.user.name}
                    title={post.title}
                    id={post.id}
                    comments={post.comments}
                />
            ))}
        </div>
    );
}

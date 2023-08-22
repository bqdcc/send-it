'use client';

import queryString from 'query-string';
import { PostType } from '../types/post';
import { useQuery } from '@tanstack/react-query';
import Post from '@/components/post/post';

async function getPosts() {
    const response = await fetch('/api/posts?' + queryString.stringify({ isAuth: true }), {
        method: 'GET',
    });
    const { data }: { data: PostType[] } = await response.json();
    return data;
}

export default function Dashboard() {
    const { data, error, isLoading } = useQuery<PostType[]>({
        queryFn: getPosts,
        queryKey: ['authPost'],
    });
    if (error) {
        return <div>{JSON.stringify(error)}</div>;
    }
    if (isLoading) {
        return <div className="py-4 text-center text-xl text-green-500">Loading...</div>;
    }

    return (
        <main className="p-4">
            <p>welcome to send it.</p>
            <div>
                {data?.map((post) => (
                    <Post
                        key={post.id}
                        image={post.user.image}
                        name={post.user.name}
                        title={post.title}
                        id={post.id}
                        comments={post.comments}
                    />
                ))}
            </div>
        </main>
    );
}

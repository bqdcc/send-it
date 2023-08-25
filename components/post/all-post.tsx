'use client';

import { PostType } from '@/app/types/post';
import { useQuery } from '@tanstack/react-query';
import Post from './post';

async function getPosts() {
    const response = await fetch('/api/post', {
        method: 'GET',
    });
    const { data }: { data: PostType[] } = await response.json();
    return data;
}

export default function AllPost() {
    const { data, error, isLoading } = useQuery<PostType[]>({
        queryFn: getPosts,
        queryKey: ['all-post'],
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
    );
}

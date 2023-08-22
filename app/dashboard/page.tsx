import MyPost from '@/components/post/my-post';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin');
    }

    return (
        <main className="p-4">
            <h1>Welcome to send it.</h1>
            <MyPost />
        </main>
    );
}

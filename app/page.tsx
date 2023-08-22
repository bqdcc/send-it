import AddPost from '@/components/post/add-post';
import AllPost from '@/components/post/all-post';

export default function Home() {
    return (
        <main className="p-4">
            <AddPost />
            <AllPost />
        </main>
    );
}

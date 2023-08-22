import { CommentType } from '@/app/types/post';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

interface Props {
    image: string;
    name: string;
    title: string;
    id: string;
    comments: CommentType[];
}

export default function Post({ image, name, title, id, comments }: Props) {
    return (
        <div className="my-8 rounded-md bg-foreground p-4 text-background">
            <div className="flex gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarImage src={image} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>{name}</span>
            </div>
            <p className="my-4 indent-4">{title}</p>
            <div>
                <Link href={`/post/${id}`} className="text-sm">
                    {comments.length} Comment
                </Link>
            </div>
        </div>
    );
}

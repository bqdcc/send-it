import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/lib/utils';

interface Props {
    image: string;
    name: string;
    content: string;
    id: string;
    createdAt: string;
}

export default function Comment({ image, name, content, createdAt, id }: Props) {
    return (
        <div className="my-8 rounded-md bg-foreground p-4 text-background">
            <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarImage src={image} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>{name}</span>
                <span className="text-sm text-background/70">{formatDate(createdAt)}</span>
            </div>
            <p className="my-4 indent-4">{content}</p>
        </div>
    );
}

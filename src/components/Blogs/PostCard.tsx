import { Link } from '@tanstack/react-router';
import Card from '../Ui/Card';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const { title, description, slug, date, cover } = post;
  return (
    <Link to="/blog" params={{ slug }}>
      <Card className="flex w-full">
        {cover && (
          <img
            src={cover}
            alt={title}
            className="w-32 h-32 object-cover rounded-l"
          />
        )}
        <div className="flex flex-grow flex-col gap-3 p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:text-center">
            <span className="text-xl font-bold text-black dark:text-white">
              {title}
            </span>
            <span className="text-base">
              {new Date(date).toLocaleDateString(undefined, {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              })}
            </span>
          </div>
          {description ? <span>{description}</span> : null}
        </div>
      </Card>
    </Link>
  );
}

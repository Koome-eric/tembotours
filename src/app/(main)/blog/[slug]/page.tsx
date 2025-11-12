import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Clock, Tag } from 'lucide-react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const image = PlaceHolderImages.find((p) => p.id === post.imageId);

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <article>
        <header className="mb-8">
          <div className="relative h-80 w-full mb-8">
            {image && (
              <Image
                src={image.imageUrl}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
                priority
                data-ai-hint={image.imageHint}
              />
            )}
          </div>
          <h1 className="font-headline text-4xl font-bold leading-tight md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}-min read</span>
            </div>
            <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <div className="flex gap-2">
                    {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            </div>
          </div>
        </header>

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

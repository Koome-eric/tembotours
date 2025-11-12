import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts } from "@/lib/blog-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
  return (
    <div className="container mx-auto max-w-7xl px-6 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold">Travel Smart — Our Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your source for travel tips, destination guides, and expert advice.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => {
          const image = PlaceHolderImages.find((p) => p.id === post.imageId);
          return (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
              <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-xl">
                {image && (
                  <div className="relative h-56 w-full">
                    <Image
                      src={image.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                      {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                      <span className="text-xs text-muted-foreground ml-auto">{post.readTime}-min read</span>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{post.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

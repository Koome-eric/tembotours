import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blog-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "../ui/badge";
import { ArrowRight } from "lucide-react";

export function BlogSection() {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold">🧳 Travel Smart — Explore Our Blog</h2>
          <p className="mt-2 text-lg text-muted-foreground">Get the latest travel tips, destination guides, and exclusive insights from our experts.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => {
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
                        sizes="(max-width: 768px) 100vw, 33vw"
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
        <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="group">
                <Link href="/blog">
                    View All Articles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

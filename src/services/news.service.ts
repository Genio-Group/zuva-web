export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown
  imageUrl?: string;
  author: {
    name?: string;
    photoURL?: string;
  };
  isPublished: boolean;
  publishedAt: number; // Milliseconds
}

interface NewsRow {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  author_name?: string;
  author_avatar?: string;
  is_published: boolean;
  published_at: string; // ISO timestamp
}

const mapRowToArticle = (row: NewsRow): NewsArticle => ({
  id: row.id,
  title: row.title,
  excerpt: row.excerpt,
  content: row.content,
  imageUrl: row.image_url,
  author: {
    name: row.author_name,
    photoURL: row.author_avatar,
  },
  isPublished: row.is_published,
  publishedAt: new Date(row.published_at).getTime(),
});

const mapArticleToRow = (article: Partial<NewsArticle>) => {
  const row: Partial<NewsRow> = {};
  if (article.title !== undefined) row.title = article.title;
  if (article.excerpt !== undefined) row.excerpt = article.excerpt;
  if (article.content !== undefined) row.content = article.content;
  if (article.imageUrl !== undefined) row.image_url = article.imageUrl;
  if (article.author !== undefined) {
    row.author_name = article.author.name;
    row.author_avatar = article.author.photoURL;
  }
  if (article.isPublished !== undefined) row.is_published = article.isPublished;
  if (article.publishedAt !== undefined) row.published_at = new Date(article.publishedAt).toISOString();
  return row;
};

export class NewsService {
  static async getAll(): Promise<NewsArticle[]> {
    const res = await fetch("/api/news", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch news");
    const { data } = await res.json();
    return (data || []).map(mapRowToArticle);
  }

  static async getById(id: string): Promise<NewsArticle | null> {
    const res = await fetch(`/api/news?id=${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch article");
    const { data } = await res.json();
    return data ? mapRowToArticle(data) : null;
  }

  static async create(article: Omit<NewsArticle, "id" | "publishedAt">) {
    const res = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...mapArticleToRow(article), published_at: new Date().toISOString() }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed to create article");
    return json.id as string;
  }

  static async update(id: string, data: Partial<NewsArticle>) {
    const res = await fetch("/api/news", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...mapArticleToRow(data) }),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error ?? "Failed to update article");
    }
  }

  static async delete(id: string) {
    const res = await fetch("/api/news", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error ?? "Failed to delete article");
    }
  }

  static async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(`Image upload failed: ${error}`);
    }

    const { url } = await response.json();
    return url;
  }
}

import Link from "next/link";

async function fetchAllIds() {
  const isDev = process.env.NODE_ENV === 'development';
  const url = isDev
    ? `http://127.0.0.1:8000/admin/confoline-Api/news.php`
    : `/admin/confoline-Api/news.php`;
  try {
    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) return [] as { id: string }[];
    const json = await res.json();
    if (json && json.success && Array.isArray(json.data)) {
      return json.data.map((n: any) => ({ id: String(n.id) }));
    }
    return [] as { id: string }[];
  } catch {
    return [] as { id: string }[];
  }
}

export async function generateStaticParams() {
  return await fetchAllIds();
}

async function fetchNews(id: string) {
  const isDev = process.env.NODE_ENV === 'development';
  const url = isDev
    ? `http://127.0.0.1:8000/admin/confoline-Api/news-one.php?id=${id}`
    : `/admin/confoline-Api/news-one.php?id=${id}`;
  try {
    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json && json.success ? json.data : null;
  } catch {
    return null;
  }
}

export default async function NewsDetail({ params }: { params: { id: string } }) {
  const item = await fetchNews(params.id);
  if (!item) {
    return (
      <main className="bg-gradient-to-br from-blue-950 to-blue-900 text-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold">News not found</h1>
          <Link href="/" className="underline mt-4 inline-block">Go home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-br from-blue-950 to-blue-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-white/70">{item.category}</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-2">{item.title}</h1>
        </div>
        {item.image && (
          <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 mb-6">
            <img src={item.image} alt={item.title} className="w-full h-auto" />
          </div>
        )}
        <article className="prose prose-invert max-w-none bg-white text-black rounded-lg p-6">
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </article>
        <div className="mt-8">
          <Link href="/" className="underline">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}

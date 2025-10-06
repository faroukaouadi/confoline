'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function NewsDetail() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [item, setItem] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const isDev = process.env.NODE_ENV === 'development'
    const url = isDev
      ? `http://127.0.0.1:8000/admin/confoline-Api/news-one.php?id=${id}`
      : `/admin/confoline-Api/news-one.php?id=${id}`

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.success) setItem(json.data)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (!id) {
    return (
      <main className="bg-gradient-to-br from-blue-950 to-blue-900 text-white min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-bold">No news selected</h1>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="bg-gradient-to-br from-blue-950 to-blue-900 text-white min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    )
  }

  if (!item) {
    return (
      <main className="bg-gradient-to-br from-blue-950 to-blue-900 text-white min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">News not found</h1>
      </main>
    )
  }

  return (
    <main className="bg-gradient-to-br from-blue-950 to-blue-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-white/70">
            {item.category}
          </span>
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
          <Link href="/" className="underline">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

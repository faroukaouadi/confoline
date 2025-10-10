'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useNewsById } from '../../hooks/useNews'
import { Suspense } from 'react'

function NewsContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const newsId = id ? parseInt(id, 10) : 0
  const { data: item, isLoading: loading, error } = useNewsById(newsId)

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

  if (error) {
    return (
      <main className="bg-gradient-to-br from-blue-950 to-blue-900 text-white min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Error loading news: {error?.message}</h1>
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

export default function NewsDetail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewsContent />
    </Suspense>
  )
}

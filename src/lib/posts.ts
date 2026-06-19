import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export type PostFrontmatter = {
  title: string
  date: string
  excerpt: string
  tags: string[]
  slug: string
  coverImage?: string
}

export type PostMeta = PostFrontmatter & {
  readingTime: number
}

export type Post = PostMeta & {
  contentHtml: string
}

export function calculateReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / 200)
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))

  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const frontmatter = data as PostFrontmatter

    return {
      ...frontmatter,
      readingTime: calculateReadingTime(content),
    }
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const frontmatter = data as PostFrontmatter

  const processedContent = await remark().use(html).process(content)

  return {
    ...frontmatter,
    readingTime: calculateReadingTime(content),
    contentHtml: String(processedContent),
  }
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  const posts = await getAllPosts()
  return posts.filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tagSet = new Set<string>()
  posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)))
  return Array.from(tagSet).sort()
}

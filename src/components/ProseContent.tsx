export default function ProseContent({ html }: { html: string }) {
  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:text-accent
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-code:text-accent prose-code:before:content-none prose-code:after:content-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

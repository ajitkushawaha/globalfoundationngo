"use client"

import { useState } from 'react'
import { RichTextEditor } from './rich-text-editor'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function EditorDemo() {
  const [content, setContent] = useState(`Introduction:

Welcome to our new blog editor! This guide will show you how to create professional-looking blog posts without any coding knowledge.

Key Features:

- Easy formatting with toolbar buttons
- Real-time preview
- Automatic heading detection
- List creation tools
- Quote formatting

What You Can Do:

1. **Create Headings**: Use the "Main Heading" button or type "Heading:" at the start of a line
2. **Add Lists**: Click the bullet or numbered list buttons
3. **Format Text**: Select text and click Bold or Italic
4. **Add Quotes**: Use the quote button or wrap text in quotes

**Pro Tip**: Use the preview button to see how your post will look to readers!

"The best way to learn is by doing - try creating your first post today!"

Next Steps:

- Start with a clear title
- Write an engaging excerpt
- Use headings to organize your content
- Add lists to make information easy to scan
- Preview before publishing

Happy writing!`)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rich Text Editor Demo</CardTitle>
          <p className="text-muted-foreground">
            Try the editor below! Use the toolbar buttons to format your content, or type naturally and the editor will automatically detect headings, lists, and other formatting.
          </p>
        </CardHeader>
        <CardContent>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Start writing your blog post... Use the toolbar above to add headings, lists, and formatting."
          />
        </CardContent>
      </Card>
    </div>
  )
}

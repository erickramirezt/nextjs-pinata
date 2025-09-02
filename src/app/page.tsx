'use client'

import { Button } from '@/components/ui/button'
import { pinata } from '@/lib/pinata.config'
import { useState } from 'react'

export default function Home() {
  const [file, setFile] = useState<File>()
  const [uploading, setUploading] = useState(false)

  const uploadFile = async () => {
    if (!file) {
      alert('No file selected')
      return
    }

    try {
      setUploading(true)
      const urlRequest = await fetch('/api/url') // Fetches the temporary upload URL
      const urlResponse = await urlRequest.json() // Parse response
      const upload = await pinata.upload.public
        .file(file)
        .url(urlResponse.url)
        .group(String(process.env.NEXT_PUBLIC_PINATA_GROUP_ID))
      console.log(upload)
      setUploading(false)
      alert('File uploaded successfully')
    } catch (e) {
      console.log(e)
      setUploading(false)
      alert('Trouble uploading file')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0])
  }

  return (
    <main className='w-full min-h-screen m-auto flex flex-col justify-center items-center'>
      <input type='file' onChange={handleChange} />
      <Button type='button' disabled={uploading} onClick={uploadFile}>
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
    </main>
  )
}

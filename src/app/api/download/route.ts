import { NextResponse } from 'next/server' 
import archiver from 'archiver'
import fs from 'fs' 
import path from 'path'

export async function GET() {
  try {
    // Create a new archiver instance
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    })

    // Create a readable stream from the archive
    const chunks: Buffer[] = []
    
    archive.on('data', (chunk) => {
      chunks.push(Buffer.from(chunk))
    })

    const archivePromise = new Promise<Buffer>((resolve, reject) => {
      archive.on('end', () => {
        resolve(Buffer.concat(chunks))
      })
      archive.on('error', reject)
    })

    // Path to the soundboard app directory
    const appDir = path.join(process.cwd(), 'soundboard-app')

    // Add all files from the soundboard app directory
    const files = fs.readdirSync(appDir)
    
    for (const file of files) {
      const filePath = path.join(appDir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isFile()) {
        archive.file(filePath, { name: file })
      } else if (stat.isDirectory()) {
        archive.directory(filePath, file)
      }
    }

    // Finalize the archive
    await archive.finalize()
    
    const zipBuffer = await archivePromise

    // Return the zip file
    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="BrutalMod-v1.0.zip"',
        'Content-Length': zipBuffer.length.toString(),
        'Cache-Control': 'no-cache'
      }
    })
  } catch (error) {
    console.error('Error creating zip:', error)
    return NextResponse.json(
      { error: 'Failed to create download package' },
      { status: 500 }
    )
  }
}

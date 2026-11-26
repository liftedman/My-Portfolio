/**
 * Sanity calls this after every publish so changes appear within seconds
 * instead of waiting for the 60-second refresh. The webhook is set up once in
 * sanity.io/manage — see CMS.md, "Instant updates".
 */
import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { CONTENT_TAG } from '@/lib/content';

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: 'SANITY_REVALIDATE_SECRET is not set' }, { status: 500 });
  }

  try {
    // Also waits until the new content is readable, so the refresh never re-caches old data.
    const { isValidSignature } = await parseBody(req, secret, true);
    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    revalidateTag(CONTENT_TAG);
    revalidatePath('/', 'layout');
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error('[revalidate]', error);
    return NextResponse.json({ message: 'Could not revalidate' }, { status: 500 });
  }
}

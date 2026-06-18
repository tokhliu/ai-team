import SparkMD5 from 'spark-md5';

export type HashAlgo = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';

export async function hashText(text: string, algo: HashAlgo): Promise<string> {
  if (algo === 'MD5') {
    return SparkMD5.hash(text);
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

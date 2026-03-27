import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #050505, #0a0a0a)',
          borderRadius: 36,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/svg+xml;base64,${Buffer.from(readFileSync(join(process.cwd(), 'public', 'logo.svg'))).toString('base64')}`}
          width={140}
          height={140}
          alt=""
        />
      </div>
    ),
    { ...size }
  );
}

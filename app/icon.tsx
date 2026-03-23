import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1e40af',
          borderRadius: 6,
          fontFamily: 'monospace',
          fontSize: 12,
          fontWeight: 700,
          color: 'white',
          letterSpacing: -0.5,
        }}
      >
        &lt;V/&gt;
      </div>
    ),
    { ...size }
  );
}

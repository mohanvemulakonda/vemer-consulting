import { ImageResponse } from 'next/og';

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
          background: '#1e40af',
          borderRadius: 36,
          fontFamily: 'monospace',
          fontSize: 80,
          fontWeight: 700,
          color: 'white',
          letterSpacing: -4,
        }}
      >
        &lt;V/&gt;
      </div>
    ),
    { ...size }
  );
}

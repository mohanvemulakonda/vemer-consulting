import Image from 'next/image';

export default function BrushV({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="Vemer Consulting"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}

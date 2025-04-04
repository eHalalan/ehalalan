import Link from 'next/link';
import { ExternalLinkIcon } from 'lucide-react';

const items = [
  {
    name: 'Source',
    url: 'https://github.com/eHalalan/ehalalan',
    external: true,
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="w-full p-3 py-5 text-sm text-muted-foreground flex items-center justify-center gap-4">
      <div className="flex items-center gap-2">© {year} eHalalan</div>
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.url}
          target={item.external ? '_blank' : ''}
          className="flex items-center gap-1 hover:underline underline-offset-4"
        >
          {item.external && <ExternalLinkIcon className="w-4 h-4" />}
          {item.name}
        </Link>
      ))}
    </div>
  );
}

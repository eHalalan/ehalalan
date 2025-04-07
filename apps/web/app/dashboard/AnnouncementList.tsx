import { getElections } from '@/lib/election';
import Link from 'next/link';

export async function AnnouncementList() {
  const elections = await getElections();

  return (
    <ul className="flex flex-col gap-3">
      {elections.length === 0 && <li>No announcements.</li>}
      {elections.map((election) => (
        <li key={election.id}>
          <Link href={`/elections/${election.id}`} className="underline">
            {election.type} Election
          </Link>{' '}
          {election.isActive ? 'is ongoing until ' : 'has ended at '}
          {new Date(election.endDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
          .
        </li>
      ))}
    </ul>
  );
}

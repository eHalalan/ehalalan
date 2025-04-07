import { getElections } from '@/lib/election';
import { ElectionChart } from '../elections/[id]/ElectionChart';
import { ExternalLink } from '@/components/ui/external-link';

export async function LatestResults() {
  const elections = await getElections();

  if (!elections) {
    return <div>No elections to display</div>;
  }

  const latestElection = elections.sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
  )[0];

  return (
    <div className="flex flex-col gap-3">
      <ExternalLink
        href={`/elections/${latestElection.id}`}
        className="font-bold"
      >
        {new Date(latestElection.endDate).getFullYear()} {latestElection.type}{' '}
        Election Results
      </ExternalLink>
      <ElectionChart
        candidates={
          latestElection.presidents?.length || 0 > 0
            ? latestElection.presidents || []
            : latestElection.senators
        }
      />
    </div>
  );
}

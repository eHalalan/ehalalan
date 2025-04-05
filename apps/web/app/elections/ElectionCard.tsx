import Link from 'next/link';
import { Election } from '@/types/election';
import { ElectionStatusBadge } from './ElectionStatusBadge';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  election: Election;
}

export function ElectionCard({ election }: Props) {
  return (
    <Card className="gap-1">
      <CardHeader className="mb-1">
        <CardTitle className="text-lg">
          <Link
            href={`/elections/${
              election.type
            }/${election.endDate.getFullYear()}`}
            className="hover:text-primary"
          >
            {election.endDate.getFullYear()} {election.type} Election
          </Link>
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <ElectionStatusBadge election={election} />
      </CardFooter>
    </Card>
  );
}

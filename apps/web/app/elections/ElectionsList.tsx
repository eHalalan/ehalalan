import { Election } from '@/types/election';
import { ElectionCard } from './ElectionCard';

interface Props {
  elections: Election[];
}

export function ElectionsList({ elections }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {elections.map((election) => (
        <ElectionCard key={election.id} election={election} />
      ))}
    </div>
  );
}

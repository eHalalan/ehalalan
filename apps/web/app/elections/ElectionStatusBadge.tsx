import { Election } from '@/types/election';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { CircleDotDashedIcon, CircleDotIcon } from 'lucide-react';

interface Props {
  election: Election;
}

export function ElectionStatusBadge({ election }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant={election.isActive ? 'default' : 'outline'}>
          {election.isActive ? <CircleDotDashedIcon /> : <CircleDotIcon />}
          {election.isActive ? 'Ongoing' : 'Ended'}
        </Badge>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {election.endDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </TooltipContent>
    </Tooltip>
  );
}

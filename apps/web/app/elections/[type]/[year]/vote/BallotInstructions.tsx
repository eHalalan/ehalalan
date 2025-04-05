import { BallotCheckbox } from './BallotCheckbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

export function BallotInstructions() {
  return (
    <Alert className="text-muted-foreground">
      <AlertTitle className="font-bold flex items-center gap-1">
        <AlertCircleIcon size={12} />
        Instructions
      </AlertTitle>
      <AlertDescription>
        <div className="flex flex-wrap items-center gap-x-1">
          Mark the inside of the circle{' '}
          <BallotCheckbox className="w-6 h-4 text-sm p-0 m-0" checked={true}>
            1
          </BallotCheckbox>{' '}
          beside the name of the desired candidate by clicking.
        </div>
      </AlertDescription>
    </Alert>
  );
}

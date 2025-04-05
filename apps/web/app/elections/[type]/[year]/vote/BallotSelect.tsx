import React from 'react';
import { BallotCheckbox } from './BallotCheckbox';
import { Candidate } from '@/types/election';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface BallotSelectProps {
  candidates: Candidate[];
  limit?: number;
  onValueChange?: (value: number[]) => void;
  defaultValue?: number[];
  className?: string;
  disabled?: boolean;
}

export const BallotSelect = React.forwardRef<HTMLDivElement, BallotSelectProps>(
  (
    {
      candidates,
      limit,
      onValueChange,
      defaultValue = [],
      className,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<number[]>(defaultValue);

    const toggleCheck = (value: number) => {
      if (disabled) return;

      const isSelected = selectedValues.includes(value);

      if (isSelected) {
        const newSelectedValues = selectedValues.filter((v) => v !== value);
        setSelectedValues(newSelectedValues);
        onValueChange?.(newSelectedValues);
        return;
      }

      if (limit && selectedValues.length >= limit) {
        toast.error(
          `You can only select up to ${limit} candidate${limit > 1 ? 's' : ''}`
        );
        return;
      }

      const newSelectedValues = [...selectedValues, value];
      setSelectedValues(newSelectedValues);
      onValueChange?.(newSelectedValues);
    };

    return (
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-5',
          className
        )}
        ref={ref}
        {...props}
      >
        {candidates.map((candidate, index) => (
          <div key={index} className="flex items-center space-x-2">
            <BallotCheckbox
              id={index.toString()}
              checked={selectedValues.includes(index)}
              onCheckedChange={() => toggleCheck(index)}
            >
              {index}
            </BallotCheckbox>
            <label htmlFor={index.toString()} className={`font-medium`}>
              {candidate.name}{' '}
              <span className="text-sm text-muted-foreground">
                ({candidate.party})
              </span>
            </label>
          </div>
        ))}
      </div>
    );
  }
);

BallotSelect.displayName = 'BallotSelect';

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Election, ElectionType } from '@/types/election';
import { toast } from 'sonner';
import { electionVoteSchema } from '@/schemas/elections';
import { BallotInstructions } from './BallotInstructions';
import { BallotSelect } from './BallotSelect';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { H1, H3 } from '@/components/ui/headings';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CircleAlertIcon } from 'lucide-react';

interface Props {
  election: Election;
}

export function Ballot({ election }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <H1 className="text-center !text-2xl md:!text-3xl">
        {new Date(election.endDate).getFullYear()} {election.type} Election
      </H1>
      <BallotInstructions />

      <Separator className="w-full my-4" />

      <BallotForm election={election} />
    </div>
  );
}

export function BallotForm({ election }: { election: Election }) {
  const requiredSelections = election.type === ElectionType.NATIONAL ? 14 : 12;

  const router = useRouter();
  const form = useForm<z.infer<typeof electionVoteSchema>>({
    resolver: zodResolver(electionVoteSchema),
  });

  const [confirmVote, setConfirmVote] = useState(false);

  function onSubmit(formData: z.infer<typeof electionVoteSchema>) {
    if (!confirmVote) {
      toast.error('Please confirm your vote before submitting.');
      return;
    }

    console.log(formData);
    toast.success('You submitted your vote!\n');
    router.push(
      `/elections/${election.type}/${new Date(election.endDate).getFullYear()}`
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Progress
          value={Math.min(
            (((form.watch('presidents')?.length || 0) +
              (form.watch('vicePresidents')?.length || 0) +
              (form.watch('senators')?.length || 0)) /
              requiredSelections) *
              100,
            100
          )}
          className="mb-4"
        />

        {election.type === ElectionType.NATIONAL && (
          <>
            <div className="mb-3">
              <H3 className="text-center !text-xl !mb-0" anchor="presidents">
                Presidents
              </H3>
              <span className="text-sm text-muted-foreground">Vote for 1</span>
            </div>

            <FormField
              control={form.control}
              name="presidents"
              render={() => (
                <FormItem>
                  <FormMessage />
                  <FormControl>
                    <div>
                      <BallotSelect
                        candidates={election.presidents || []}
                        limit={1}
                        defaultValue={[]}
                        onValueChange={(value) => {
                          form.setValue('presidents', value);
                        }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="mb-3">
              <H3
                className="text-center !text-xl !mb-0"
                anchor="vice-presidents"
              >
                Vice Presidents
              </H3>
              <span className="text-sm text-muted-foreground">Vote for 1</span>
            </div>
            <FormField
              control={form.control}
              name="vicePresidents"
              render={() => (
                <FormItem>
                  <FormMessage />
                  <FormControl>
                    <div>
                      <BallotSelect
                        candidates={election.vicePresidents || []}
                        limit={1}
                        defaultValue={[]}
                        onValueChange={(value) => {
                          form.setValue('vicePresidents', value);
                        }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        )}

        <div className="mb-3">
          <H3 className="text-center !text-xl !mb-0" anchor="senators">
            Senators
          </H3>
          <span className="text-sm text-muted-foreground">Vote for 12</span>
        </div>
        <FormField
          control={form.control}
          name="senators"
          render={() => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <div>
                  <BallotSelect
                    candidates={election.senators || []}
                    limit={12}
                    defaultValue={[]}
                    onValueChange={(value) => {
                      form.setValue('senators', value);
                    }}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Separator className="w-full my-4" />

        <div className="flex justify-center">
          <div className="w-fit min-w-48 mt-4 p-4 md:p-6 border rounded-xl flex flex-col gap-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <CircleAlertIcon size={12} /> Please review your vote.
            </span>

            <div className="flex items-center gap-1">
              <Checkbox
                id="confirm-vote"
                checked={confirmVote}
                onCheckedChange={() => setConfirmVote(!confirmVote)}
              />
              <label
                htmlFor="confirm-vote"
                className="text-xs text-muted-foreground"
              >
                I have reviewed my vote and confirm it is correct.
              </label>
            </div>

            <Button type="submit">Submit Vote</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

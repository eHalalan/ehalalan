'use client';

import { Election, ElectionType } from '@/types/election';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { H3, H4 } from '@/components/ui/headings';
import { ElectionChart } from './ElectionChart';
import { BarChart2Icon, UsersRoundIcon } from 'lucide-react';

interface Props {
  election: Election;
  voted: number;
  registered: number;
}

export function ElectionResults({ election, voted, registered }: Props) {
  return (
    <div className="w-full sm:w-3/4 md:w-1/2 mx-auto p-1 space-y-8">
      <div className="py-4 flex flex-col justify-center bg-primary/10 text-primary text-center rounded-xl border-2 border-primary">
        <H3 className="!text-xl flex gap-1 items-center justify-center">
          <UsersRoundIcon /> Voter Turnout
        </H3>
        <span className="text-5xl font-bold">
          {(isNaN(voted / registered) ? 0 : (voted / registered) * 100).toFixed(
            2
          )}
          %
        </span>
        <span className="font-semibold">
          {voted.toLocaleString()} / {registered.toLocaleString()}
        </span>
      </div>

      <div>
        <H3 className="!text-2xl mb-2" anchor="vote-breakdown">
          <BarChart2Icon />
          Vote Breakdown
        </H3>
        <hr className="mb-4" />
        <Accordion type="multiple" className="mb-6">
          {election.type === ElectionType.NATIONAL && (
            <>
              <AccordionItem value="president">
                <AccordionTrigger>
                  <H4 className="!text-lg">President</H4>
                </AccordionTrigger>
                <AccordionContent>
                  <ElectionChart
                    candidates={
                      election.presidents?.sort(
                        (a, b) => b.voteCount - a.voteCount
                      ) || []
                    }
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="vicePresident">
                <AccordionTrigger>
                  <H4 className="!text-lg">Vice President</H4>
                </AccordionTrigger>
                <AccordionContent>
                  <ElectionChart
                    candidates={
                      election.vicePresidents?.sort(
                        (a, b) => b.voteCount - a.voteCount
                      ) || []
                    }
                  />
                </AccordionContent>
              </AccordionItem>
            </>
          )}
          <AccordionItem value="senator">
            <AccordionTrigger>
              <H4 className="!text-lg">Senator</H4>
            </AccordionTrigger>
            <AccordionContent>
              <ElectionChart
                candidates={election.senators.sort(
                  (a, b) => b.voteCount - a.voteCount
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

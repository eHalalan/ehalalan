import React from 'react';
import { Metadata } from 'next';
import { getElections } from '@/lib/election';
import { ElectionsList } from './ElectionsList';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-with-url';
import { H1 } from '@/components/ui/headings';

export const metadata: Metadata = {
  title: 'Elections | eHalalan',
  description: 'eHalalan Elections',
};

export default async function BallotPage() {
  const elections = await getElections();

  return (
    <>
      <H1 className="mb-3">Elections</H1>

      <Tabs defaultValue="ongoing">
        <TabsList className="w-full">
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="ended">Ended</TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing">
          <ElectionsList
            elections={elections.filter((election) => election.isActive)}
          />
        </TabsContent>
        <TabsContent value="ended">
          <ElectionsList
            elections={elections.filter((election) => !election.isActive)}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}

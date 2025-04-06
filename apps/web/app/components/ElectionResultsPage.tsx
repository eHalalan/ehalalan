'use client';

import React, { useState, useEffect } from 'react';
import { Election, ElectionType } from '@/types/election';
import { getElection } from '@/lib/election';
import { Spinner } from '@/components/ui/spinner';
import { ElectionStatusBadge } from '@/app/elections/ElectionStatusBadge';
import { Progress } from '@/components/ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



interface Candidate {
  name: string;
  party: string;
  voteCount: number;
}

const ElectionResultsPage: React.FC = () => {
  const [election, setElection] = useState<Election | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedSections, setExpandedSections] = useState<{
    president: boolean;
    vicePresident: boolean;
    senator: boolean;
  }>({
    president: true,
    vicePresident: false,
    senator: false,
  });

  useEffect(() => {
    const fetchElection = async () => {
      setLoading(true);
      try {
        // Using the current year (2025) and NATIONAL election type
        const electionData = await getElection(ElectionType.NATIONAL, 2025);
        setElection(electionData);
      } catch (error) {
        console.error('Error fetching election data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchElection();
  }, []);

  const toggleSection = (section: 'president' | 'vicePresident' | 'senator') => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Mock data for demonstration purposes
  const mockCandidates = [
    { name: 'Ezra Magbanua', party: 'Unity', voteCount: 20 },
    { name: 'Andrian Maagma', party: 'Progress', voteCount: 12 },
    { name: 'Kristan Jay Gabay', party: 'People\'s', voteCount: 9 },
    { name: 'Michael Patrick Pelegrino', party: 'Reform', voteCount: 8 },
    { name: 'Shaina Marie Talisay', party: 'Justice', voteCount: 5 },
    { name: 'Kimberly Arcena', party: 'Freedom', voteCount: 4 },
  ];

  // For demonstration, we'll show the mock data instead of actual election data
  const renderCandidateList = (candidates: Candidate[]) => {
    const maxVotes = Math.max(...candidates.map(c => c.voteCount));

    return mockCandidates.map((candidate) => (
      <div key={candidate.name} className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <span>{candidate.name}</span>
          <span>{candidate.voteCount}</span>
        </div>
          <Progress value={(candidate.voteCount / maxVotes) * 100} />
      </div>
    ));
  };

  if (loading) {
    return <div className="w-full flex justify-center"><Spinner /></div>;
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Presidential Election 2025 Results</h1>

      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <div>Started: April 7, 2025</div>
        <div>Ended: {election?.endDate.toLocaleDateString('en-US')}</div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <span className="font-semibold mr-2">Status:</span>
          {election && <ElectionStatusBadge election={election} />}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Voter Turnout</h2>
        <div className="bg-blue-500 text-white text-center py-4 text-2xl rounded">
          50 / 68,618,667
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">Vote Breakdown</h2>
      <hr className="mb-4" />
      <Accordion type="multiple" className="mb-6">
        <AccordionItem value="president">
          <AccordionTrigger>President</AccordionTrigger>
          <AccordionContent>
            {renderCandidateList(mockCandidates)}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="vicePresident">
          <AccordionTrigger>Vice President</AccordionTrigger>
          <AccordionContent>
            {renderCandidateList(mockCandidates)}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="senator">
          <AccordionTrigger>Senator</AccordionTrigger>
          <AccordionContent>
            {renderCandidateList(mockCandidates)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-8 text-sm">
        <div className="mb-2">
          Link to the public ledger: <a href="#" className="text-blue-600 underline">TokHack Smart Contracts - Figma</a>
        </div>
        <div>
          <a href="#" className="text-blue-600 underline">How voting with smart contracts work</a>
        </div>
      </div>
    </div>
  );
};

export default ElectionResultsPage;
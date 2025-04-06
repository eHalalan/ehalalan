import React from 'react';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { H2, H3 } from '@/components/ui/headings';
import { UserGreeting } from './UserGreeting';

export const metadata: Metadata = {
  title: 'Dashboard | eHalalan',
  description: 'eHalalan election system dashboard',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <UserGreeting />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <H2>Announcements</H2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-4">
            <p className="text-lg font-medium">
              2025 National Elections will end on April 6, 2026.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <H2>How to vote?</H2>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <H3>STEP 1 Register an account</H3>
            <ol className="list-decimal list-inside pl-5 space-y-1">
              <li>
                Fill out the registration form with your personal details.
              </li>
              <li>Submit the form and wait account verification.</li>
            </ol>
          </div>

          <div className="space-y-2">
            <H3>STEP 2 Connect your Metamask Wallet</H3>
            <ol className="list-decimal list-inside pl-5 space-y-1">
              <li>Click the Connect your Metamask Account button.</li>
              <li>Metamask will prompt you to approve the connection.</li>
              <li>Select your account and connect.</li>
            </ol>
          </div>

          <div className="space-y-2">
            <H3>STEP 3 Cast Your Vote</H3>
            <ol className="list-decimal list-inside pl-5 space-y-1">
              <li>Navigate to the Elections page.</li>
              <li>You will see a list of active elections under ongoing.</li>
              <li>Choose and select a ballot.</li>
              <li>Click vote button to proceed to vote.</li>
              <li>Click on your chosen candidate(s) and confirm your vote.</li>
              <li>MetaMask will pop up to request a transaction signature.</li>
              <li>Click Submit Vote to submit your vote on blockchain.</li>
            </ol>
          </div>

          <div className="space-y-2">
            <H3>STEP 4 View Results</H3>
            <ol className="list-decimal list-inside pl-5 space-y-1">
              <li>Go to the Results page.</li>
              <li>
                You&apos;ll see the real-time or final tally of votes as stored
                on the blockchain.
              </li>
              <li>
                Results update dynamically as new votes are submitted and
                confirmed.
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <H2>Guidelines and Reminders</H2>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ol className="list-decimal list-inside pl-5 space-y-1">
            <li>Double-check your ballot before submitting.</li>
            <li>You can vote only once.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

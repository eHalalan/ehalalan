'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExternalLink } from '@/components/ui/external-link';
import { H3 } from '@/components/ui/headings';
import { HelpCircleIcon } from 'lucide-react';

export function VotingGuide() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <H3 className="!text-xl">STEP 1. Register an Account</H3>

        <ol className="list-decimal list-inside space-y-1">
          <li>
            Fill out the{' '}
            <ExternalLink href="/register">registration form</ExternalLink> with
            your personal details.
          </li>
          <li>Submit the form and wait for account verification.</li>
          <li>
            Once verified, you can{' '}
            <ExternalLink href="/login">log in</ExternalLink>.
          </li>
        </ol>
      </div>

      <div className="space-y-2">
        <H3 className="!text-xl">
          STEP 2. Create and Connect Your MetaMask Wallet
        </H3>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            <ExternalLink href="https://metamask.io/download">
              Install Metamask
            </ExternalLink>{' '}
            and create an account.
          </li>
          <li>Click the Connect Wallet button.</li>
          <li>Metamask will ask you to approve the connection.</li>
          <li>Select your account and connect.</li>

          <Alert className="w-fit my-2 bg-primary/10 border-primary/50">
            <HelpCircleIcon className="h-4 w-4" />
            <AlertTitle>What is Metamask?</AlertTitle>
            <AlertDescription>
              <p>
                <ExternalLink href="https://support.metamask.io/start/getting-started-with-metamask/">
                  Metamask
                </ExternalLink>{' '}
                is a web browser extension and mobile app that allows you to
                manage your Ethereum private keys.
                <br />
                By doing so, it serves as a wallet (like a digital ID for
                voting) that allows you to interact with apps like eHalalan.
              </p>
            </AlertDescription>
          </Alert>
        </ol>
      </div>

      <div className="space-y-2">
        <H3 className="!text-xl">STEP 3. Cast Your Vote</H3>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            Navigate to the{' '}
            <ExternalLink href="/elections">Elections page</ExternalLink> to
            view the current elections.
          </li>
          <li>Select a ballot and click the Vote button to proceed.</li>
          <li>
            Read the instructions carefully and select your desired
            candidate(s).
          </li>
          <li>Confirm and click Submit Vote to finalize your vote.</li>
          <li>MetaMask will ask you to approve the vote—confirm it.</li>
        </ol>
      </div>

      <div className="space-y-2">
        <H3 className="!text-xl">STEP 4. View Results</H3>
        <ol className="list-decimal list-inside space-y-1">
          <li>Go back to the page of the election you participated in.</li>
          <li>
            You&apos;ll see the real-time or final tally of votes stored on the
            blockchain.
          </li>
        </ol>
      </div>
    </div>
  );
}

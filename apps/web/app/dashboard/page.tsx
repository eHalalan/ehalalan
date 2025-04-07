import { Metadata } from 'next';
import { UserGreeting } from './UserGreeting';
import { AnnouncementList } from './AnnouncementList';
import { LatestResults } from './LatestResults';
import { VotingGuide } from './VoteringGuide';
import { Guidelines } from './Guidelines';
import { H2 } from '@/components/ui/headings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart2Icon,
  BookOpenTextIcon,
  MegaphoneIcon,
  VoteIcon,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard | eHalalan',
  description: 'eHalalan election system dashboard',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <UserGreeting />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="gap-1 motion-preset-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-1">
              <MegaphoneIcon />
              <H2 className="!text-2xl">Announcements</H2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnnouncementList />
          </CardContent>
        </Card>

        <Card className="gap-1 motion-preset-slide-up motion-delay-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-1">
              <BarChart2Icon />
              <H2 className="!text-2xl">Latest Results</H2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LatestResults />
          </CardContent>
        </Card>
      </div>

      <Card className="gap-1 motion-preset-slide-up motion-delay-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            <VoteIcon />
            <H2 className="!text-2xl">How to vote?</H2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <VotingGuide />
        </CardContent>
      </Card>

      <Card className="gap-1 motion-preset-slide-up motion-delay-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            <BookOpenTextIcon />
            <H2 className="!text-2xl">Guidelines and Reminders</H2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Guidelines />
        </CardContent>
      </Card>
    </div>
  );
}

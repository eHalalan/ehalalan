import React from 'react';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/nav/ThemeToggle';
import { H1, H2, H3, H4, H5, H6 } from '@/components/ui/headings';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThumbsUpIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Design',
  description: 'Design elements and guidelines for eHalalan.',
};

interface ColorCardProps {
  className?: string;
  children: React.ReactNode;
}

function ColorCard({ className = '', children }: ColorCardProps) {
  return (
    <div className={cn('w-full p-3', className)}>
      <span className="text-sm">{children}</span>
    </div>
  );
}

export default function DesignPage() {
  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <H1>eHalalan Design</H1>
        <ThemeToggle />
      </div>

      <H2 anchor="colors">Colors</H2>

      <H3>Base</H3>
      <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <ColorCard className="bg-background">Background</ColorCard>
        <ColorCard className="bg-foreground text-background">
          Foreground
        </ColorCard>
        <ColorCard className="bg-primary text-primary-foreground">
          Primary
        </ColorCard>
        <ColorCard className="bg-secondary text-secondary-foreground">
          Secondary
        </ColorCard>
        <ColorCard className="bg-tertiary text-tertiary-foreground">
          Tertiary
        </ColorCard>
        <ColorCard className="bg-muted text-muted-foreground">Muted</ColorCard>
        <ColorCard className="bg-accent text-accent-foreground">
          Accent
        </ColorCard>
      </div>

      <H3>State</H3>
      <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <ColorCard className="bg-destructive text-destructive-foreground">
          Destructive
        </ColorCard>
        <ColorCard className="bg-warning text-warning-foreground">
          Warning
        </ColorCard>
      </div>

      <H2 anchor="typography">Typography</H2>
      <H3>Headings</H3>
      <div className="mb-3 p-3 rounded-lg border flex flex-col gap-3">
        <H1>Heading 1</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <H4>Heading 4</H4>
        <H5>Heading 5</H5>
        <H6>Heading 6</H6>
      </div>
      <H3>Body</H3>
      <div className="mb-3 p-3 rounded-lg border flex flex-col gap-3">
        <p className="text-xl">
          TextXL - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-lg">
          TextLG - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-base">
          TextBase - Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-sm">
          TextSM - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <H2 anchor="buttons">Buttons</H2>
      <div className="mb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="mb-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button variant="outline" size="default">
          Default
        </Button>
        <Button variant="outline" size="sm">
          Small
        </Button>
        <Button variant="outline" size="icon">
          <ThumbsUpIcon />
        </Button>
      </div>

      <H2 anchor="badges">Badges</H2>
      <div className="mb-3 flex flex-wrap gap-3">
        <Badge variant="default">default</Badge>
        <Badge variant="secondary">secondary</Badge>
        <Badge variant="destructive">destructive</Badge>
        <Badge variant="outline">outline</Badge>
      </div>

      <H3 anchor="cards">Cards</H3>
      <div className="mb-3 flex flex-col gap-3">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
      </div>

      <H3 anchor="inputs">Inputs</H3>
      <div className="mb-3 flex flex-col gap-3">
        <Input placeholder="Text input" />
        <FloatingLabelInput label="Floating label input" />
        <Textarea placeholder="Text area" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Choice" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Apple</SelectItem>
            <SelectItem value="b">Banana</SelectItem>
            <SelectItem value="c">Coconut</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Checkbox id="check" />
          <label htmlFor="check" className="text-sm font-medium">
            Check
          </label>
        </div>
      </div>
    </div>
  );
}

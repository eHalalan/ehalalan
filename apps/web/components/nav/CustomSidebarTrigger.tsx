'use client';

import { useSidebar } from '../ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';

export function CustomSidebarTrigger() {
  const { isMobile, open, toggleSidebar } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="w-fit h-fit p-2"
          onClick={toggleSidebar}
        >
          {isMobile || !open ? <PanelRightClose /> : <PanelRightOpen />}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="flex items-center gap-1">
        {isMobile || !open ? 'Open sidebar' : 'Close sidebar'} (Ctrl + B)
      </TooltipContent>
    </Tooltip>
  );
}

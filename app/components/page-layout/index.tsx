/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PageLayoutLeft from './page-layout-left';
import PageLayoutCenter from './page-layout-center';
import PageLayoutRight from './page-layout-right';
import SparksIcon from '../sparks-icon';

interface PageLayoutProps{
    children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="h-screen w-screen bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-12 h-screen">
        <PageLayoutLeft />
        <PageLayoutCenter>
            <div className="flex flex-col gap-0 items-start">
              <div className="flex md:hidden mt-2 ml-3">
                <SparksIcon />
              </div>
              {children}
            </div>
        </PageLayoutCenter>
        <PageLayoutRight />
      </div>
    </main>
  );
}
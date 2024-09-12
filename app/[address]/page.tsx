import React from "react";
import { headers } from 'next/headers';
import PageLayout from "../components/page-layout";
import Profile from "../components/profile";

export default function AddressPage() {
  const headerList = headers();
  const pathname = headerList.get("x-current-path") as string;
  const pathnameParts = pathname.split('/');
  const address = pathnameParts[1];

  return (
    <PageLayout>
      <Profile address={address} />
    </PageLayout>
  );
}

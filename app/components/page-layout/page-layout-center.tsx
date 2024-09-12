import React from "react";

export default function PageLayoutCenter({ children } : { children: React.ReactNode }){
    return (
        <section className="col-span-1 md:col-span-6 overflow-y-scroll">
          {children}
        </section>
    );
  }
  
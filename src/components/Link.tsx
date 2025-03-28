"use client";

import useBack from "@/store/back";
import NextLink, { type LinkProps } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { type ReactNode, useMemo } from "react";

interface IProps extends LinkProps {
  clearAll?: boolean;
  children?: ReactNode;
}

export default function Link({ clearAll, onClick, ...props }: IProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = useMemo(
    () => `${pathname}?${searchParams.toString()}`,
    [pathname, searchParams],
  );

  const { addHref, removeAll } = useBack();

  return (
    <NextLink
      onClick={e => {
        addHref(url);
        if (clearAll) removeAll();
        if (onClick) onClick(e);
      }}
      {...props}
    >
      {props.children}
    </NextLink>
  );
}

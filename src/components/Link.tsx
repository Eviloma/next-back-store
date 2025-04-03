"use client";

import useBack from "@/store/back";
import NextLink, { type LinkProps } from "next/link";
import {
  type ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { type ReactNode, useMemo } from "react";

interface IProps extends LinkProps {
  clearAll?: boolean;
  children?: ReactNode;
  pathname?: string;
  searchParams?: URLSearchParams | ReadonlyURLSearchParams;
  anchor?: string;
}

export default function Link({
  clearAll,
  onClick,
  pathname,
  searchParams,
  anchor,
  ...props
}: IProps) {
  const currentPathname = usePathname();
  const currentSearchParams = useSearchParams();

  const url = useMemo(
    () =>
      `${pathname || currentPathname}?${searchParams?.toString() || currentSearchParams.toString()}${anchor ? `#${anchor}` : ""}`,
    [pathname, currentPathname, currentSearchParams, searchParams, anchor],
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

# Next Back Store

Component library for Next.js to allow easy create back button with save search params.

## Table of Content

- [Requirements](#requirements)
- [Initial project](#initial-project)
  - [Provider](#provider)
  - [Link](#link)
- [Example of use](#example-of-use)

## Requirements

- Next.js 15
- React 19

## Initial project

### Provider

To use this library, you need to add the provider to the main layout (`app/layout.tsx`) of the project.
Since the Provider contains context, you need to wrap it in a client component

Create a file with providers (`/app/component/Providers.tsx`)

```tsx
"use client";

import { BackStoreProvider } from "@eviloma/next-back-store";

interface IProps{
  children: ReactNode
}

export default function Providers({ children }: IProps) {
  return <BackStoreProvider>{children}</BackStoreProvider>
}
```

And add this component to the main layout (`app/layout.tsx`)
```tsx
import Providers from "./components/Providers";

interface IProps{
  children: ReactNode
}

export default function Layout({ children }: IProps) {
  return
  <html>
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
}
```

### Link

The library provides an advanced `Link` component that automatically creates a history on click

You can additionally pass optional parameters to this component:
- clearAll (`boolean`) - clear all history. Default: `false`;
- pathname (`string`) - pass path to history link. Default: current path (result of `usePathname`);
- searchParams (`URLSearchParams | ReadonlyURLSearchParams`) - pass search params to history link. Default: current search params (result of `useSearchParams`);
- anchor (`string`) - pass anchor to history link. Default empty string;

## Example of use

- Create Link button with save current url
```tsx
import { Link } from "@eviloma/next-back-store";

export default function GoToOrders(){
  <Link href="/orders">Orders</Link>
}
```

- Create Link button, but clear all history (ex. home button)
```tsx
import { Link } from "@eviloma/next-back-store";

export default function GoToHome(){
  <Link href="/" clearAll>Home</Link>
}
```

- Create Back button
```tsx
import { useBack } from "@eviloma/next-back-store";
import { Link } from 'next/link'; // Use default Link component for back button!!

export default function BackButton(){
  const { getLastHref, removeLast } = useBack();

  const href = useMemo(() => getLastHref(), [getLastHref]);

  if (!href) return null; // Don't render if there is no history

  // Add default Link component with onClick handler for remove last history item
  return <Link href={href} onClick={removeLast}>Back</Link>
}
```

If you need custom button or else, you can import `useBack` hook and use the methods directly

- `hrefs` (`string[]`) - history array (prefer use methods below)
- `addHref` (`(href: string) => void`) - add history item
- `getLastHref` (`() => string | undefined`) - get last history item
- `removeLast` (`() => void`) - remove last history item
- `removeAll` (`() => void`) - remove all history

# Next Back Store

Component library for Next.js to allow easy create back button with save search params.

## How to use

Add Provider to page layout

```tsx
// src/app/components/Providers.tsx
"use client";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <BackStoreProvider>{children}</BackStoreProvider>
}

// /src/app/layout.tsx
import Providers from "./components/Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return(
    ...
    <Providers>{children}</Providers>
    ...
  )
}
```

If you need to safe search params use `Link` from this library

```tsx
import { Link } from "@eviloma/next-back-store";

export default function GoToOrderButton(){
  return <Link href="/orders/1">Go To</Link>
}
```

For back button, import `useBack` from this library

```tsx
"use client";
import { useBack } from "@eviloma/next-back-store";

export default function BackButton(){
  const {getLastHref, removeLast} = useBack();

  if (!getLastHref()) return null;

  // For this button don't use `Link` for library!!!
  return <Link href={getLastHref()} onClick={removeLast}>Back</Link>
}
```

If you need remove all back routes use `removeAll` from this library

```tsx
import { useBack, Link } from "@eviloma/next-back-store";

export default function BackButton(){
  const {removeAll} = useBack();

  return <button onClick={removeAll}>Back</button>
}
```

or add `clearAll` prop to `Link` in this library

```tsx
import { Link } from "@eviloma/next-back-store";

export default function BackButton(){
  return <Link href="/" clearAll>Home</Link>
}
```


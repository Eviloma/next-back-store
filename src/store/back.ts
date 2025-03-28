import { create } from "zustand";

interface BackStoreProps {
  hrefs: string[];
}

interface BackStoreActions {
  addHref: (href: string) => void;
  getLastHref: () => string | undefined;
  removeLast: () => void;
  removeAll: () => void;
}

export interface BackStore extends BackStoreProps, BackStoreActions {}

const initialStoreProps: BackStoreProps = {
  hrefs: [],
};

const useBack = create<BackStore>((set, get) => ({
  ...initialStoreProps,

  addHref: href => set(s => ({ hrefs: [...s.hrefs, href] })),
  getLastHref: () => get().hrefs.at(-1),
  removeLast: () => set(s => ({ hrefs: s.hrefs.slice(0, -1) })),
  removeAll: () => set(() => ({ hrefs: [] })),
}));

export default useBack;

import { createContextId } from "@builder.io/qwik";
import type { ThemePreference } from './components/theme-switcher/theme-switcher';

export interface SiteStore {
    theme: ThemePreference | 'auto'
}

export const GlobalStore = createContextId<SiteStore>('site-store');

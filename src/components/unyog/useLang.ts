"use client";

import { useSyncExternalStore } from "react";
import type { Lang } from "@/lib/unyog";

// A tiny language store. English by default. "?lang=nl" in the URL opens the
// page in Dutch, and switching language keeps the URL in sync so a shared
// link opens in the same language.

const listeners = new Set<() => void>();
let current: Lang | null = null;

function read(): Lang {
  if (current === null) {
    const param = new URLSearchParams(window.location.search).get("lang");
    current = param === "nl" ? "nl" : "en";
  }
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setLang(lang: Lang) {
  current = lang;
  const url = new URL(window.location.href);
  if (lang === "en") url.searchParams.delete("lang");
  else url.searchParams.set("lang", lang);
  window.history.replaceState(null, "", url);
  listeners.forEach((l) => l());
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, read, () => "en");
}

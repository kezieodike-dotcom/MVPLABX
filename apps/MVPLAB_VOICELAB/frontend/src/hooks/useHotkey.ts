import { useCallback, useEffect, useRef } from "react";
import { listen, type UnlistenFn } from "@tauri-apps/api/event";

interface UseHotkeyOptions {
  /** Called when Ctrl+Space is pressed (PTT start) */
  onStart: () => void;
  /** Called when Ctrl+Space is released (PTT stop) */
  onStop: () => void;
}

/**
 * Subscribes to push-to-talk events emitted by the Rust layer.
 *
 * The Rust side registers Ctrl+Space as a global OS-level shortcut via
 * tauri-plugin-global-shortcut and emits:
 *   • "ptt-start"  — on key press
 *   • "ptt-stop"   — on key release
 *
 * Events fire even when Voice Lab is not the focused window, enabling
 * the user to dictate while working in VS Code, a terminal, etc.
 */
export function useHotkey({ onStart, onStop }: UseHotkeyOptions): void {
  const unlistenFns = useRef<UnlistenFn[]>([]);

  // Keep stable refs so event handlers never go stale without re-subscribing
  const onStartRef = useRef(onStart);
  const onStopRef = useRef(onStop);
  onStartRef.current = onStart;
  onStopRef.current = onStop;

  const setup = useCallback(async () => {
    const unStart = await listen<void>("ptt-start", () => onStartRef.current());
    const unStop = await listen<void>("ptt-stop", () => onStopRef.current());
    unlistenFns.current = [unStart, unStop];
  }, []);

  useEffect(() => {
    setup().catch((err) =>
      console.error("[useHotkey] Failed to register PTT listeners:", err),
    );

    return () => {
      unlistenFns.current.forEach((fn) => fn());
      unlistenFns.current = [];
    };
  }, [setup]);
}

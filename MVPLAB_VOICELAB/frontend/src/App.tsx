import { useCallback, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

import "./App.css";
import "./styles/design-system.css";
import OverlayIndicator from "./components/OverlayIndicator";
import { useVoiceStream, type TranscriptEvent } from "./hooks/useVoiceStream";
import { useHotkey } from "./hooks/useHotkey";

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isFinal, setIsFinal] = useState(false);

  // Accumulate the last final transcript so we can inject it on PTT release
  const finalTextRef = useRef("");

  // ── Transcript handler ────────────────────────────────────────────────────

  const handleTranscript = useCallback((event: TranscriptEvent) => {
    if (event.type === "error") {
      console.error("[transcript error]", event.text);
      return;
    }
    setTranscript(event.text);
    setIsFinal(event.type === "final");
    if (event.type === "final") {
      finalTextRef.current = event.text;
    }
  }, []);

  const { startStreaming, stopStreaming, error } = useVoiceStream({
    onTranscript: handleTranscript,
  });

  // ── PTT lifecycle ─────────────────────────────────────────────────────────

  const handleStart = useCallback(async () => {
    setTranscript("");
    setIsFinal(false);
    finalTextRef.current = "";
    setIsRecording(true);
    await startStreaming();
  }, [startStreaming]);

  const handleStop = useCallback(async () => {
    setIsRecording(false);
    await stopStreaming();

    // Inject the final transcript at whatever cursor position the OS has
    const text = finalTextRef.current.trim();
    if (text) {
      try {
        await invoke<void>("inject_text", { text });
      } catch (err) {
        console.error("[inject_text] failed:", err);
      }
    }
  }, [stopStreaming]);

  // Wire global OS-level Ctrl+Space hotkey (emitted by Rust)
  useHotkey({ onStart: handleStart, onStop: handleStop });

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="container" style={{ padding: "40px" }}>
      <header style={{ marginBottom: "60px" }}>
        <h1
          style={{
            background: "linear-gradient(to right, #7c3aed, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "3rem",
            fontWeight: 800,
            margin: 0,
          }}
        >
          Voice Lab
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", marginTop: "8px" }}>
          Real-time AI voice-to-text for developers.
        </p>
      </header>

      <main className="glass-card" style={{ padding: "30px", textAlign: "center" }}>
        <p style={{ marginBottom: "24px", color: "var(--text-secondary)" }}>
          Hold{" "}
          <kbd
            style={{
              background: "#2a2a2e",
              padding: "4px 10px",
              borderRadius: "4px",
              border: "1px solid #444",
              color: "var(--text-primary)",
              fontFamily: "monospace",
            }}
          >
            Ctrl + Space
          </kbd>{" "}
          anywhere to dictate. Release to inject text.
        </p>

        {/* On-screen fallback button — mirrors PTT behaviour */}
        <button
          className="btn-primary"
          onMouseDown={handleStart}
          onMouseUp={handleStop}
          style={{ width: "220px", height: "52px", fontSize: "1rem" }}
        >
          {isRecording ? "● Recording…" : "Hold to Record"}
        </button>

        {error && (
          <p
            style={{
              color: "var(--error)",
              marginTop: "16px",
              fontSize: "0.85rem",
              opacity: 0.9,
            }}
          >
            {error}
          </p>
        )}
      </main>

      {/* Floating overlay — shows live transcript */}
      <OverlayIndicator
        isRecording={isRecording}
        transcript={transcript}
        isFinal={isFinal}
      />

      <footer
        style={{
          marginTop: "auto",
          paddingTop: "40px",
          color: "var(--text-secondary)",
          fontSize: "0.85rem",
        }}
      >
        <p>
          Backend:{" "}
          <span style={{ color: error ? "var(--error)" : "var(--success)" }}>
            {error ? "Unreachable" : "Ready"}
          </span>
        </p>
      </footer>
    </div>
  );
}

export default App;

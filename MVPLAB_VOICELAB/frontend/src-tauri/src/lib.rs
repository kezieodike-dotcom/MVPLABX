use enigo::{Enigo, Keyboard, Settings};
use tauri::AppHandle;
use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState};

/// Simulate typing `text` at the current OS cursor position.
///
/// Called from the React layer once a final Deepgram transcript arrives.
/// Uses `enigo` to synthesise key events — works system-wide (VS Code,
/// terminal, browser, etc.) without requiring clipboard access.
#[tauri::command]
fn inject_text(text: String) -> Result<(), String> {
    let mut enigo = Enigo::new(&Settings::default()).map_err(|e| e.to_string())?;
    enigo.text(&text).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Ctrl+Space — the push-to-talk shortcut
    let ptt = Shortcut::new(Some(Modifiers::CONTROL), Code::Space);

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_global_shortcut::Builder::new()
                .with_handler(move |app: &AppHandle, shortcut: &Shortcut, event| {
                    if shortcut == &ptt {
                        match event.state() {
                            ShortcutState::Pressed => {
                                // Broadcast to all JS listeners → starts mic + WebSocket
                                let _ = app.emit("ptt-start", ());
                            }
                            ShortcutState::Released => {
                                // Broadcast to all JS listeners → stops stream + injects text
                                let _ = app.emit("ptt-stop", ());
                            }
                        }
                    }
                })
                .build(),
        )
        .invoke_handler(tauri::generate_handler![inject_text])
        .run(tauri::generate_context!())
        .expect("error while running Voice Lab");
}

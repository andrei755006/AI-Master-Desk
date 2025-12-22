#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
      .plugin(
        tauri_plugin_log::Builder::default()
          .level(log::LevelFilter::Info)
          // Если хотите логи только в дебаге, можно оставить условие здесь,
          // но лучше инициализировать плагин всегда, чтобы избежать паник на фронтенде.
          .build(),
      )
    .setup(|_app| {
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

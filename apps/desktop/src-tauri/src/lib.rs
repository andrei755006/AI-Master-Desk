use std::time::Duration;
use serde::{Serialize};
use tauri::Emitter; // Позволяет Rust "кричать" фронтенду о прогрессе

// Структура данных для отправки прогресса
#[derive(Serialize, Clone)]
struct ProgressPayload {
    progress: u32,
    status: String,
}

// Наша основная команда обработки
#[tauri::command]
async fn process_audio(window: tauri::Window, path: String) -> Result<String, String> {
    println!("Starting AI Mastering for: {}", path);

    // Имитируем этапы работы AI-движка
    for i in 1..=10 {
        // Спим 300мс, имитируя тяжелые вычисления
        std::thread::sleep(Duration::from_millis(300));

        // Отправляем событие во фронтенд
        window.emit("mastering-progress", ProgressPayload {
            progress: i * 10,
            status: format!("AI Analyzing frame {}...", i),
        }).map_err(|e| e.to_string())?;
    }

    Ok("Success: Mastering Finished!".into())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init()) // Твой плагин диалогов
        .plugin(
            tauri_plugin_log::Builder::default()
                .level(log::LevelFilter::Info)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![process_audio]) // РЕГИСТРИРУЕМ КОМАНДУ ТУТ
        .setup(|_app| {
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
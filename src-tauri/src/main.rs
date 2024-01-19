// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod app;
pub mod routes;

use app::app;

struct Port(u16);

/// A command to get the usused port, instead of 3000.
#[tauri::command]
fn get_port(port: tauri::State<Port>) -> Result<String, String> {
    Ok(format!("{}", port.0))
}

fn main() {
    let port = portpicker::pick_unused_port().expect("failed to find unused port");
    tauri::async_runtime::spawn(app(port));

    tauri::Builder::default()
        .manage(Port(port))
        .invoke_handler(tauri::generate_handler![get_port])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

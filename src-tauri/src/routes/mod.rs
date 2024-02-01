mod api;

use api::create_api_routes;
use axum::{http::Method, Router};
use tower_http::cors::{Any, CorsLayer};

pub fn create_routes() -> Router {
    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_origin(Any);

    let api = create_api_routes();

    Router::new().nest("/api", api).layer(cors)
}

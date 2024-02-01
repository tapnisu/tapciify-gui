mod convert_raw;
mod query;

use axum::{routing::post, Router};
use convert_raw::convert_raw;

pub fn create_v1_routes() -> Router {
    Router::new().route("/convert/raw", post(convert_raw))
}

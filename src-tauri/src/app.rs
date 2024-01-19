use crate::routes::create_routes;

pub async fn app(port: u16) {
    let app = create_routes();

    let listener = tokio::net::TcpListener::bind(format!("0.0.0.0:{}", port))
        .await
        .unwrap();
    axum::serve(listener, app).await.unwrap();
}

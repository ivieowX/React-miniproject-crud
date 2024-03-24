<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$products = [];

// Fetch all products
$query = "SELECT * FROM product";
$result = mysqli_query($db, $query);

// Count total products
$countQuery = "SELECT COUNT(*) as total_products FROM product;";
$countResult = mysqli_query($db, $countQuery);
$totalProducts = mysqli_fetch_assoc($countResult)['total_products'];

if (mysqli_num_rows($result) > 0) {
    while ($product = mysqli_fetch_assoc($result)) {
        $products[] = $product;
    }
    http_response_code(200);
    echo json_encode(["success" => true, "products" => $products, "total_products" => $totalProducts]);
} else {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "No products found.", "total_products" => $totalProducts]);
}

mysqli_close($db);
?>

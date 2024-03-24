<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->product_id)
    && isset($data->name)
    && isset($data->price)
    && isset($data->description)
    && isset($data->stock)
) {
    $productId = mysqli_real_escape_string($db, $data->product_id);
    $name = mysqli_real_escape_string($db, $data->name);
    $price = mysqli_real_escape_string($db, $data->price);
    $description = mysqli_real_escape_string($db, $data->description);
    $stock = mysqli_real_escape_string($db, $data->stock);

    $query = "UPDATE product 
              SET name='$name', description='$description', price='$price', stock='$stock'
              WHERE product_id='$productId'";

    $result = mysqli_query($db, $query);

    if ($result) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update product."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid data format or missing fields."]);
}

mysqli_close($db);
?>

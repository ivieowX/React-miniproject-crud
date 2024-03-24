<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

include 'db_connection.php';

// ตรวจสอบว่ามีการส่งไฟล์ภาพมาหรือไม่
if(isset($_FILES['image'])) {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $description = $_POST['description'];
    $stock = $_POST['stock'];

    // ข้อมูลของไฟล์รูปภาพ
    $file = $_FILES['image'];
    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];
    $fileType = $file['type'];

    // ตรวจสอบประเภทของไฟล์รูปภาพ
    $fileExt = explode('.', $fileName);
    $fileActualExt = strtolower(end($fileExt));
    $allowed = array('jpg', 'jpeg', 'png', 'gif');

    // ตรวจสอบว่าไฟล์รูปภาพอยู่ในรูปแบบที่อนุญาตหรือไม่
    if (in_array($fileActualExt, $allowed)) {
        if ($fileError === 0) {
            if ($fileSize < 5000000) { // 5MB
                // กำหนดโฟลเดอร์ที่จะบันทึกรูปภาพ
                $uploadDir = 'uploads/';
                
                // สร้างชื่อไฟล์ใหม่และบันทึกรูปภาพ
                $fileNameNew = uniqid('', true) . "." . $fileActualExt;
                $fileDestination = $uploadDir . $fileNameNew;
                move_uploaded_file($fileTmpName, $fileDestination);

                // ใช้ mysqli_real_escape_string เพื่อป้องกัน SQL Injection
                $name = mysqli_real_escape_string($db, $name);
                $description = mysqli_real_escape_string($db, $description);

                // Query สำหรับ Insert ข้อมูล
                $query = "INSERT INTO product (name, price, description, stock, image) VALUES ('$name', '$price', '$description', '$stock', '$fileDestination')";
                
                $result = mysqli_query($db, $query);

                if ($result) {
                    echo json_encode(["success" => true, "message" => "Product added successfully."]);
                } else {
                    echo json_encode(["success" => false, "message" => "Failed to add product."]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "File size is too large."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "There was an error uploading your file."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid file type. Allowed types: jpg, jpeg, png, gif"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "No image file uploaded."]);
}
?>

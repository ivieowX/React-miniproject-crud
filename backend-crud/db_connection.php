<?php
ini_set('display_errors', 1);
error_reporting(~0);
$serverName = "localhost";

$userName = "root";
$userPassword = "";
$dbName = "db_ecommerc";
$db = mysqli_connect($serverName,$userName,$userPassword,
$dbName);
mysqli_set_charset($db, "utf8");
if (mysqli_connect_errno())
{
//echo "Database Connect Failed : " .

mysqli_connect_error();
}
else
{
//echo "Database Connected.";
}
?>
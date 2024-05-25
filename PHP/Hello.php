<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "burgers_shop";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("SELECT * FROM burgers");
    $stmt->execute();
    $burgers = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    echo "Ошибка: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="../css/shoppingpage.css">
    <title>Shopping page</title>
</head>
<body>
<nav>
    <a href="shoppingpage.html" class="shop-page-cart">Shop</a>
    <a href="shoppingcart.html" class="line-shop-page-cart">Shopping Cart</a>
</nav>
<div class="main-container">
<!--    <div class="container-left">-->
<!--        <div class="shops">-->
<!--            <p class="title">Shops</p>-->
<!--            <div class="mcdonalds common-style">McDonald's</div>-->
<!--            <div class="kfc common-style">KFC</div>-->
<!--            <div class="burgerkings common-style">Burger Kings</div>-->
<!--            <div class="chelentanopizza common-style">Chelentano Pizza</div>-->
<!--            <div class="mafia common-style">Mafia</div>-->
<!--        </div>-->
<!--    </div>-->
    <div class="container-right">
        <div class="products-items">
            <?php
            foreach ($burgers as $burger) {
                echo "<div class='products-item'>";
                echo "<div class='products-item-img'>";
                echo "<img src='../images/burgers/{$burger['img']}' alt='burger' />";
                echo "</div>";
                echo "<div class='products-title-item'>{$burger['name']}</div>";
                echo "<div class='products-item-text'>{$burger['description']}</div>";
                echo "<div class='product-item-action'>";
                echo "<div class='product-price'>{$burger['price']} грн</div>";
                echo "<button class='button'>add to Cart</button>";
                echo "</div>";
                echo "</div>";
            }
            ?>
        </div>
    </div>
</div>
<script src="../script/shoppingpage.js?random=${Math.random()}"></script>
</body>
</html>





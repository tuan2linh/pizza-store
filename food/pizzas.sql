-- First ensure the pizza menu exists
INSERT INTO MENU (Menu_Name, Image, Description) 
SELECT 'pizza', 'pizza.png', 'pizza' 
WHERE NOT EXISTS (SELECT 1 FROM MENU WHERE Menu_Name = 'pizza');

-- Clear existing products and prices for pizza menu
DELETE FROM PRICE_WITH_SIZE WHERE Product_ID IN (SELECT Product_ID FROM PRODUCT WHERE Menu_Name = 'pizza');
DELETE FROM PRODUCT WHERE Menu_Name = 'pizza';

-- Insert all products and their prices
INSERT INTO PRODUCT (Product_ID, Product_Name, Image, Description, Size, Price, Menu_Name) VALUES
(1, 'Pizza Siêu Topping Hải Sản Xốt Pesto "Chanh Sả"', 'https://img.dominos.vn/PC-MB1000X667px+super+topping%402x.png', 'Tăng 50% lượng topping protein: Mưc Khoanh, Tôm Có Đuôi; Thêm Phô Mai Mozzarella, Cà Chua, Hành Tây, Xốt Pesto, Xốt Chanh, Parsley', '', 0, 'pizza'),
(2, 'Pizza Siêu Topping Hải Sản Xốt Mayonnaise Hảo Hạng', 'https://img.dominos.vn/PC-MB1000X667px+super+topping%402x.png', 'Tăng 50% lượng topping protein: Mưc Khoanh, Tôm Có Đuôi; Thêm Phô Mai Mozzarella, Cà Chua, Hành Tây, Xốt Mayonnaise, Parsley', '', 0, 'pizza'),
(3, 'Pizza Siêu Topping Hải Sản Xốt Mayonnaise', 'https://img.dominos.vn/Pizza+Extra+Topping+(2).jpg', 'Tăng 50% lượng topping protein: Tôm, Mực, Thanh Cua; Thêm Phô Mai Mozzarella, Xốt Mayonnaise, Húng Tây, Hành', '', 0, 'pizza'),
(4, 'Pizza Siêu Topping Hải Sản Nhiệt Đới Xốt Tiêu', 'https://img.dominos.vn/Pizza+Extra+Topping+(3).jpg', 'Tăng 50% lượng topping protein: Tôm, Mực; Thêm Phô Mai Mozzarella, Phô Mai Cheddar, Thơm, Hành Tây, Xốt Mayonnaise, Xốt Tiêu Đen', '', 0, 'pizza'),
(5, 'Pizza Siêu Topping Bò Và Tôm Nướng Kiểu Mỹ', 'https://img.dominos.vn/Pizza+Extra+Topping+(4).jpg', 'Tăng 50% lượng topping protein: Tôm, Thịt Bò Mexico; Thêm Phô Mai Mozzarella, Cà Chua, Hành, Xốt Cà Chua, Xốt Mayonnaise Xốt Phô Mai', '', 0, 'pizza'),
(6, 'Pizza Siêu Topping Dăm Bông Dứa Kiểu Hawaiian', 'https://img.dominos.vn/Pizza+Extra+Topping+(1).jpg', 'Tăng 50% lượng topping protein: Thịt Dăm Bông; Thêm Phô Mai Mozzarella, Dứa, Xốt Mayonnaise, Xốt Cà Chua', '', 0, 'pizza'),
(7, 'Pizza Siêu Topping Xúc Xích Ý Truyền Thống', 'https://img.dominos.vn/Pizza+Extra+Topping+(5).jpg', 'Tăng 50% lượng topping protein: Xúc Xích Pepperoni; Thêm Phô Mai Mozzarella, Xốt Cà Chua', '', 0, 'pizza'),
(8, 'Pizza Hải Sản Xốt Pesto "Chanh Sả"', 'https://img.dominos.vn/lime.png', 'Mưc Khoanh, Tôm Có Đuôi, Phô Mai Mozzarella, Cà Chua, Hành Tây, Xốt Pesto, Xốt Chanh, Parsley', '', 0, 'pizza'),
(9, 'Pizza Hải Sản Xốt Mayonnaise Hảo Hạng', 'https://img.dominos.vn/lime.png', 'Pizza Hải Sản Xốt Mayonnaise Hảo Hạng', '', 0, 'pizza'),
(10, 'Pizza Bò & Tôm Nướng Kiểu Mỹ -', 'https://img.dominos.vn/Surf-turf-Pizza-Bo-Tom-Nuong-Kieu-My-1.jpg', 'Xốt Cà Chua, Xốt Phô Mai, Phô Mai Mozzarella, Tôm, Thịt Bò Mexico, Cà Chua, Hành Tây', '', 0, 'pizza'),
(11, 'Pizza Hải Sản Xốt Mayonnaise - Ocean Mania', 'https://img.dominos.vn/Pizza-Hai-San-Xot-Mayonnaise-Ocean-Mania.jpg', 'Xốt Mayonnaise , Phô Mai Mozzarella, Tôm, Mực, Thanh Cua, Hành Tây', '', 0, 'pizza'),
(12, 'Pizza Hải Sản Nhiệt Đới Xốt Tiêu', 'https://img.dominos.vn/Pizzaminsea-Hai-San-Nhiet-Doi-Xot-Tieu.jpg', 'Xốt tiêu đen, Phô Mai Mozzarella, Phô Mai Cheddar, Thơm, Hành Tây, Tôm, Mực', '', 0, 'pizza'),
(13, 'Pizza Hải Sản Xốt Cà Chua', 'https://img.dominos.vn/Pizza-Hai-San-Xot-Ca-Chua-Seafood-Delight.jpg', 'Xốt Cà Chua, Phô Mai Mozzarella, Tôm, Mực, Thanh Cua, Hành Tây', '', 0, 'pizza'),
(14, 'Pizza Xúc Xích Dứa Xốt BBQ Mayo', 'https://img.dominos.vn/bbq-mayo+(2).png', 'Xốt BBQ, Phô Mai Mozzarella, Xúc Xích Parsley, Thịt Xông Khói, Dứa', '', 0, 'pizza'),
(15, 'Pizza Thanh Cua Dứa Xốt Phô Mai', 'https://img.dominos.vn/cheesy-crab-stick-+(3).png', 'Xốt Mayonnasie, Phô Mai Mozzarella, Thanh Cua, Dứa', '', 0, 'pizza'),
(16, 'Pizza Dăm Bông Bắp Xốt Phô Mai', 'https://img.dominos.vn/cheesy-ha%2C-corn-+(3).png', 'Xốt Phô Mai, Phô Mai Mozzarella, Thịt Dăm Bông, Thịt Xông Khói, Bắp', '', 0, 'pizza'),
(17, 'Pizza Xúc Xích Xốt Phô Mai', 'https://img.dominos.vn/Sausage-Kid-Mania-1.jpg', 'Xốt phô mai, Phô mai Mozzarella, Xúc Xích, Thịt Heo Xông Khói, Bắp (Ngô), Thơm (Dứa)', '', 0, 'pizza'),
(18, 'Pizza Gà Phô Mai Thịt Heo Xông Khói', 'https://img.dominos.vn/Pizza-Ga-Pho-Mai-Thit-Heo-Xong-Khoi-Cheesy-Chicken-Bacon.jpg', 'Xốt Phô Mai, Gà Viên, Thịt Heo Xông Khói, Phô Mai Mozzarella, Cà Chua', '', 0, 'pizza'),
(19, 'Pizza Bơ Gơ Bò Mỹ Xốt Phô Mai Ngập Vị', 'https://img.dominos.vn/cheeseburger.jpg', 'Thịt Bò Bơ Gơ Nhập Khẩu, Thịt Heo Xông Khói, Xốt Phô Mai, Xốt Mayonnaise, Phô Mai Mozzarella, Phô Mai Cheddar, Dưa Chuột Muối, Cà Chua, Hành Tây, Nấm, Bột Paprika Hun Khói', '', 0, 'pizza'),
(20, 'Pizza Bơ Gơ Bò Mỹ Xốt Habanero', 'https://img.dominos.vn/cheeseburger-habanero.jpg', 'Thịt Bò Bơ Gơ Nhập Khẩu, Thịt Heo Xông Khói, Xốt Phô Mai, Xốt Habanero, Phô Mai Mozzarella, Phô Mai Cheddar, Dưa Chuột Muối, Cà Chua, Hành Tây, Nấm, Ớt Chuông, Bột Paprika Hun Khói', '', 0, 'pizza'),
(21, 'Pizza New York Bò Beefsteak Phô Mai', 'https://img.dominos.vn/Menu+BG+1.jpg', 'Bò Beefsteak, Xốt Demi-Glace (Xốt Bít Tết), Xốt Kem Chua, Phô Mai Mozzarella, Nấm, Cà Chua, Hành Tây, Bột Rong Biển', '', 0, 'pizza'),
(22, 'Pizza Thập Cẩm Thượng Hạng', 'https://img.dominos.vn/Pizza-Thap-Cam-Thuong-Hang-Extravaganza.jpg', 'Xốt Cà Chua, Phô Mai Mozzarella, Xúc Xích Pepperoni, Thịt Dăm Bông, Xúc Xich Ý, Thịt Bò Viên, Ớt Chuông Xanh, Nấm Mỡ, Hành Tây, Ô-liu', '', 0, 'pizza'),
(23, 'Pizza Ngập Vị Phô Mai Hảo Hạng', 'https://img.dominos.vn/CHEESY+MADNESS+NO+NEW+PC.jpg', 'Phô Mai Cheddar, Phô Mai Mozzarella, Phô Mai Xanh Viên, Viền Phô Mai, Xốt Phô Mai Và Phục Vụ Cùng Mật Ong.', '', 0, 'pizza'),
(24, 'Pizza Rau Củ Thập Cẩm', 'https://img.dominos.vn/Veggie-mania-Pizza-Rau-Cu-Thap-Cam.jpg', 'Xốt Cà Chua, Phô Mai Mozzarella, Hành Tây, Ớt Chuông Xanh, Ô-liu, Nấm Mỡ, Cà Chua, Thơm (dứa)', '', 0, 'pizza');

-- Insert all size/price combinations
INSERT INTO PRICE_WITH_SIZE (Product_ID, Size, Price) VALUES
-- Product 1
(1, 'big', 345000),
(1, 'medium', 235000),
-- Product 2
(2, 'big', 345000), 
(2, 'medium', 235000),
-- Product 3
(3, 'big', 345000),
(3, 'medium', 235000),
-- Product 4
(4, 'big', 345000),
(4, 'medium', 235000),
-- Product 5  
(5, 'big', 345000),
(5, 'medium', 235000),
-- Product 6
(6, 'big', 305000),
(6, 'medium', 205000),
-- Product 7
(7, 'big', 345000),
(7, 'medium', 235000),
-- Product 8
(8, 'big', 315000),
(8, 'medium', 215000),
-- Product 9
(9, 'big', 315000),
(9, 'medium', 215000),
-- Product 10
(10, 'big', 285000),
(10, 'medium', 205000),
(10, 'small', 115000),
-- Product 11
(11, 'big', 285000),
(11, 'medium', 205000),
(11, 'small', 115000),
-- Product 12
(12, 'big', 285000),
(12, 'medium', 205000),
(12, 'small', 115000),
-- Product 13
(13, 'big', 285000),
(13, 'medium', 205000),
(13, 'small', 115000),
-- Product 14
(14, 'big', 245000),
(14, 'medium', 175000),
(14, 'small', 95000),
-- Product 15
(15, 'big', 245000),
(15, 'medium', 175000),
(15, 'small', 95000),
-- Product 16
(16, 'big', 245000),
(16, 'medium', 175000),
(16, 'small', 95000),
-- Product 17
(17, 'big', 245000),
(17, 'medium', 175000),
(17, 'small', 95000),
-- Product 18
(18, 'big', 305000),
(18, 'medium', 205000),
-- Product 19
(19, 'big', 305000),
(19, 'medium', 205000),
-- Product 20
(20, 'big', 305000),
(20, 'medium', 215000),
-- Product 21
(21, 'big', 285000),
(21, 'medium', 205000),
(21, 'small', 115000),
-- Product 22
(22, 'big', 245000),
(22, 'medium', 175000),
-- Product 23
(23, 'big', 225000),
(23, 'medium', 155000),
(23, 'small', 85000),
-- Product 24
(24, 'big', 285000),
(24, 'medium', 205000),
(24, 'small', 115000);

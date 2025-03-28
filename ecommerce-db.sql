-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 27, 2025 at 09:25 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(10) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `street_address` varchar(100) NOT NULL,
  `postal_code` varchar(30) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `firstname`, `lastname`, `email`, `password`, `phone`, `street_address`, `postal_code`, `city`, `country`, `created_at`) VALUES
(1, 'Test', 'User', 'test@example.com', '$2b$10$zrjtm21b6YTIwCG26SiwTu.0f7u/14ECvuvZpOVjQooCY1Mfyyq46', '123456789', 'Test Street', '12345', 'Test City', 'Test Country', '2025-03-18 08:34:14'),
(2, 'Edgar', 'Backer', 'edgarbacker@gmail.com', '$2b$10$rmrMi3bY/r77GoEhnIBd4.UznrZ2yXQ6oY/LpWKFB6klk4cKlzl7y', '123456789', 'Test Street', '12345', 'Test City', 'Sweden', '2025-03-26 15:14:19'),
(3, 'Edgar', 'Backer', 'edgar.backer@medieinstitutet.se', '$2b$10$BtGF6H4yDJmUFGebIhK8B.YMzGx6gKZGyKJQGtqbpJV6zB6DwfX3q', '123456789', 'Admin Street', '12345', 'Admin City', 'Sweden', '2025-03-27 08:16:18');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) NOT NULL,
  `customer_id` int(10) NOT NULL,
  `total_price` int(5) NOT NULL,
  `payment_status` varchar(30) NOT NULL,
  `payment_id` varchar(200) DEFAULT NULL,
  `order_status` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `quantity` int(5) NOT NULL,
  `unit_price` int(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` int(5) NOT NULL,
  `stock` int(4) NOT NULL,
  `category` varchar(100) NOT NULL,
  `image` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `category`, `image`, `created_at`) VALUES
(1, 'Salomon ProShield Ski Helmet', 'Featuring a lightweight polycarbonate shell and EPS foam, this helmet ensures maximum impact protection while keeping you comfortable all day.', 1499, 50, 'Helmets', 'https://images.unsplash.com/photo-1609803384069-19f3cf133f45?auto=format&fit=crop&q=80', '2025-03-17 11:22:42'),
(2, 'Atomic Avalanche MIPS Helmet', 'Designed with MIPS technology to reduce rotational impact, perfect for aggressive skiers.', 1899, 35, 'Helmets', 'https://images.unsplash.com/photo-1613121850937-4b3e842d08d5?auto=format&fit=crop&q=80', '2025-03-17 11:22:42'),
(3, 'Dainese FlexBack Pro', 'Ergonomic, lightweight back protection with breathable mesh for all-day comfort.', 999, 40, 'Back Protectors', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-17 11:22:42'),
(4, 'POC Spine Shield Vest', 'Full-torso protection with adaptive foam technology.', 1299, 30, 'Back Protectors', 'https://images.unsplash.com/photo-1609250291996-fdebe6020a8f?auto=format&fit=crop&q=80', '2025-03-17 11:22:42'),
(5, 'Salomon ProShield Ski Helmet', 'Featuring a lightweight polycarbonate shell and EPS foam, this helmet ensures maximum impact protection while keeping you comfortable all day.', 1499, 50, 'Helmets', 'https://images.unsplash.com/photo-1609803384069-19f3cf133f45?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(6, 'Atomic Avalanche MIPS Helmet', 'Designed with MIPS technology to reduce rotational impact, perfect for aggressive skiers.', 1899, 35, 'Helmets', 'https://images.unsplash.com/photo-1613121850937-4b3e842d08d5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(7, 'Burton FreeRide Snow Helmet', 'A stylish, low-profile helmet with adjustable ventilation and an integrated goggle clip.', 1299, 40, 'Helmets', 'https://images.unsplash.com/photo-1610398000003-b8532b401b56?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(8, 'Giro Alpine Pro Helmet', 'Advanced aerodynamics and plush interior padding for superior safety and warmth.', 1699, 30, 'Helmets', 'https://images.unsplash.com/photo-1614252235316-8c857d38b5fe?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(9, 'Smith Optics GlacierGuard Helmet', 'Built-in visor and adjustable fit system make this helmet a must-have for high-altitude skiing.', 1599, 45, 'Helmets', 'https://images.unsplash.com/photo-1614252235316-8c857d38b5fe?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(10, 'Head StormX Snow Helmet', 'Ultra-lightweight yet highly durable, perfect for backcountry explorers.', 1399, 38, 'Helmets', 'https://images.unsplash.com/photo-1614252235316-8c857d38b5fe?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(11, 'Oakley Performance Shield Helmet', 'Sleek design with a seamless goggle integration system for a fog-free experience.', 1799, 25, 'Helmets', 'https://images.unsplash.com/photo-1614252235316-8c857d38b5fe?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(12, 'Uvex Race Master Helmet', 'Designed for racers, featuring enhanced aerodynamics and reinforced side protection.', 1999, 20, 'Helmets', 'https://images.unsplash.com/photo-1614252235316-8c857d38b5fe?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(13, 'POC Sentinel Ski Helmet', 'Dual-density EPS liner and RECCO reflector for emergency tracking.', 1899, 30, 'Helmets', 'https://images.unsplash.com/photo-1614252235316-8c857d38b5fe?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(14, 'Rossignol Velocity Helmet', 'A classic ski helmet with cutting-edge impact absorption and adjustable chin straps.', 1299, 40, 'Helmets', 'https://images.unsplash.com/photo-1614252235316-8c857d38b5fe?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(15, 'Dainese FlexBack Pro', 'Ergonomic, lightweight back protection with breathable mesh for all-day comfort.', 999, 40, 'Back Protectors', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(16, 'POC Spine Shield Vest', 'Full-torso protection with adaptive foam technology.', 1299, 30, 'Back Protectors', 'https://images.unsplash.com/photo-1609250291996-fdebe6020a8f?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(17, 'Atomic Guardian Back Protector', 'Flexible, shock-absorbing plates keep you safe on aggressive runs.', 899, 35, 'Back Protectors', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(18, 'Salomon X-Flex Armor', 'Ultra-slim fit, designed for unrestricted movement on the slopes.', 1199, 25, 'Back Protectors', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(19, 'Burton Shockwave Vest', 'A vest-style back protector with side impact padding.', 1099, 30, 'Back Protectors', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(20, 'Giro Alpine Defense', 'Reinforced impact zones ensure maximum spinal safety.', 1399, 20, 'Back Protectors', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(21, 'Scott Defender Lite', 'Multi-layered foam padding provides superior shock absorption.', 999, 40, 'Back Protectors', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(22, 'Oakley RidgeGuard Vest', 'Moisture-wicking and lightweight for freeride and race skiers.', 1299, 25, 'Back Protectors', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(23, 'Rossignol Pro Spine Guard', 'Adjustable straps for a customized fit, keeping you protected in any terrain.', 1199, 30, 'Back Protectors', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(24, 'Smith Optics SafeRide', 'Integrated spine and rib protection with optimal breathability.', 1499, 20, 'Back Protectors', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(25, 'Salomon X-Trail 2000', 'All-mountain performance with precision edge control for versatile skiing.', 4999, 15, 'Skis', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(26, 'Atomic Maverick Pro', 'Lightweight and responsive, perfect for carving up the slopes with confidence.', 5499, 12, 'Skis', 'https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(27, 'Head Glacier Ride', 'Designed for deep powder with a wide underfoot profile for maximum float.', 6299, 10, 'Skis', 'https://images.unsplash.com/photo-1557503976-8d68da1d921c?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(28, 'Rossignol Speed Chaser', 'High-speed skis with an aggressive turning radius for advanced riders.', 5999, 18, 'Skis', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(29, 'Blizzard ThunderStorm', 'Rocker-camber hybrid for maximum versatility in all conditions.', 5799, 20, 'Skis', 'https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(30, 'Dynastar FreeFlow 110', 'Built for freestyle skiers, with reinforced twin tips for park performance.', 4799, 15, 'Skis', 'https://images.unsplash.com/photo-1557503976-8d68da1d921c?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(31, 'Nordica Summit XT', 'Carbon-reinforced core for improved stability and shock absorption.', 6499, 8, 'Skis', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(32, 'Volkl Titan Edge', 'Race-inspired ski with quick acceleration and precise edge control.', 7299, 10, 'Skis', 'https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(33, 'Fischer Alpine X1', 'Perfect for beginner-to-intermediate skiers looking for control and comfort.', 3999, 25, 'Skis', 'https://images.unsplash.com/photo-1557503976-8d68da1d921c?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(34, 'K2 Mountain Fury', 'Versatile all-mountain ski with a lightweight, poplar wood core.', 5299, 15, 'Skis', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(35, 'Burton Phantom Freeride', 'Designed for deep powder and big mountain terrain with superior float.', 5999, 12, 'Snowboards', 'https://images.unsplash.com/photo-1522056615691-da7b8106c665?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(36, 'Capita Supernova', 'Stiff and responsive for aggressive snowboarders who demand precision.', 5499, 15, 'Snowboards', 'https://images.unsplash.com/photo-1482867899247-e295efdd8c1a?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(37, 'Lib Tech MagneTraction', 'Serrated edges provide superior grip on icy slopes for confident riding.', 5799, 10, 'Snowboards', 'https://images.unsplash.com/photo-1522056615691-da7b8106c665?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(38, 'GNU FreeStyle Pro', 'Lightweight, flexible, and perfect for terrain parks and tricks.', 4999, 18, 'Snowboards', 'https://images.unsplash.com/photo-1482867899247-e295efdd8c1a?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(39, 'Jones Ultra Mountain Twin', 'All-mountain versatility with superior edge hold for any condition.', 6299, 14, 'Snowboards', 'https://images.unsplash.com/photo-1522056615691-da7b8106c665?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(40, 'Salomon SnowHawk', 'Hybrid camber profile for balanced control in all conditions.', 5299, 20, 'Snowboards', 'https://images.unsplash.com/photo-1482867899247-e295efdd8c1a?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(41, 'Nitro Prime Edge', 'Built for high-speed carving with minimal drag and maximum stability.', 5899, 12, 'Snowboards', 'https://images.unsplash.com/photo-1522056615691-da7b8106c665?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(42, 'Ride Alpine Rider', 'Wide base and setback stance for maximum flotation in powder.', 5699, 15, 'Snowboards', 'https://images.unsplash.com/photo-1482867899247-e295efdd8c1a?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(43, 'K2 HyperGlide', 'Reinforced carbon layers for extra pop and durability on jumps.', 6499, 10, 'Snowboards', 'https://images.unsplash.com/photo-1522056615691-da7b8106c665?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(44, 'Yes Helix LTD', 'Asymmetrical shape for smooth edge transitions and precise control.', 5999, 12, 'Snowboards', 'https://images.unsplash.com/photo-1482867899247-e295efdd8c1a?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(45, 'Leki Speed Pro Carbon', 'Ultra-light carbon construction for precise pole plants and control.', 999, 30, 'Ski Poles', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(46, 'Black Diamond Freeride Pro', 'Adjustable length with shock-absorbing grip for varied terrain.', 1199, 25, 'Ski Poles', 'https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(47, 'Salomon AeroLite Poles', 'Lightweight aluminum with ergonomic handles for all-day comfort.', 799, 40, 'Ski Poles', 'https://images.unsplash.com/photo-1557503976-8d68da1d921c?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(48, 'Rossignol X-Racer Poles', 'Aerodynamic design for high-speed skiing and racing.', 1299, 20, 'Ski Poles', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(49, 'Atomic Powder Stix', 'Wide baskets for deep snow performance and backcountry exploration.', 899, 35, 'Ski Poles', 'https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(50, 'Head All-Terrain Poles', 'Reinforced aluminum with anti-slip grips for reliable performance.', 849, 30, 'Ski Poles', 'https://images.unsplash.com/photo-1557503976-8d68da1d921c?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(51, 'Scott Pro Flex Poles', 'Adjustable telescopic design for backcountry skiing versatility.', 1099, 25, 'Ski Poles', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(52, 'Fischer Glacier Strike Poles', 'Extra-durable composite materials for long-lasting performance.', 949, 28, 'Ski Poles', 'https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(53, 'K2 ThunderBlade Poles', 'Shock-absorbing tips reduce vibrations on impact for smooth skiing.', 1149, 22, 'Ski Poles', 'https://images.unsplash.com/photo-1557503976-8d68da1d921c?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(54, 'Dynastar Alpine Carbon', 'Lightweight yet rigid for high-performance skiing demands.', 1399, 18, 'Ski Poles', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(55, 'Arc\'teryx Alpha Storm Jacket', 'Fully waterproof, windproof, and breathable for extreme conditions.', 4999, 15, 'Ski Jackets', 'https://images.unsplash.com/photo-1609250291996-fdebe6020a8f?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(56, 'Patagonia PowderGuard', 'Insulated with eco-friendly materials for sustainable warmth.', 3999, 20, 'Ski Jackets', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(57, 'Helly Hansen Freeride Pro', 'Reinforced shoulders for carrying skis and premium protection.', 4499, 18, 'Ski Jackets', 'https://images.unsplash.com/photo-1609250291996-fdebe6020a8f?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(58, 'The North Face Summit XT', 'Lightweight yet insulated for all-day warmth and mobility.', 4299, 22, 'Ski Jackets', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(59, 'Burton SnowShell', 'High-collar design to block cold winds with style.', 3799, 25, 'Ski Jackets', 'https://images.unsplash.com/photo-1609250291996-fdebe6020a8f?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(60, 'Columbia OmniShield Parka', 'Heat-reflective lining for extreme conditions and comfort.', 3499, 30, 'Ski Jackets', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(61, 'Salomon IceStorm', '3-layer shell with stretch fabric for unrestricted mobility.', 4199, 20, 'Ski Jackets', 'https://images.unsplash.com/photo-1609250291996-fdebe6020a8f?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(62, 'Mammut Avalanche Guard', 'Integrated RECCO reflector for safety in the backcountry.', 4799, 15, 'Ski Jackets', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(63, 'Spyder X-Series Jacket', 'Seam-sealed and waterproof for deep snow riding adventures.', 4599, 18, 'Ski Jackets', 'https://images.unsplash.com/photo-1609250291996-fdebe6020a8f?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(64, 'Descente Extreme Alpine', 'Thermal insulation with moisture-wicking liner for dry comfort.', 4399, 20, 'Ski Jackets', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(65, 'Arc\'teryx Sentinel Pro Pants', 'Reinforced knee panels for durability and protection.', 3499, 20, 'Ski Pants', 'https://images.unsplash.com/photo-1609250291996-fdebe6020a8f?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(66, 'Helly Hansen Backcountry Pant', 'Snow gaiters for deep powder protection and comfort.', 2999, 25, 'Ski Pants', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(67, 'The North Face StealthFlex', 'Stretch fabric for improved movement and performance.', 3299, 22, 'Ski Pants', 'https://images.unsplash.com/photo-1609250291996-fdebe6020a8f?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(68, 'Burton Powder Rider', 'Dual-layered insulation for warmth in extreme conditions.', 2799, 28, 'Ski Pants', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(69, 'Spyder Glacier Shield', 'Water-resistant with high breathability for active skiing.', 3199, 24, 'Ski Pants', 'https://images.unsplash.com/photo-1609250291996-fdebe6020a8f?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(70, 'Patagonia IceFlow Bib', 'Adjustable straps and venting zippers for customized comfort.', 3799, 18, 'Ski Pants', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(71, 'Salomon Storm XT', 'Articulated fit for better mobility on the slopes.', 2899, 30, 'Ski Pants', 'https://images.unsplash.com/photo-1609250291996-fdebe6020a8f?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(72, 'Columbia Arctic Base Pant', 'Fleece-lined for maximum warmth during cold days.', 2599, 35, 'Ski Pants', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(73, 'Volcom Alpine Guard', 'Slim-fit yet highly insulated for style and function.', 2999, 25, 'Ski Pants', 'https://images.unsplash.com/photo-1609250291996-fdebe6020a8f?auto=format&fit=crop&q=80', '2025-03-26 15:07:01'),
(74, 'Dynafit SpeedTour Pant', 'Lightweight touring pant with reinforced cuffs for durability.', 3399, 20, 'Ski Pants', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80', '2025-03-26 15:07:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_orders_customer_created` (`customer_id`,`created_at`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orderItems_orders` (`order_id`),
  ADD KEY `idx_order_items_product` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_products_category` (`category`),
  ADD KEY `idx_products_price` (`price`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_customers` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_orderItems_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_items_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

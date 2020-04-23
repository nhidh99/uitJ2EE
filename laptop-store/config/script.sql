CREATE DATABASE  IF NOT EXISTS `laptop_store` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `laptop_store`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: laptop_store
-- ------------------------------------------------------
-- Server version	5.7.29-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `image_link` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40000 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `laptop_id` int(11) NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cart_laptop_idx` (`laptop_id`),
  KEY `fk_cart_user_idx` (`user_id`),
  CONSTRAINT `fk_cart_laptop` FOREIGN KEY (`laptop_id`) REFERENCES `laptop` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=90000 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `delivery_address`
--

DROP TABLE IF EXISTS `delivery_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address_num` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `ward` varchar(45) NOT NULL,
  `district` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_address_user_idx` (`user_id`),
  CONSTRAINT `fk_address_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `favourite`
--

DROP TABLE IF EXISTS `favourite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourite` (
  `user_id` int(11) NOT NULL,
  `laptop_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`laptop_id`),
  KEY `fk_fav_laptop_idx` (`laptop_id`),
  CONSTRAINT `fk_fav_laptop` FOREIGN KEY (`laptop_id`) REFERENCES `laptop` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_fav_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `laptop`
--

DROP TABLE IF EXISTS `laptop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laptop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `unit_price` int(11) NOT NULL,
  `discount_price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `avg_rating` float NOT NULL,
  `cpu` varchar(45) NOT NULL,
  `ram` varchar(45) NOT NULL,
  `hard_drive` varchar(45) NOT NULL,
  `monitor` varchar(45) NOT NULL,
  `graphics_card` varchar(45) NOT NULL,
  `ports` varchar(45) NOT NULL,
  `os` varchar(45) NOT NULL,
  `design` varchar(45) NOT NULL,
  `thickness` float NOT NULL,
  `weight` float NOT NULL,
  `image_link` varchar(45) NOT NULL,
  `record_status` tinyint(1) NOT NULL DEFAULT '1',
  `brand_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `quantity_UNIQUE` (`quantity`),
  UNIQUE KEY `discount_price_UNIQUE` (`discount_price`),
  UNIQUE KEY `unit_price_UNIQUE` (`unit_price`),
  UNIQUE KEY `avg_rating_UNIQUE` (`avg_rating`),
  UNIQUE KEY `weight_UNIQUE` (`weight`),
  UNIQUE KEY `thickness_UNIQUE` (`thickness`),
  KEY `fk_laptop_brand_idx` (`brand_id`),
  CONSTRAINT `fk_laptop_brand` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=30000 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `laptop_promotion`
--

DROP TABLE IF EXISTS `laptop_promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laptop_promotion` (
  `laptop_id` int(11) NOT NULL,
  `promotion_id` int(11) NOT NULL,
  PRIMARY KEY (`laptop_id`,`promotion_id`),
  KEY `fk_lp_promotion_idx` (`promotion_id`),
  CONSTRAINT `fk_lp_laptop` FOREIGN KEY (`laptop_id`) REFERENCES `laptop` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_lp_promotion` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `laptop_tag`
--

DROP TABLE IF EXISTS `laptop_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laptop_tag` (
  `laptop_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`laptop_id`,`tag_id`),
  KEY `fk_lt_laptop_idx` (`laptop_id`),
  KEY `fk_lt_tag_idx` (`tag_id`),
  CONSTRAINT `fk_lt_laptop` FOREIGN KEY (`laptop_id`) REFERENCES `laptop` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_lt_tag` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transport_fee` int(11) unsigned NOT NULL,
  `total_price` bigint(20) unsigned NOT NULL,
  `status` varchar(20) NOT NULL,
  `delivery_date` date NOT NULL,
  `receiver_name` varchar(45) NOT NULL,
  `receiver_phone` varchar(45) NOT NULL,
  `address_num` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `ward` varchar(45) NOT NULL,
  `district` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_order_user_idx` (`user_id`),
  CONSTRAINT `fk_order_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=110000 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `laptop_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  `unit_price` int(10) unsigned NOT NULL,
  `total_price` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_od_laptop_idx` (`laptop_id`),
  KEY `fk_od_order_idx` (`order_id`),
  CONSTRAINT `fk_od_laptop` FOREIGN KEY (`laptop_id`) REFERENCES `laptop` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_od_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=120000 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  `image_link` varchar(150) NOT NULL,
  `record_status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20001 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `laptop_id` int(11) NOT NULL,
  `rating` int(10) unsigned NOT NULL,
  `comment_title` varchar(45) DEFAULT NULL,
  `comment_detail` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rating_laptop_idx` (`laptop_id`),
  KEY `fk_rating_user_idx` (`user_id`),
  CONSTRAINT `fk_rating_laptop` FOREIGN KEY (`laptop_id`) REFERENCES `laptop` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_rating_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rating_reply`
--

DROP TABLE IF EXISTS `rating_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating_reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rating_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reply` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rp_user_idx` (`user_id`),
  KEY `fk_rp_rating_idx` (`rating_id`),
  CONSTRAINT `fk_rp_rating` FOREIGN KEY (`rating_id`) REFERENCES `rating` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_rp_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=70000 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100000 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address_num` varchar(45) DEFAULT NULL,
  `street` varchar(45) DEFAULT NULL,
  `ward` varchar(45) DEFAULT NULL,
  `district` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-23 23:03:01

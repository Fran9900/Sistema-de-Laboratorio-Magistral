-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: labowork_db
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `labowork_db`
--

/*!40000 DROP DATABASE IF EXISTS `labowork_db`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `labowork_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ ;

USE `labowork_db`;

--
-- Table structure for table `configuracionsistemas`
--

DROP TABLE IF EXISTS `configuracionsistemas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuracionsistemas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clave` varchar(255) NOT NULL,
  `valor` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clave` (`clave`),
  UNIQUE KEY `clave_2` (`clave`),
  UNIQUE KEY `clave_3` (`clave`),
  UNIQUE KEY `clave_4` (`clave`),
  UNIQUE KEY `clave_5` (`clave`),
  UNIQUE KEY `clave_6` (`clave`),
  UNIQUE KEY `clave_7` (`clave`),
  UNIQUE KEY `clave_8` (`clave`),
  UNIQUE KEY `clave_9` (`clave`),
  UNIQUE KEY `clave_10` (`clave`),
  UNIQUE KEY `clave_11` (`clave`),
  UNIQUE KEY `clave_12` (`clave`),
  UNIQUE KEY `clave_13` (`clave`),
  UNIQUE KEY `clave_14` (`clave`),
  UNIQUE KEY `clave_15` (`clave`),
  UNIQUE KEY `clave_16` (`clave`),
  UNIQUE KEY `clave_17` (`clave`),
  UNIQUE KEY `clave_18` (`clave`),
  UNIQUE KEY `clave_19` (`clave`),
  UNIQUE KEY `clave_20` (`clave`),
  UNIQUE KEY `clave_21` (`clave`),
  UNIQUE KEY `clave_22` (`clave`),
  UNIQUE KEY `clave_23` (`clave`),
  UNIQUE KEY `clave_24` (`clave`),
  UNIQUE KEY `clave_25` (`clave`),
  UNIQUE KEY `clave_26` (`clave`),
  UNIQUE KEY `clave_27` (`clave`),
  UNIQUE KEY `clave_28` (`clave`),
  UNIQUE KEY `clave_29` (`clave`),
  UNIQUE KEY `clave_30` (`clave`),
  UNIQUE KEY `clave_31` (`clave`),
  UNIQUE KEY `clave_32` (`clave`),
  UNIQUE KEY `clave_33` (`clave`),
  UNIQUE KEY `clave_34` (`clave`),
  UNIQUE KEY `clave_35` (`clave`),
  UNIQUE KEY `clave_36` (`clave`),
  UNIQUE KEY `clave_37` (`clave`),
  UNIQUE KEY `clave_38` (`clave`),
  UNIQUE KEY `clave_39` (`clave`),
  UNIQUE KEY `clave_40` (`clave`),
  UNIQUE KEY `clave_41` (`clave`),
  UNIQUE KEY `clave_42` (`clave`),
  UNIQUE KEY `clave_43` (`clave`),
  UNIQUE KEY `clave_44` (`clave`),
  UNIQUE KEY `clave_45` (`clave`),
  UNIQUE KEY `clave_46` (`clave`),
  UNIQUE KEY `clave_47` (`clave`),
  UNIQUE KEY `clave_48` (`clave`),
  UNIQUE KEY `clave_49` (`clave`),
  UNIQUE KEY `clave_50` (`clave`),
  UNIQUE KEY `clave_51` (`clave`),
  UNIQUE KEY `clave_52` (`clave`),
  UNIQUE KEY `clave_53` (`clave`),
  UNIQUE KEY `clave_54` (`clave`),
  UNIQUE KEY `clave_55` (`clave`),
  UNIQUE KEY `clave_56` (`clave`),
  UNIQUE KEY `clave_57` (`clave`),
  UNIQUE KEY `clave_58` (`clave`),
  UNIQUE KEY `clave_59` (`clave`),
  UNIQUE KEY `clave_60` (`clave`),
  UNIQUE KEY `clave_61` (`clave`),
  UNIQUE KEY `clave_62` (`clave`),
  UNIQUE KEY `clave_63` (`clave`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracionsistemas`
--

LOCK TABLES `configuracionsistemas` WRITE;
/*!40000 ALTER TABLE `configuracionsistemas` DISABLE KEYS */;
INSERT INTO `configuracionsistemas` VALUES (1,'dias_validez_receta_max','30','Dias maximos de validez de una receta desde su emision','2026-10-02 17:02:03','2026-10-02 17:02:03'),(2,'tiempo_retiro_con_stock_hs','24','Horas estimadas de retiro para pedidos con stock disponible','2026-10-02 17:02:03','2026-10-02 17:02:03'),(3,'tiempo_retiro_sin_stock_hs','48','Horas estimadas de retiro para pedidos que requieren solicitud a drogueria','2026-10-02 17:02:03','2026-10-02 17:02:03'),(4,'longitud_pin_control','4','Cantidad de digitos del PIN unico de control para talonario','2026-10-02 17:02:03','2026-10-02 17:02:03');
/*!40000 ALTER TABLE `configuracionsistemas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedidoId` int NOT NULL,
  `metodoPago` enum('efectivo','transferencia') NOT NULL,
  `estadoPago` enum('pendiente','validado','rechazado') DEFAULT 'pendiente',
  `comprobanteUrl` varchar(255) DEFAULT NULL,
  `fechaValidacion` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pedidoId` (`pedidoId`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_10` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_11` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_12` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_13` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_14` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_15` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_16` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_17` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_18` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_19` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_2` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_20` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_21` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_22` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_23` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_24` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_25` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_26` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_27` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_28` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_29` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_3` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_30` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_31` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_32` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_33` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_34` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_35` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_36` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_37` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_38` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_39` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_4` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_40` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_41` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_42` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_43` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_44` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_45` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_46` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_5` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_6` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_7` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_8` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pagos_ibfk_9` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` VALUES (2,18,'efectivo','validado',NULL,'2026-11-06 16:07:03','2026-11-06 16:07:03','2026-11-06 16:07:03'),(3,17,'transferencia','validado',NULL,'2026-11-06 16:32:07','2026-11-06 16:08:39','2026-11-06 16:32:07'),(4,7,'transferencia','validado',NULL,'2026-11-06 17:17:13','2026-11-06 17:17:13','2026-11-06 17:17:13'),(5,14,'efectivo','validado',NULL,'2026-11-06 17:17:41','2026-11-06 17:17:41','2026-11-06 17:17:41'),(6,19,'efectivo','validado',NULL,'2026-11-09 01:22:35','2026-11-09 01:22:35','2026-11-09 01:22:35');
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidodroguerias`
--

DROP TABLE IF EXISTS `pedidodroguerias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidodroguerias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedidoId` int NOT NULL,
  `principioActivoId` int NOT NULL,
  `cantidadSolicitada` varchar(255) NOT NULL,
  `estadoSolicitud` enum('pendiente','enviado_api','confirmado_drogueria','fallido') DEFAULT 'pendiente',
  `respuestaApi` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pedidoId` (`pedidoId`),
  KEY `principioActivoId` (`principioActivoId`),
  CONSTRAINT `pedidodroguerias_ibfk_1` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_10` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_11` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_12` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_13` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_14` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_15` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_16` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_17` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_18` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_19` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_2` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_20` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_21` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_22` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_23` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_24` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_25` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_26` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_27` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_28` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_29` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_3` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_30` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_31` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_32` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_33` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_34` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_35` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_36` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_37` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_38` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_39` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_4` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_40` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_41` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_42` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_43` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_44` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_45` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_46` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_47` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_48` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_49` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_5` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_50` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_51` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_52` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_53` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_54` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_55` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_56` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_57` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_58` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_59` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_6` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_60` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_61` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_62` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_63` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_64` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_65` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_66` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_67` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_68` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_69` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_7` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_70` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_71` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_72` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_73` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_74` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_75` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_76` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_77` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_78` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_79` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_8` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_80` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_81` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_82` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_83` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_84` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_85` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_86` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_87` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_88` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_89` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_9` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_90` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_91` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pedidodroguerias_ibfk_92` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidodroguerias`
--

LOCK TABLES `pedidodroguerias` WRITE;
/*!40000 ALTER TABLE `pedidodroguerias` DISABLE KEYS */;
INSERT INTO `pedidodroguerias` VALUES (1,13,10,'10 comprimidos','confirmado_drogueria','{\"origen\":\"solicitud_manual_laboratorio\",\"pedidoId\":13,\"principioActivo\":\"Diclofenac\",\"fecha\":\"2026-11-05T04:09:04.721Z\"}','2026-11-05 04:09:04','2026-11-05 14:07:15'),(2,14,8,'60 cÃ¡psulas','confirmado_drogueria','{\"origen\":\"reposicion_automatica_falta_stock\",\"pedidoId\":14,\"principioActivo\":\"LosartÃ¡n\",\"fecha\":\"2026-11-05T14:18:51.358Z\"}','2026-11-05 14:18:51','2026-11-05 14:19:57'),(3,16,7,'Envase materia prima x 100 g (Requerido: 3 g)','confirmado_drogueria','{\"origen\":\"reposicion_automatica_falta_stock\",\"pedidoId\":16,\"principioActivo\":\"Sertralina\",\"gramosRequeridos\":3,\"fecha\":\"2026-11-05T15:50:32.205Z\"}','2026-11-05 15:50:32','2026-11-06 17:19:19'),(4,17,7,'Envase materia prima x 100 g (Requerido: 1.5 g)','confirmado_drogueria','{\"origen\":\"reposicion_automatica_falta_stock\",\"pedidoId\":17,\"principioActivo\":\"Sertralina\",\"gramosRequeridos\":1.5,\"fecha\":\"2026-11-06T15:43:18.810Z\"}','2026-11-06 15:43:18','2026-11-06 17:19:19'),(5,18,7,'Envase materia prima x 100 g (Requerido: 0.6 g)','confirmado_drogueria','{\"origen\":\"reposicion_automatica_falta_stock\",\"pedidoId\":18,\"principioActivo\":\"Sertralina\",\"gramosRequeridos\":0.6,\"fecha\":\"2026-11-06T15:46:52.973Z\"}','2026-11-06 15:46:52','2026-11-06 17:19:19'),(6,19,11,'Envase materia prima x 100 g (Requerido: 0.02 g)','confirmado_drogueria','{\"origen\":\"reposicion_automatica_falta_stock\",\"pedidoId\":19,\"principioActivo\":\"Lactobasilus Rhamnosus, Lactobasilus Plantarum, Lactobasilus Acidofilus\",\"gramosRequeridos\":0.02,\"fecha\":\"2026-11-09T01:04:10.700Z\"}','2026-11-09 01:04:10','2026-11-09 01:13:09');
/*!40000 ALTER TABLE `pedidodroguerias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recetaId` int DEFAULT NULL,
  `principioActivoId` int DEFAULT NULL,
  `principioActivoTexto` varchar(255) DEFAULT NULL,
  `nombreCliente` varchar(255) NOT NULL,
  `dniCliente` varchar(255) DEFAULT NULL,
  `telefonoCliente` varchar(255) NOT NULL,
  `origenPedido` enum('mostrador','telefono','email') DEFAULT 'mostrador',
  `precio` decimal(10,2) DEFAULT '0.00',
  `dosis` varchar(255) NOT NULL,
  `csp` varchar(255) NOT NULL,
  `urgente` tinyint(1) DEFAULT '0',
  `pinControl` varchar(4) NOT NULL,
  `diaHoraRetiro` datetime NOT NULL,
  `estadoPedido` enum('ingresado','pendiente_pago','en_preparacion','listo_retiro','entregado','cancelado') DEFAULT 'ingresado',
  `numeroPreparado` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recetaId` (`recetaId`),
  KEY `principioActivoId` (`principioActivoId`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_10` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_11` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_12` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_13` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_14` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_15` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_16` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_17` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_18` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_19` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_20` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_21` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_22` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_23` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_24` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_25` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_26` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_27` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_28` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_29` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_3` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_30` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_31` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_32` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_33` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_34` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_35` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_36` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_37` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_38` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_39` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_4` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_40` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_41` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_42` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_43` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_44` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_45` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_46` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_47` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_48` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_49` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_5` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_50` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_51` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_52` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_53` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_54` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_55` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_56` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_57` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_58` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_59` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_6` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_60` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_61` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_62` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_63` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_64` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_65` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_66` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_67` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_68` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_69` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_7` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_70` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_71` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_72` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_73` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_74` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_75` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_76` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_77` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_78` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_79` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_8` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_80` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_81` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_82` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_83` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_84` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_85` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_86` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_87` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_88` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_89` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_9` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_90` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_91` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_92` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_93` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_94` FOREIGN KEY (`recetaId`) REFERENCES `recetas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_ibfk_95` FOREIGN KEY (`principioActivoId`) REFERENCES `principioactivos` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (7,6,7,'Sertralina','Juan Perez','32456789','1145678901','mostrador',4500.00,'50 mg','60 capsulas',1,'5149','2026-10-23 15:00:21','entregado','REC.01','2026-10-23 15:00:21','2026-11-04 23:45:47'),(8,7,8,'LosartÃ¡n','Gabriel Omar Pereyra','22456789','11-2345-6788','mostrador',0.00,'50 mg','30 comprimidos',1,'4462','2026-10-23 15:27:08','entregado','4462','2026-10-23 15:27:08','2026-11-04 23:45:47'),(9,9,9,'Atorvastatina','MarÃ­a Florencia Silva','28194053','11-3829-4820','mostrador',0.00,'20 mg','30 cÃ¡psulas',0,'9216','2026-10-25 17:03:30','listo_retiro','LP-2026-0009','2026-10-23 17:03:30','2026-11-04 23:45:47'),(10,10,8,'LosartÃ¡n','Gabriel Omar Pereyra','22456789','11-2345-6789','mostrador',0.00,'50 mg','30 comprimidos',0,'8433','2026-10-25 17:18:45','listo_retiro','LP-2026-0010','2026-10-23 17:18:45','2026-11-04 23:45:47'),(11,11,8,'LosartÃ¡n','Gabriel Omar Pereyra','22456789','11-2345-6789','mostrador',0.00,'50 mg','30 comprimidos',1,'0068','2026-10-23 20:40:07','listo_retiro','LP-2026-0011','2026-10-23 20:40:07','2026-11-04 23:45:48'),(12,12,4,'Morfina','Gabriel Omar Pereyra','22456789','11-2345-6789','mostrador',0.00,'10 mg','30 comprimidos',1,'2984','2026-11-04 21:44:23','listo_retiro','LP-2026-0012','2026-11-04 21:44:24','2026-11-04 23:45:48'),(13,13,10,'Diclofenac','MarÃ­a Florencia Silva','28194053','11-3829-4820','mostrador',0.00,'100 mg','10 comprimidos',0,'9860','2026-11-06 22:17:12','entregado','LP-2026-0013','2026-11-04 22:17:12','2026-11-06 15:49:39'),(14,14,8,'LosartÃ¡n','Juan PÃ©rez','32456789','1145678901','mostrador',0.00,'50 mg','60 cÃ¡psulas',1,'8955','2026-11-05 14:18:51','entregado','LP-2026-0014','2026-11-05 14:18:51','2026-11-06 17:17:46'),(15,15,1,'Ibuprofeno','Gabriel Omar Pereyra','22456789','11-2345-6789','mostrador',0.00,'600 mg','12 comprimidos',1,'2469','2026-11-05 14:56:30','listo_retiro','LP-2026-0015','2026-11-05 14:56:30','2026-11-06 17:19:56'),(16,16,7,'Sertralina','Juan PÃ©rez','32456789','11-4567-8901','mostrador',0.00,'50 mg','60 cÃ¡psulas',0,'3497','2026-11-07 15:50:31','listo_retiro','LP-2026-0016','2026-11-05 15:50:31','2026-11-06 17:19:32'),(17,18,7,'Sertralina','Gabriel Omar Pereyra','22456789','11-2345-6789','mostrador',0.00,'50 mg','30 comprimidos',0,'9786','2026-11-08 15:43:18','en_preparacion',NULL,'2026-11-06 15:43:18','2026-11-06 17:19:28'),(18,19,7,'Sertralina','MarÃ­a Florencia Silva','28194053','11-3829-4820','mostrador',0.00,'20 mg','30 cÃ¡psulas',0,'2100','2026-11-08 15:46:52','listo_retiro','LP-2026-0018','2026-11-06 15:46:52','2026-11-06 17:19:36'),(19,20,11,'Lactobasilus Rhamnosus, Lactobasilus Plantarum, Lactobasilus Acidofilus','Daniela Romina GREPPI','34321667','1123456789','mostrador',0.00,'1 BLH de cada uno','20 capsulas vaginales',0,'9458','2026-11-11 01:04:10','entregado','LP-2026-0019','2026-11-09 01:04:10','2026-11-09 01:23:41');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `principioactivos`
--

DROP TABLE IF EXISTS `principioactivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `principioactivos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `stockDisponible` decimal(10,2) DEFAULT '0.00',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `principioactivos`
--

LOCK TABLES `principioactivos` WRITE;
/*!40000 ALTER TABLE `principioactivos` DISABLE KEYS */;
INSERT INTO `principioactivos` VALUES (1,'Ibuprofeno',42.80,'2026-10-02 17:02:03','2026-11-06 17:19:27'),(2,'Paracetamol',100.00,'2026-10-02 17:02:03','2026-10-02 17:02:03'),(3,'Amoxicilina',50.00,'2026-10-02 17:02:03','2026-11-04 23:36:17'),(4,'Morfina',0.00,'2026-10-02 17:02:03','2026-10-02 17:02:03'),(7,'Sertralina',94.90,'2026-11-04 23:45:47','2026-11-06 17:19:32'),(8,'LosartÃ¡n',49.00,'2026-11-04 23:45:47','2026-11-05 14:19:58'),(9,'Atorvastatina',20.00,'2026-11-04 23:45:47','2026-11-09 01:36:36'),(10,'Diclofenac',9.00,'2026-11-04 23:45:48','2026-11-05 14:07:16'),(11,'Lactobasilus Rhamnosus, Lactobasilus Plantarum, Lactobasilus Acidofilus',4.98,'2026-11-09 01:04:10','2026-11-09 01:13:11'),(13,'Minoxidil',5.00,'2026-11-09 01:37:16','2026-11-09 01:37:16'),(14,'oxido de zinc',100.00,'2026-11-09 01:38:53','2026-11-09 01:38:53'),(15,'Piridoxina',30.00,'2026-11-09 01:40:21','2026-11-09 01:40:31');
/*!40000 ALTER TABLE `principioactivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recetas`
--

DROP TABLE IF EXISTS `recetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recetas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigoBarras` varchar(255) DEFAULT NULL,
  `matriculaMedico` varchar(255) DEFAULT NULL,
  `imagenUrl` varchar(255) DEFAULT NULL,
  `selloImagenUrl` varchar(255) DEFAULT NULL,
  `esDigital` tinyint(1) DEFAULT '1',
  `fechaEmision` date DEFAULT NULL,
  `esValida` tinyint(1) DEFAULT '0',
  `motivoRechazo` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recetas`
--

LOCK TABLES `recetas` WRITE;
/*!40000 ALTER TABLE `recetas` DISABLE KEYS */;
INSERT INTO `recetas` VALUES (4,'843920155682','M.N. 94.852','/uploads/recetas/receta-1792766966165-21d118a2881d.jfif',NULL,1,'2026-10-18',1,NULL,'2026-10-23 14:51:32','2026-10-23 14:51:32'),(5,'843920155682','M.N. 94.852','/uploads/recetas/receta-1792766966165-21d118a2881d.jfif',NULL,1,'2026-10-18',1,NULL,'2026-10-23 14:51:44','2026-10-23 14:51:44'),(6,'843920155682','M.N. 94.852',NULL,NULL,1,'2026-10-18',1,NULL,'2026-10-23 15:00:21','2026-10-23 15:00:21'),(7,'7795432109876','52810','/uploads/recetas/receta-1792768984735-07d1ac319335.jfif',NULL,1,'2026-10-12',1,NULL,'2026-10-23 15:27:08','2026-10-23 15:27:08'),(8,'7795432109876','M.N. 52.810 / M.P. 33.142','/uploads/recetas/receta-1792773673468-6c94f44a0b05.jfif',NULL,1,'2026-12-12',0,'Receta vencida (> 30 dÃ­as)','2026-10-23 16:45:56','2026-10-23 16:45:56'),(9,'7791234567892','M.N. 105.432 / M.P. 33.190','/uploads/recetas/receta-1792774976666-1789e6d43d90.jfif',NULL,1,'2026-10-15',1,NULL,'2026-10-23 17:03:30','2026-10-23 17:03:30'),(10,'7795432109876','M.N. 52.810 / M.P. 33.142','/uploads/recetas/receta-1792775888453-4bd92d1eaa03.jfif',NULL,1,'2026-10-12',1,NULL,'2026-10-23 17:18:45','2026-10-23 17:18:45'),(11,'7795432109876','M.N. 52.810 / M.P. 33.142','/uploads/recetas/receta-1792787967907-4f3a319bec12.jfif',NULL,1,'2026-10-12',1,NULL,'2026-10-23 20:40:06','2026-10-23 20:40:06'),(12,'7795432109876','M.N. 52.810 / M.P. 33.142','/uploads/recetas/receta-1793828573193-21900bc111a5.jfif',NULL,1,'2026-10-12',1,NULL,'2026-11-04 21:44:23','2026-11-04 21:44:23'),(13,'7791234567892','M.N. 105.432 / M.P. 33.190','/uploads/recetas/receta-1793830581084-47265727c511.jfif',NULL,1,'2026-10-15',1,NULL,'2026-11-04 22:17:12','2026-11-04 22:17:12'),(14,'843920155682','94852','/uploads/recetas/receta-1793888273274-93630e46584d.jfif',NULL,1,'2026-10-18',1,NULL,'2026-11-05 14:18:51','2026-11-05 14:18:51'),(15,'7795432109876','M.N. 52.810 / M.P. 33.142','/uploads/recetas/receta-1793890468150-98086d37a324.jfif',NULL,1,'2026-10-12',1,NULL,'2026-11-05 14:56:30','2026-11-05 14:56:30'),(16,'843920165682','M.N. 94.852 / M.P. 44.112','/uploads/recetas/receta-1793893817032-231c93473894.jpg',NULL,1,'2026-10-18',1,NULL,'2026-11-05 15:50:31','2026-11-05 15:50:31'),(17,NULL,'94.852','/uploads/recetas/receta-1793979606150-f4d30a464338.jfif',NULL,1,'2026-11-06',0,'Otro motivo: Codigo de Barras Ilegible','2026-11-06 15:42:06','2026-11-06 15:42:06'),(18,'7795432109876','M.N. 52.810 / M.P. 33.142','/uploads/recetas/receta-1793979734981-cb8b446aeb4d.jfif',NULL,1,'2026-10-12',1,NULL,'2026-11-06 15:43:18','2026-11-06 15:43:18'),(19,'7791234567892','M.N. 105.432 / M.P. 33.190','/uploads/recetas/receta-1793979958431-79be57551a79.jfif',NULL,1,'2026-10-15',1,NULL,'2026-11-06 15:46:52','2026-11-06 15:46:52'),(20,'0156027414753','45892','/uploads/recetas/receta-1794186217063-83d6acdd67cd.jpeg',NULL,1,'2026-11-01',1,NULL,'2026-11-09 01:04:09','2026-11-09 01:04:09'),(21,NULL,'87654321','/uploads/recetas/receta-1794613120328-21816b55485b.jfif',NULL,1,'2026-11-12',0,'Otro motivo: No cÃ³digo de barras','2026-11-13 23:38:59','2026-11-13 23:38:59');
/*!40000 ALTER TABLE `recetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reclamos`
--

DROP TABLE IF EXISTS `reclamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reclamos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedidoId` int NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `descripcion` text,
  `estado` enum('abierto','en_revision','resuelto') DEFAULT 'abierto',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pedidoId` (`pedidoId`),
  CONSTRAINT `reclamos_ibfk_1` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_10` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_11` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_12` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_13` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_14` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_15` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_16` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_17` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_18` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_19` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_2` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_20` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_21` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_22` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_23` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_24` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_25` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_26` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_27` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_28` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_29` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_3` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_30` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_31` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_32` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_33` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_34` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_35` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_36` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_37` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_38` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_39` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_4` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_40` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_41` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_42` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_43` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_44` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_45` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_5` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_6` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_7` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_8` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_9` FOREIGN KEY (`pedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reclamos`
--

LOCK TABLES `reclamos` WRITE;
/*!40000 ALTER TABLE `reclamos` DISABLE KEYS */;
INSERT INTO `reclamos` VALUES (1,8,'Demora','La fecha estÃ¡ mal emitida','abierto','2026-10-23 15:30:33','2026-10-23 15:30:33');
/*!40000 ALTER TABLE `reclamos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20260909143342-create-configuracion-sistema.js'),('20260909143634-create-principio-activo.js'),('20260909143716-create-receta.js'),('20260909143817-create-pedido.js'),('20260909143842-create-pago.js'),('20260909143904-create-pedido-drogueria.js'),('20260909143925-create-reclamo.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'labowork_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-15 19:08:03


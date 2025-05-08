-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-01-2025 a las 00:25:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecoaquafarmbasic`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `clients` (
  `id` varchar(36) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `codigoPostal` varchar(255) DEFAULT NULL,
  `provincia` varchar(255) DEFAULT NULL,
  `pais` varchar(255) DEFAULT NULL,
  `tipoCliente` varchar(255) DEFAULT NULL,
  `dniCif` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mensaje` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clients`
--

INSERT INTO `clients` (`id`, `nombre`, `apellidos`, `telefono`, `direccion`, `codigoPostal`, `provincia`, `pais`, `tipoCliente`, `dniCif`, `email`, `mensaje`, `createdAt`, `updatedAt`) VALUES
('1', 'Jacobo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:13', '2025-01-12 23:16:13'),
('10', 'Pedro', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:13', '2025-01-12 23:16:13'),
('11', 'Francisco', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('12', 'Jordi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('13', 'Enrique', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('14', 'Ángel', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('15', 'Mariela', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('16', 'Jose', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('17', 'Xavi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('18', 'Manuel', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('19', 'Bernat', NULL, NULL, 'Vidreres, Girona 17411', '17411', 'Girona', 'España', NULL, NULL, NULL, NULL, '2025-01-12 23:16:56', '2025-01-12 23:40:01'),
('2', 'Llorens', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:13', '2025-01-12 23:16:13'),
('20', 'Perfecto', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('21', 'Ma', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('22', 'María', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('23', 'Manuel', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('24', 'Jose', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('25', 'Rocío', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('26', 'Juan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('27', 'Antonio', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('28', 'Juan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('29', 'Manolo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('3', 'José', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:13', '2025-01-12 23:16:13'),
('30', 'Jose', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('31', 'Juan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('32', 'Eva', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('33', 'Miguel', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('34', 'José', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('35', 'María', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('36', 'Pedro', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('4', 'David', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:13', '2025-01-12 23:16:13'),
('5', 'Marbin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:13', '2025-01-12 23:16:13'),
('6', 'Antonio', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:13', '2025-01-12 23:16:13'),
('7', 'Montser', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:13', '2025-01-12 23:16:13'),
('7daf1e92-34af-4cc2-97d7-50e61be929f3', 'Clientes Varios', '', '', '', '', '', '', 'particular', 'VARIOUS_CLIENTS', '', '', '2025-01-12 22:29:13', '2025-01-12 22:29:13'),
('8', 'Jorge', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:13', '2025-01-12 23:16:13'),
('9', 'Equipamientos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-12 23:16:13', '2025-01-12 23:16:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invoices`
--

CREATE TABLE `invoices` (
  `id` varchar(36) NOT NULL,
  `numberInvoice` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `paymentMethod` varchar(255) DEFAULT NULL,
  `paymentDate` datetime DEFAULT NULL,
  `clientId` varchar(255) DEFAULT NULL,
  `storeId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `invoices`
--

INSERT INTO `invoices` (`id`, `numberInvoice`, `total`, `date`, `paymentMethod`, `paymentDate`, `clientId`, `storeId`, `createdAt`, `updatedAt`) VALUES
('0e656d45-d133-11ef-b075-f0921cf5b6ec', 21, 68, '2024-11-06 00:00:00', 'Amazon', NULL, '21', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('0e657870-d133-11ef-b075-f0921cf5b6ec', 22, 68, '2024-11-11 00:00:00', 'Amazon', NULL, '22', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('0e65792d-d133-11ef-b075-f0921cf5b6ec', 23, 68, '2024-11-12 00:00:00', 'Amazon', NULL, '23', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('0e6579a0-d133-11ef-b075-f0921cf5b6ec', 24, 99, '2024-11-13 00:00:00', 'Amazon', NULL, '24', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('0e657a21-d133-11ef-b075-f0921cf5b6ec', 25, 99, '2024-11-15 00:00:00', 'Amazon', NULL, '25', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('0e657a89-d133-11ef-b075-f0921cf5b6ec', 26, 59, '2024-11-15 00:00:00', 'Amazon', NULL, '26', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('0e657aea-d133-11ef-b075-f0921cf5b6ec', 27, 75, '2024-11-16 00:00:00', 'Amazon', NULL, '27', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('0e657b77-d133-11ef-b075-f0921cf5b6ec', 28, 68, '2024-11-17 00:00:00', 'Amazon', NULL, '28', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('0e657be8-d133-11ef-b075-f0921cf5b6ec', 29, 59, '2024-11-20 00:00:00', 'Amazon', NULL, '29', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('0e65e5d8-d133-11ef-b075-f0921cf5b6ec', 30, 59, '2024-11-23 00:00:00', 'Amazon', NULL, '30', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:17:46', '2025-01-12 23:17:46'),
('253803aa-d133-11ef-b075-f0921cf5b6ec', 31, 68, '2024-11-26 00:00:00', 'Amazon', NULL, '31', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('25380fb9-d133-11ef-b075-f0921cf5b6ec', 32, 59, '2024-11-27 00:00:00', 'Amazon', NULL, '32', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('2538108c-d133-11ef-b075-f0921cf5b6ec', 33, 68, '2024-11-28 00:00:00', 'Amazon', NULL, '33', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('25381102-d133-11ef-b075-f0921cf5b6ec', 34, 59, '2024-12-01 00:00:00', 'Amazon', NULL, '34', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('2538116c-d133-11ef-b075-f0921cf5b6ec', 35, 99, '2024-12-08 00:00:00', 'Amazon', NULL, '35', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('253811cf-d133-11ef-b075-f0921cf5b6ec', 36, 68, '2024-12-16 00:00:00', 'Amazon', NULL, '36', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('2ddbaf32-29fa-436c-8344-c5f7f67ec235', 37, 55, '2025-01-12 22:29:13', 'Amazon', '2025-01-12 00:00:00', '7daf1e92-34af-4cc2-97d7-50e61be929f3', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 22:29:13', '2025-01-12 22:29:13'),
('d6fd73b2-d132-11ef-b075-f0921cf5b6ec', 1, 65, '2024-10-01 00:00:00', 'Amazon', NULL, '1', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d6fd8211-d132-11ef-b075-f0921cf5b6ec', 2, 65, '2024-10-03 00:00:00', 'Amazon', NULL, '2', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d6fd837a-d132-11ef-b075-f0921cf5b6ec', 3, 65, '2024-10-04 00:00:00', 'Amazon', NULL, '3', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d6fd8410-d132-11ef-b075-f0921cf5b6ec', 4, 98.01, '2024-10-14 00:00:00', 'Amazon', NULL, '4', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d6fd848b-d132-11ef-b075-f0921cf5b6ec', 5, 65, '2024-10-15 00:00:00', 'Amazon', NULL, '5', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d6fd873e-d132-11ef-b075-f0921cf5b6ec', 6, 140, '2024-10-16 00:00:00', 'Amazon', NULL, '6', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d6fd88bf-d132-11ef-b075-f0921cf5b6ec', 7, 65, '2024-10-17 00:00:00', 'Amazon', NULL, '7', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d6fd896d-d132-11ef-b075-f0921cf5b6ec', 8, 65, '2024-10-15 00:00:00', 'Amazon', NULL, '8', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d6fd89de-d132-11ef-b075-f0921cf5b6ec', 9, 58.41, '2024-10-17 00:00:00', 'Amazon', NULL, '9', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d6fd8a3e-d132-11ef-b075-f0921cf5b6ec', 10, 65, '2024-10-18 00:00:00', 'Amazon', NULL, '10', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('f028bbb3-d132-11ef-b075-f0921cf5b6ec', 11, 65, '2024-10-19 00:00:00', 'Amazon', NULL, '11', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f028bf43-d132-11ef-b075-f0921cf5b6ec', 12, 59, '2024-10-19 00:00:00', 'Amazon', NULL, '12', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f028bfdc-d132-11ef-b075-f0921cf5b6ec', 13, 65, '2024-10-22 00:00:00', 'Amazon', NULL, '13', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f028c066-d132-11ef-b075-f0921cf5b6ec', 14, 65, '2024-10-22 00:00:00', 'Amazon', NULL, '14', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f028c0cf-d132-11ef-b075-f0921cf5b6ec', 15, 65, '2024-10-22 00:00:00', 'Amazon', NULL, '15', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f028c128-d132-11ef-b075-f0921cf5b6ec', 16, 75, '2024-10-30 00:00:00', 'Amazon', NULL, '16', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f028c185-d132-11ef-b075-f0921cf5b6ec', 17, 59, '2024-11-02 00:00:00', 'Amazon', NULL, '17', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f028c1dc-d132-11ef-b075-f0921cf5b6ec', 18, 99, '2024-11-02 00:00:00', 'Amazon', NULL, '18', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f028c233-d132-11ef-b075-f0921cf5b6ec', 19, 75, '2024-11-04 00:00:00', 'Amazon', NULL, '19', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f028c289-d132-11ef-b075-f0921cf5b6ec', 20, 59, '2024-11-05 00:00:00', 'Amazon', NULL, '20', 'b4481b05-7127-4340-8830-cb0d9cbafd50', '2025-01-12 23:16:56', '2025-01-12 23:16:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `description` varchar(255) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `price` float NOT NULL,
  `iva` float NOT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `devolucion` tinyint(1) DEFAULT 0,
  `invoiceId` varchar(36) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `description`, `cantidad`, `price`, `iva`, `barcode`, `devolucion`, `invoiceId`, `createdAt`, `updatedAt`) VALUES
('0e697ea2-d133-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 68, 21, NULL, 0, '0e656d45-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:17:47', '2025-01-12 23:17:47'),
('0e698b8b-d133-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 68, 21, NULL, 0, '0e657870-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:17:47', '2025-01-12 23:17:47'),
('0e698d0d-d133-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 68, 21, NULL, 0, '0e65792d-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:17:47', '2025-01-12 23:17:47'),
('0e698e10-d133-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Sumergible QDX1.5-32-0.75F 1HP', 1, 99, 21, NULL, 0, '0e6579a0-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:17:47', '2025-01-12 23:17:47'),
('0e698f2a-d133-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Sumergible QDX1.5-32-0.75F 1HP', 1, 99, 21, NULL, 0, '0e657a21-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:17:47', '2025-01-12 23:17:47'),
('0e699031-d133-11ef-b075-f0921cf5b6ec', 'Bomba de Agua 220V (EAFQB50)', 1, 59, 21, NULL, 0, '0e657a89-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:17:47', '2025-01-12 23:17:47'),
('0e6a0fb5-d133-11ef-b075-f0921cf5b6ec', 'Bomba Sumergible QDX3-18-0.55F', 1, 75, 21, NULL, 0, '0e657aea-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:17:47', '2025-01-12 23:17:47'),
('0e6a11e9-d133-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 68, 21, NULL, 0, '0e657b77-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:17:47', '2025-01-12 23:17:47'),
('0e6a1304-d133-11ef-b075-f0921cf5b6ec', 'Bomba de Agua 220V (EAFQB50)', 1, 59, 21, NULL, 0, '0e657be8-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:17:47', '2025-01-12 23:17:47'),
('0e6a142c-d133-11ef-b075-f0921cf5b6ec', 'Bomba de Agua 220V (EAFQB50)', 1, 59, 21, NULL, 0, '0e65e5d8-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:17:47', '2025-01-12 23:17:47'),
('253b4282-d133-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 68, 21, NULL, 0, '253803aa-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('253b5012-d133-11ef-b075-f0921cf5b6ec', 'Bomba de Agua 220V (EAFQB50)', 1, 59, 21, NULL, 0, '25380fb9-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('253b51a5-d133-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 68, 21, NULL, 0, '2538108c-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('253b52d0-d133-11ef-b075-f0921cf5b6ec', 'Bomba de Agua 220V (EAFQB50)', 1, 59, 21, NULL, 0, '25381102-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('253b53e6-d133-11ef-b075-f0921cf5b6ec', 'Bomba Sumergible QDX1.5-32-0.75F', 1, 99, 21, NULL, 0, '2538116c-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('253b5510-d133-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 68, 21, NULL, 0, '253811cf-d133-11ef-b075-f0921cf5b6ec', '2025-01-12 23:18:25', '2025-01-12 23:18:25'),
('695hg3n0l', 'Pantalla 2', 1, 45.4545, 21, NULL, 0, '2ddbaf32-29fa-436c-8344-c5f7f67ec235', '2025-01-12 22:29:13', '2025-01-12 22:29:13'),
('d7022e07-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 65, 21, NULL, 0, 'd6fd73b2-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d70238e6-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 65, 21, NULL, 0, 'd6fd8211-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d7023a2a-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 65, 21, NULL, 0, 'd6fd837a-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d7023ae3-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Sumergible QDX1.5-32-0.75F 1HP', 1, 98.01, 21, NULL, 0, 'd6fd8410-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d7023b93-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 65, 21, NULL, 0, 'd6fd848b-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d7023c35-d132-11ef-b075-f0921cf5b6ec', 'Bomba Sumergible QDX3-18-0.55F - 0.55kW/0.75Hp', 2, 70, 21, NULL, 0, 'd6fd873e-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d702b47f-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 65, 21, NULL, 0, 'd6fd88bf-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d702b70e-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 65, 21, NULL, 0, 'd6fd896d-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d702b7e7-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua 220V (EAFQB50)', 1, 58.41, 21, NULL, 0, 'd6fd89de-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('d702b8bf-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 65, 21, NULL, 0, 'd6fd8a3e-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:14', '2025-01-12 23:16:14'),
('f02d238b-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 65, 21, NULL, 0, 'f028bbb3-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f02d2f4f-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua 220V (EAFQB50)', 1, 59, 21, NULL, 0, 'f028bf43-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f02d30d1-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 65, 21, NULL, 0, 'f028bfdc-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f02d31fc-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 65, 21, NULL, 0, 'f028c066-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f02d32e2-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Periférica QB60 0.5HP 220V', 1, 65, 21, NULL, 0, 'f028c0cf-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f02d33c4-d132-11ef-b075-f0921cf5b6ec', 'Bomba Sumergible QDX3-18-0.55F', 1, 75, 21, NULL, 0, 'f028c128-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f02d34e1-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua 220V (EAFQB50)', 1, 59, 21, NULL, 0, 'f028c185-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f02da730-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua Sumergible QDX1.5-32-0.75F 1HP', 1, 99, 21, NULL, 0, 'f028c1dc-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f02da97e-d132-11ef-b075-f0921cf5b6ec', 'Bomba Sumergible QDX3-18-0.55F', 1, 75, 21, NULL, 0, 'f028c233-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:56', '2025-01-12 23:16:56'),
('f02daa8a-d132-11ef-b075-f0921cf5b6ec', 'Bomba de Agua 220V (EAFQB50)', 1, 59, 21, NULL, 0, 'f028c289-d132-11ef-b075-f0921cf5b6ec', '2025-01-12 23:16:56', '2025-01-12 23:16:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `return_invoices`
--

CREATE TABLE `return_invoices` (
  `id` varchar(36) NOT NULL,
  `originalInvoiceId` varchar(36) NOT NULL,
  `storeId` varchar(36) NOT NULL,
  `returnAmount` float NOT NULL,
  `returnDate` datetime DEFAULT NULL,
  `reason` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stores`
--

CREATE TABLE `stores` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `opening_hours` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`opening_hours`)),
  `whatsapp_phone` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `manager` varchar(255) DEFAULT NULL,
  `capacity` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `billing_postal_code` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `locality` varchar(255) DEFAULT NULL,
  `billing_name` varchar(255) DEFAULT NULL,
  `billing_address` varchar(255) DEFAULT NULL,
  `billing_cif` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `stores`
--

INSERT INTO `stores` (`id`, `name`, `address`, `phone`, `email`, `opening_hours`, `whatsapp_phone`, `website`, `manager`, `capacity`, `notes`, `billing_postal_code`, `province`, `locality`, `billing_name`, `billing_address`, `billing_cif`, `createdAt`, `updatedAt`) VALUES
('b4481b05-7127-4340-8830-cb0d9cbafd50', 'EcoAquaFarm - Adrian Vazquez Lombardia', 'Ronda Mercedes n45 Bajo', '679159312', 'adri_vl9@hotmail.com', '\"{}\"', NULL, NULL, NULL, NULL, NULL, '27002', 'Lugo', 'Lugo', NULL, 'Ronda Mercedes n45 Bajo', '33555007P', '2025-01-12 22:11:29', '2025-01-12 22:11:29');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `storeId` (`storeId`),
  ADD KEY `clientId` (`clientId`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoiceId` (`invoiceId`);

--
-- Indices de la tabla `return_invoices`
--
ALTER TABLE `return_invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `originalInvoiceId` (`originalInvoiceId`),
  ADD KEY `storeId` (`storeId`);

--
-- Indices de la tabla `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_5` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`invoiceId`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `return_invoices`
--
ALTER TABLE `return_invoices`
  ADD CONSTRAINT `return_invoices_ibfk_3` FOREIGN KEY (`originalInvoiceId`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `return_invoices_ibfk_4` FOREIGN KEY (`storeId`) REFERENCES `stores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-11-2025 a las 20:54:12
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `skireldbs`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `ID_Cliente` int(70) NOT NULL,
  `Nombre` varchar(70) NOT NULL,
  `Apellido` varchar(30) NOT NULL,
  `Email` varchar(70) NOT NULL,
  `PasswordHash` varchar(70) NOT NULL,
  `contorno_pecho` float NOT NULL,
  `contorno_cintura` float NOT NULL,
  `contorno_cadera` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`ID_Cliente`, `Nombre`, `Apellido`, `Email`, `PasswordHash`, `contorno_pecho`, `contorno_cintura`, `contorno_cadera`) VALUES
(1, 'asd', '', 'xd@gmail.com', '$2b$10$dZk6gxlocLJ5JU2VuCUjvOBvRIczqi0qAgERYSZq.fdMI35xNqt.O', 0, 0, 0),
(2, 'AR', 'Hola', 'hola@gmail.com', 'a', 2, 2, 2),
(3, 'asd', 'asd', 'asd@gmail.com', '$2b$10$m1/1LCSwp/Bzfg0k92y0mOz9QNGhGzyI1dJ0XcxQ0YmaRyuA2Xu7O', 0, 0, 0),
(4, 'asfm', 'asfm', 'asfm@gmaill.com', '$2b$10$QnEZD3uHW0OyAXNnoTjAp.yPdIJtEwcnuxArwtCO8zhr8dQRgOvvS', 2, 2, 2),
(5, 'Diseñadora', 'Diseñadora', 'diseñadora@gmail.com', '$2b$10$Z3I0.boOfy6Qh0DOG.7JHeE8jkq3UJ5eIVau5JLocOWv.tT132JlW', 0, 0, 0),
(6, 'a', 'a', 'a@gmail.com', '$2b$10$t0ul9mdmAbV7y5XNW3sgbeorqm6sA5fW7mhbXQzz.ZUDnsd3SDbpW', 2, 2, 2),
(7, 'a', 'a', 'a@gmail.com', '$2b$10$TFbbaJe31EE.nFRT7m9pw.tAOWf6dEW4APPlEB8wES1pYlzPb/rfS', 2, 2, 2),
(8, '', '', '', '$2b$10$b1X/oAgcglYlF9z585gyC.u/NTdbZBmpDqTFpAzNr1VPXUix.xquC', 2, 2, 2),
(9, 'Juan', 'Perez', 'juanperez@gmail.com', '$2b$10$tFz4SEoO7Xx84yPBY4oFaulKyL8Y5qEdFI9CWX8s5s8fW.3IVC3Pi', 90, 80, 95),
(10, 'c', 'c', 'c@gmail.com', '$2b$10$NsiOR91uqDuits8YPKGtf.KeYVKeKUk08BLeelnKsSkrLZD6li/uG', 0, 0, 0),
(11, 'b', 'b', 'b@gmail.com', '$2b$10$IjAx9hr0Q12NbnfYt15jeOMxhTou0ENki3wpt2rwT7S9NpbCTVjjK', 0, 0, 0),
(12, 'Pedro', 'Perez', 'PedroPerez@gmail.com', '$2b$10$GlDoojcCB.YsYfOQYjAUeO8byAVQbCakvAmNuvVLbAHupVsEzJpvS', 2, 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `itempedido`
--

CREATE TABLE `itempedido` (
  `Cantidad` int(70) NOT NULL,
  `telaSeleccionada` varchar(70) NOT NULL,
  `colorSeleccionado` varchar(70) NOT NULL,
  `ID_item_pedido` int(11) NOT NULL,
  `ID_pedido` int(11) NOT NULL,
  `ID_prenda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `itempedido`
--

INSERT INTO `itempedido` (`Cantidad`, `telaSeleccionada`, `colorSeleccionado`, `ID_item_pedido`, `ID_pedido`, `ID_prenda`) VALUES
(1, 'qwrjqwrjqwr', 'qwrjqwrjqwr', 2, 29, 17),
(2, 'qwrjqwrjqwr', 'qwrjqwrjqwr', 3, 30, 17),
(1, 'asfasgasg12351235', 'asfasgasg12351235', 4, 31, 16),
(1, 'asfasgasg12351235', 'asfasgasg12351235', 5, 33, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `ID_Pedido` int(70) NOT NULL,
  `Fecha` date NOT NULL,
  `Estado` varchar(70) NOT NULL,
  `PrecioFinal` int(70) NOT NULL,
  `ID_Cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`ID_Pedido`, `Fecha`, `Estado`, `PrecioFinal`, `ID_Cliente`) VALUES
(29, '2025-11-26', 'Finalizado', 1, 5),
(30, '2025-11-26', 'Finalizado', 2, 12),
(31, '2025-11-26', 'Finalizado', 12351235, 12),
(33, '2025-11-26', 'Finalizado', 12351235, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prenda`
--

CREATE TABLE `prenda` (
  `ID_Prenda` int(70) NOT NULL,
  `Nombre` varchar(70) NOT NULL,
  `Descripcion` varchar(70) NOT NULL,
  `precioBase` varchar(70) NOT NULL,
  `opcionTela` varchar(70) NOT NULL,
  `opcionesColor` varchar(70) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prenda`
--

INSERT INTO `prenda` (`ID_Prenda`, `Nombre`, `Descripcion`, `precioBase`, `opcionTela`, `opcionesColor`, `imagen`) VALUES
(16, 'asfasgasg12351235', 'asfasgasg12351235', '12351235', 'asfasgasg12351235', 'asfasgasg12351235', '1764122851416-534450769.webp'),
(17, 'qwrjqwrjqwr', 'qwrjqwrjqwr', '1', 'qwrjqwrjqwr', 'qwrjqwrjqwr', '1764124582507-757389668.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`ID_Cliente`);

--
-- Indices de la tabla `itempedido`
--
ALTER TABLE `itempedido`
  ADD PRIMARY KEY (`ID_item_pedido`),
  ADD KEY `ID_pedido` (`ID_pedido`),
  ADD KEY `ID_prenda` (`ID_prenda`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`ID_Pedido`),
  ADD KEY `ID_Cliente` (`ID_Cliente`);

--
-- Indices de la tabla `prenda`
--
ALTER TABLE `prenda`
  ADD PRIMARY KEY (`ID_Prenda`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `ID_Cliente` int(70) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `itempedido`
--
ALTER TABLE `itempedido`
  MODIFY `ID_item_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `ID_Pedido` int(70) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `prenda`
--
ALTER TABLE `prenda`
  MODIFY `ID_Prenda` int(70) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `itempedido`
--
ALTER TABLE `itempedido`
  ADD CONSTRAINT `itempedido_ibfk_1` FOREIGN KEY (`ID_prenda`) REFERENCES `prenda` (`ID_Prenda`),
  ADD CONSTRAINT `itempedido_ibfk_2` FOREIGN KEY (`ID_pedido`) REFERENCES `pedido` (`ID_Pedido`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`ID_Cliente`) REFERENCES `cliente` (`ID_Cliente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

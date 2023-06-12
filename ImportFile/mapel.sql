-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 02, 2023 at 10:27 AM
-- Server version: 8.0.27
-- PHP Version: 8.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `si_absen`
--

-- --------------------------------------------------------

--
-- Table structure for table `mapel`
--

CREATE TABLE `mapel` (
  `id` int UNSIGNED NOT NULL,
  `nama_mapel` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mapel`
--

INSERT INTO `mapel` (`id`, `nama_mapel`, `created_at`, `updated_at`) VALUES
(1, 'ADMINISTRASI INFRASTRUKTUR JARINGAN	', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(2, 'ADMINISTRASI PAJAK', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(3, 'ADMINISTRASI SISTEM JARINGAN	', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(4, 'ADMINISTRASI TRANSAKSI', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(5, 'ADMINISTRASI UMUM	', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(6, 'AKUNTANSI DASAR', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(7, 'AKUNTANSI KEUANGAN', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(8, 'AKUNTANSI PERBANKAN DAN KEUANGAN MIKRO', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(9, 'ANIMASI', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(10, 'DASAR DASAR PPLG', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(11, 'APLIKASI PENGOLAH ANGKA/SPREADSHEET', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(12, 'BAHASA INDONESIA', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(13, 'BAHASA INGGRIS', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(14, 'BAHASA JAWA	', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(15, 'BAHASA MADURA', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(16, 'BASIS DATA', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(17, 'BISNIS ONLINE', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(18, 'DASAR DESAIN GRAFIS', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(19, 'DASAR SENI AUDIO VISUAL', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(20, 'DASAR – DASAR KREATIFITAS', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(21, 'DESAIN GRAFIS PERCETAKAN', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(22, 'EDITING', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(23, 'EDITING AUDIO DAN VIDEO	', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(24, 'EKONOMI BISNIS', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(25, 'ETIKA PROFESI', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(26, 'FISIKA', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(27, 'IPA', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(28, 'KEARSIPAN ', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(29, 'KIMIA', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(30, 'KOMPUTER AKUNTANSI', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(31, 'KOMPUTER DAN JARINGAN DASAR	', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(32, 'KOMUNIKASI BISNIS', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(33, 'KOMUNIKASI MASSA', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(34, 'KORESPONDENSI', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(35, 'LAYANAN LEMBAGA PERBANKAN DAN KEUANGAN MIKRO', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(36, 'MANAJEMEN PRODUKSI', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(37, 'MARKETING', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(38, 'MATEMATIKA', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(39, 'OTOMATISASI TATA KELOLA HUMAS DAN KEPROTOKOLAN', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(40, 'OTOMATISASI TATA KELOLA KEPEGAWAIAN', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(41, 'OTOMATISASI TATA KELOLA KEUANGAN', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(42, 'OTOMATISASI TATA KELOLA SARANA DAN PRASARANA', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(43, 'P. AKUNTANSI PER JASA DAGANG DAN MANUFAKTUR', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(44, 'PEMODELAN PERANGKAT LUNAK', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(45, 'PEMROGRAMAN BERORIENTASI OBYEK', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(46, 'PEMROGRAMAN DASAR', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(47, 'PEMROGRAMAN WEB DAN PERANGKAT BERGERAK', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(48, 'PENATAAN PRODUK', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(49, 'PENDIDIKAN AGAMA DAN BUDI PEKERTI', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(50, 'PENDIDIKAN AGAMA KATOLIK', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(51, 'PENDIDIKAN AGAMA KRISTEN', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(52, 'PENDIDIKAN JASMANI', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(53, 'PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(54, 'PENGELOLAAN BISNIS RITEL', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(55, 'PENGELOLAAN KAS', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(56, 'PERBANKAN DASAR', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(57, 'PERENCANAAN BISNIS', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(58, 'PRAKTIKUM AKUNTANSI LEMBAGA/INSTANSI PEMERINTAH', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(59, 'PRODUK KREATIF DAN KEWIRAUSAHAAN', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(60, 'PRODUKSI AUDIO VISUAL', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(61, 'SEJARAH INDONESIA', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(62, 'SENI BUDAYA', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(63, 'SIMULASI DAN KOMUNIKASI DIGITAL', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(64, 'SISTEM KOMPUTER', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(65, 'TATA ARTISTIK', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(66, 'TATA KAMERA', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(67, 'TATA SUARA', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(68, 'TEKNIK ANIMASI 2D DAN 3D', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(69, 'TEKNOLOGI JARINGAN BERBASIS LUAS (WAN)', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(70, 'TEKNOLOGI LAYANAN JARINGAN', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(71, 'TEKNOLOGI PERKANTORAN', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(72, 'TINJAUAN SENI', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(73, 'VISUAL EFFECT', '2023-03-07 05:13:24', '2023-03-07 05:13:24'),
(74, 'PERMODELAN PERANGKAT LUNAK DAN GAME', '2023-03-07 05:13:24', '2023-03-07 05:13:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mapel`
--
ALTER TABLE `mapel`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mapel`
--
ALTER TABLE `mapel`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
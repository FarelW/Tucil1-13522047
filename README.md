<h1 align="center">Tugas Kecil 1 IF2211 Strategi Algoritma</h1>
<h3 align="center">Penyelesaian Cyberpunk 2077 Breach Protocol dengan Algoritma Brute Force</p>

## Table of Contents

- [Overview](#overview)
    - [Built With](#built-with)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [About](#about)

## Overview

Made by:
- 13522047 - Farel Winalda [FarelW](https://github.com/FarelW)

Cyberpunk 2077 Breach Protocol adalah minigame meretas pada permainan video Cyberpunk 2077.
Minigame ini merupakan simulasi peretasan jaringan local dari ICE (Intrusion Countermeasures
Electronics) pada permainan Cyberpunk 2077. Komponen pada permainan ini antara lain adalah:
1. Token – terdiri dari dua karakter alfanumerik seperti E9, BD, dan 55.
2. Matriks – terdiri atas token-token yang akan dipilih untuk menyusun urutan kode.
3. Sekuens – sebuah rangkaian token (dua atau lebih) yang harus dicocokkan.
4. Buffer – jumlah maksimal token yang dapat disusun secara sekuensial.
Aturan permainan Breach Protocol antara lain:
1. Pemain bergerak dengan pola horizontal, vertikal, horizontal, vertikal (bergantian) hingga
semua sekuens berhasil dicocokkan atau buffer penuh.
IF2211 Strategi Algoritma – Tugas Kecil 1 1
2. Pemain memulai dengan memilih satu token pada posisi baris paling atas dari matriks.
3. Sekuens dicocokkan pada token-token yang berada di buffer.
4. Satu token pada buffer dapat digunakan pada lebih dari satu sekuens.
5. Setiap sekuens memiliki bobot hadiah atau reward yang variatif.
6. Sekuens memiliki panjang minimal berupa dua token.

### Built With
- [NextJS]()
- [Fiber]()
- [Golang]()

## Prerequisites

List any prerequisites that are required to run this project. For example:
- Go Programming Language
- Node Package Manager npm

## Installation

If you want to run this program you will need to set up 

1. Clone this repository in your local computer :
```shell
git clone https://github.com/FarelW/Tucil1-13522047
```

2. Open the directory :
```shell
cd Tucil1-13522047
```

3. Run the frontend :
```shell
cd src
npm install
npm run dev
```

4. run the backend (use other terminal)  :
```shell
cd src
go mod tidy
cd api
go run main.go
```

Make sure that you've already met the prerequisite requirements

## About

Hello there, 
if you curious about our other project you can check our github by click the link below and if you have any suggestion and criticism feel free to tell us. 

- [@FarelW](https://github.com/FarelW)

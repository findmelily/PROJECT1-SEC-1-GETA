# Project1-Sec-1-GETA

## 🛸 Member Responsiblities | สมาชิกและหน้าที่ความรับผิดชอบ

* 65130500007 นายจักรธร สอวิเศษ (20%)
  - หน้าที่: Home Button, Layout, Congratulation Modal
* 65130500028 นางสาวธมลวรรณ ซิ้มเจริญ (20%)
  - หน้าที่: Home Button, Timing, Layout
* 65130500049 นางสาวพัชรนันท์ จันทร์ศิริ (20%)
  - หน้าที่: Game Structure, Moves, Suffle Button, Level Button
* 65130500051 นางสาวพิณงาม สมบัติศรี (20%)
  - หน้าที่: Readme file, Correct Position, Complete Button, Font
* 65130500055 นางสาวแพรพิไล ชัยมงคลงาม (20%)
  - หน้าที่: Readme file, Correct Position, Sound Control

## 🛸 User Manual | คู่มือการใช้งาน

### App Infomation

Number Puzzle เป็นเกมฝึกสมองโดยที่ผู้เล่นจะต้องเรียงตัวเลขจากน้อยไปมากในตำแหน่งที่ถูกต้องภายในกล่องให้ได้

### Allowed Devices

* ตัวเกมทำในรูปแบบ responsive สามารถเล่นเกมได้ทั้งในรูปแบบ Desktop และ Mobile

### Rules

1. เมื่อเข้าสู่ตัวเกม ผู้เล่นสามารถเลือกระดับความยากจากทั้งหมดสามระดับเพื่อเริ่มเล่นเกม
   
   ![manual-1](/src/components/manual-1.png)
   
3. เมื่อกดเลือกระดับความยาก จากนั้นจะเข้าสู่หน้าของเกมที่มีกล่องบรรจุดตัวเลขที่ถูกสุ่มการจัดเรียงไว้พร้อมกับระบบจะเริ่มจับเวลาทันที
   โดยผู้เล่นสามารถการจัดเรียงตัวเลขด้วยการกดตัวเลขที่อยู่รอบช่องว่างเพื่อย้ายตัวเลขจากทั้ง 4 ทิศหรือไปทางซ้าย ขวา บน หรือล่าง ซึ่งทุกการเคลื่อนย้ายตัวเลขจะถูกนับทั้งหมด
   
   ![manual-2](/src/components/manual-2.png)
   
5. เมื่อตัวเลขอยู่ในตำแหน่งที่ถูกต้อง ตัวเลขจะเปลี่ยนสีพื้นหลังเป็นสีม่วง
   
   ![manual-3](/src/components/manual-3.png)
   
7. เกมจะจบลงเมื่อผู้เล่นสามารถจัดเรียงตัวเลขทั้งหมดได้ถูกต้อง จากนั้นจะแสดงผลลัพธ์ของการเล่นเกม
   
   ![manual-4](/src/components/manual-4.png)

### Tips ! พยายามแบ่งส่วนการจัดเรียง โดยการจัดเรียงให้ตัวเลขเรียงจากน้อยไปมากทีละส่วน แล้วค่อย ๆ ขยับไปทีละแถว !!

## 🛰️Web App Features

* Level Button
  ปุ่มเลือกระดับความยากของเกมทั้งสามระดับคือ Easy Medium และ Hard
    - Easy mode ตาราง 4x4 มีเลขให้เรียงระหว่าง 1 - 15
    - Medium mode ตาราง 5x5 มีเลขให้เรียงระหว่าง 1 - 24
    - Hard mode ตาราง 6x6 มีเลขให้เรียงระหว่าง 1 - 35

    ![manual-6](/src/components/manual-6.png)

* Shuffle Button
  สุ่มเรียงตัวเลขในช่องใหม่ในระดับความยากปัจจุบัน

* Home Button
  ย้อนกลับไปที่หน้าหลักของเกมเพื่อเลือกระดับความยากใหม่

* Complete (ปุ่มโกง)
  จะเรียงเลขในกล่องทั้งหมดให้ถูกต้องอัตโนมัติ โดยเอาช่องว่างไปอยู่ตำแหน่งสุดท้าย ปุ่มนี้ใช้เพื่อทดสอบหน้าแสดงความยินดีที่มาพร้อมกับผลลัพธ์จากการเล่นเกมประกอบด้วย จำนวนการเคลื่อนย้ายที่ผู้เล่นทำได้ และเวลาที่ผู้เล่นได้ใช้ไป
  
  ![manual-5](/src/components/manual-5.png)
  
* Sound Control
  สามารถเปิดปิดเสียงพื้นหลังและ sound effect ทั้งหมดได้

* Moves
  จำนวนการเคลื่อนย้ายที่ผู้เล่นได้ใช้ไป

* Time
  ระยะเวลาที่ใช้ในการเล่นโดยจะนับตั้งแต่ผู้เล่นกดเข้ามา นับเป็นหน่วยวินาที นาที ชั่วโมง

* Correct Position
  เมื่อผู้เล่นเรียงตัวเลขในตำแหน่งที่ถูกต้อง จะเปลี่ยนสีพื้นหลังเป็นสีเขียว
  

## ✨ Clip | วีดีโอสาธิตวิธีการใช้งาน
  - https://drive.google.com/file/d/1741aFGsyemtchhpQTN_jHaO_nrp4Sk0n/view?usp=sharing

## 🌙 Referrences | แหล่งอ้างอิง

* Inspired by (แรงบันดาลใจในการทำเกม)
  - https://puzzle-game-15.firebaseapp.com/game
  - https://www.bloggang.com/m/viewdiary.php?id=kie&month=08-2006&date=08&group=3&gblog=8

* Sound and Music (เพลงพื้นหลังและ sound effect ในเกม)
  - https://pixabay.com/users/lofi_hour-28600719/
  - https://pixabay.com/users/floraphonic-38928062/

* Icon and Background (รูปภาพประกอบในเกม)
  - https://www.canva.com/

* Font (รูปแบบตัวอักษรในเกม)
  - https://www.f0nt.com/release/mn-pu-khem/

* CSS Framework
  - https://tailwindcss.com/
  - https://daisyui.com/

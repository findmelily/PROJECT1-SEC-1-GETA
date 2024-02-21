# Project1-Sec-1-GETA

## 🛸 Member Responsiblity | สมาชิกและหน้าที่ความรับผิดชอบ

- 65130500007 นายจักรธร สอวิเศษ (20%)
  - หน้าที่: Home Button, Layout, Congratulation Modal
- 65130500028 นางสาวธมลวรรณ ซิ้มเจริญ (20%)
  - หน้าที่: Home Button, Timing, Layout
- 65130500049 นางสาวพัชรนันท์ จันทร์ศิริ (20%)
  - หน้าที่: Game structure, Move, Suffle Button, Level Button
- 65130500051 นางสาวพิณงาม สมบัติศรี (20%)
  - หน้าที่: Readme file, Correct Position, Complete Button, Font
- 65130500055 นางสาวแพรพิไล ชัยมงคลงาม (20%)
  - หน้าที่: Readme file, Correct Position, Sound Control

## 🛸 User manual | คู่มือการใช้งาน

### App Infomation

Number Puzzle : เป็นเกมฝึกสมองโดยที่ผู้เล่นจะต้องเรียงตัวเลขจากน้อยไปมากในตำแหน่งที่ถูกต้องภายในกล่องให้ได้

### วิธีการเล่น

1. เมื่อเข้าสู่ตัวเกม ผู้เล่นสามารถเลือกระดับความยากจากทั้งหมดสามระดับเพื่อเริ่มการเล่น
   ![manual-1](/src/components/manual-1.png)
2. ในการจัดเรียงตัวเลข แตะที่ตัวเลขที่อยู่รอบๆช่องว่างเพื่อย้ายมันไปทางซ้าย ขวา บน หรือล่าง
   ![manual-2](/src/components/manual-2.png)
3. เมื่อตัวเลขอยู่ในตำแหน่งที่ถูกต้อง ตัวเลขจะเปลี่ยนสีพื้นหลังเป็นสีม่วง
   ![manual-3](/src/components/manual-3.png)
4. เกมจะจบลงเมื่อผู้เล่นสามารถจัดเรียงตัวเลขทั้งหมดให้ถูกต้อง
   ![manual-4](/src/components/manual-4.png)

## 🛰️Web App Feature

- Level Button
  ปุ่มเลือกระดับความยากของเกมทั้งสามระดับคือ Easy Medium และ Hard mode
  - Easy mode : จะเป็นตาราง 4x4 มีเลขให้เรียงระหว่าง 1 - 15
  - Medium mode : จะเป็นตาราง 5x5 มีเลขให้เรียงระหว่าง 1 - 24
  - Hard mode : จะเป็นตาราง 6x6 มีเลขให้เรียงระหว่าง 1 - 35

    ![manual-6](/src/components/manual-6.png)

- Shuffle Button
  สุ่มเรียงตัวเลขในช่องใหม่ในระดับความยากปัจจุบัน

- Home Button
  ย้อนกลับไปที่หน้าหลักของเกมเพื่อเลือกระดับความยากใหม่

- Complete (ปุ่มโกง)
  จะเรียงเลขในกล่องทั้งหมดเพื่อที่จะโกง และเอาช่องว่างไปอยู่ตำแหน่งสุดท้าย
  
  ![manual-5](/src/components/manual-5.png)
  
- Sound control
  สามารถเปิดปิดเสียงพื้นหลังได้

- Moves
  จำนวนการเคลื่อนย้ายที่ผู้เล่นได้ใช้ไป โดยที่มีการเช็คว่าตัวเลขที่กดสามารถเคลื่อนไปยังช่องว่างได้หรือไม่ จะเคลื่อนย้ายได้เมื่อตัวเลขกับช่องว่างอยู่แถวเดียวกันและคอลัมต่างกัน 1 ค่า หรือ เมื่อตัวเลขกับช่องว่างอยู่คอลัมเดียวกันและแถวต่างกัน 1 ค่า พอเงื่อนไขถูกต้องจะ สลับตำแหน่งตัวเลขไปยังช่องว่าง และเมื่อมีการเคลื่อนย้าย 1 ครั้ง ค่า moves จะเพิ่มขึ้นมา 1

- Timing
  ระยะเวลาที่ใช้ในการเล่นโดยจะนับตั้งแต่ผู้เล่นกดเข้ามา นับเป็นหน่วยวินาที นาที ชั่วโมง

- Correct Position
  เมื่อผู้เล่นเรียงตัวเลขในตำแหน่งที่ถูกต้อง จะเปลี่ยนสีพื้นหลังเป็นสีเขียว

- Solved
  เมื่อผู้เล่นสามารถเรียงเลขได้ทั้งหมด จะมีป๊อปอัพขึ้นมาเป็นข้อความยินดี Congratulation

## ✨ Clip | วีดีโอสาธิต
https://drive.google.com/file/d/1b6Qdf-gN1Vry4Q7qHEut2FszamC5PXZH/view?usp=sharing

## 🌙 Referrence | แหล่งอ้างอิง

inspire by :
แรงบันดาลใจในการทำเกม
- https://puzzle-game-15.firebaseapp.com/game

sound and music:
เพลงพื้นหลัง
- https://pixabay.com/users/lofi_hour-28600719/
เสียงเมื่อตัวเลขเคลื่อนที่ และเสียงปุ่ม
- https://pixabay.com/users/floraphonic-38928062/

icons and background:
รูปทุกรูปที่ใช้
- https://www.canva.com/

font:
ฟ้อนที่ใช้
- https://www.f0nt.com/release/mn-pu-khem/

CSS framework:
- https://tailwindcss.com/
- https://daisyui.com/

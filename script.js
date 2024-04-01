// เลือกปุ่มสำหรับการสุ่มเลข
const randomButton = document.getElementById('random-button');
const reset = document.getElementById('reset');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const nextButton = document.getElementById('next');
const funcButtonsContainer = document.getElementById('func-buttons');

// ตัวแปรสำหรับเก็บข้อมูล
let userData = {
  name: '',
  age: ''
};
reset.style.display = 'none'
// ตัวแปรสำหรับจำนวนครั้งที่ต้องกรอก
let remainingEntries = 0;

// เพิ่ม Event Listener เมื่อคลิกที่ปุ่ม
randomButton.addEventListener('click', () => {
    // สุ่มเลข 1-9
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    if (randomNumber != 0){
      randomButton.style.display = 'none'
      reset.style.display = 'block'
    }

    // แสดงเลขที่สุ่มได้
    const resultDiv = document.getElementById('resultR');
    resultDiv.textContent = 'Number of your friends: ' + randomNumber;
    resultDiv.style.display = 'flex';
    
    remainingEntries = randomNumber; // กำหนดจำนวนครั้งที่ต้องกรอก

});

// เพิ่ม Event Listener เมื่อคลิกที่ปุ่ม Next
nextButton.addEventListener('click', () => {
    // ตรวจสอบว่าผู้ใช้กด random number แล้วหรือไม่
    if (remainingEntries === 0) {
        alert('Please generate random number first!');
        return;
    }

    // ตรวจสอบว่ากรอกชื่อและอายุหรือไม่
    if (!nameInput.value || !ageInput.value) {
        alert('Please fill in both name and age fields!');
        return;
    }

    // ตรวจสอบว่าอายุเป็นตัวเลขหรือไม่
    if (isNaN(ageInput.value)) {
        alert('Age must be a number!');
        ageInput.value = ''; // ล้างค่าใน input อายุ
        return;
    }

    // เก็บชื่อและอายุ
    userData.name = nameInput.value;
    userData.age = ageInput.value;

    // ลบค่าที่กรอกไป
    nameInput.value = '';
    ageInput.value = '';

    remainingEntries--; // ลดจำนวนครั้งที่ต้องกรอก

    // แสดงจำนวนครั้งที่เหลืออยู่
    const remainingEntriesDiv = document.querySelector('div.remaining-entries');
    remainingEntriesDiv.textContent = `Remaining entries: ${remainingEntries}`;

    // ตรวจสอบว่ากรอกครบแล้วหรือไม่
    if (remainingEntries === 0) {
        funcButtonsContainer.style.display = 'block';
        nextButton.style.display = 'none'

    }
});

// เพิ่ม Event Listener เมื่อคลิกที่ปุ่ม Function
funcButtonsContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
        switch (target.id) {
          case 'total':
            //เพิ่มโค้ดสำหรับคำนวณอายุรวมของเพื่อนทั้งหมด และแสดงผล
            break;
            case 'average':
                // เพิ่มโค้ดสำหรับคำนวณอายุเฉลี่ยของกลุ่มเพื่อน และแสดงผล
                break;
            case 'youngest':
                // เพิ่มโค้ดสำหรับคำนวณอายุของเพื่อนที่อายุน้อยที่สุด และแสดงผล
                break;
            case 'oldest':
                // เพิ่มโค้ดสำหรับคำนวณอายุของเพื่อนที่อายุมากที่สุด และแสดงผล
                break;
            default:
                break;
        }
    }
});
// เลือกปุ่มสำหรับการรีเซ็ต
reset.addEventListener('click', () => {
  // ล้างข้อมูลทั้งหมด
  userData = {
      name: '',
      age: ''
  };

  // ล้างค่าที่กรอก
  nameInput.value = '';
  ageInput.value = '';

  // รีเซ็ตผลลัพธ์และการแสดงผล
  const resultDiv = document.getElementById('resultR');
  resultDiv.textContent = '';
  resultDiv.style.display = 'none';

  const remainingEntriesDiv = document.querySelector('div.remaining-entries');
  remainingEntriesDiv.textContent = '';

  // ซ่อนปุ่มฟังก์ชัน
  funcButtonsContainer.style.display = 'none';
  nextButton.style.display = 'block';
  randomButton.style.display = 'block';
  reset.style.display = 'none';
});











     





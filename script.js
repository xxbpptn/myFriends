// เลือกปุ่มสำหรับการสุ่มเลข
const randomButton = document.getElementById('random-button');
const reset = document.getElementById('reset');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const nextButton = document.getElementById('next');
const funcButtonsContainer = document.getElementById('func-buttons');
// ตัวแปรสำหรับเก็บข้อมูล
let userData = [];

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
    userData.push({ name: nameInput.value, age: parseInt(ageInput.value) });

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
                const total = totalAge();
                ageR = total;

                break;
            case 'average':
                const ave = averageAge();
                ageR = ave;
                break;
            case 'youngest':
                const ageY = youngestAge();
                ageR = ageY;
                youngestName();
                break;
            case 'oldest':
                const ageO = oldestAge()
                ageR = ageO;
                oldestName();
                break;
            default:
                break;
        }
    }
            const AgeDisplay = document.getElementById('AgeDisplay');
            AgeDisplay.textContent = 'Total friend age: ' + ageR;
});
// เลือกปุ่มสำหรับการรีเซ็ต
reset.addEventListener('click', () => {
  // ล้างข้อมูลทั้งหมด
  userData = [];
  NameR = '';
  ageR = '';
  NameDisplay.textContent = '';
  AgeDisplay.textContent = '';

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
  totalAgeDisplay.style = 'none'
});

// ฟังก์ชันสำหรับคำนวณอายุรวมของเพื่อนทั้งหมด
function totalAge() {
    let totalAge = 0;
    for (let i = 0; i < userData.length; i++) {
        totalAge += userData[i].age;
    }
    return totalAge;
}



// ฟังก์ชันสำหรับคำนวณอายุเฉลี่ยของกลุ่มเพื่อน
function averageAge() {
    let totalAge = 0;
    for (let i = 0; i < userData.length; i++) {
        totalAge += userData[i].age;
    }
    const average = totalAge / userData.length;
    return average;
}


function youngestName() {
    NameDisplay.textContent = '';
    let minAge = Infinity; // กำหนดค่าอายุน้อยสุดเริ่มต้นเป็น Infinity เพื่อให้เป็นตัวเลขที่มากที่สุด
    let youngestFriends = []; // ตัวแปรสำหรับเก็บชื่อเพื่อนที่มีอายุน้อยที่สุด

    // วนลูปผ่าน userData เพื่อหาเพื่อนที่มีอายุน้อยที่สุด
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].age < minAge) {
            minAge = userData[i].age;
            youngestFriends = [userData[i].name]; // กำหนดชื่อเพื่อนที่มีอายุน้อยที่สุดใหม่
        } else if (userData[i].age === minAge) {
            youngestFriends.push(userData[i].name); // เพิ่มชื่อเพื่อนที่มีอายุเท่ากับค่าอายุน้อยสุด
        }
    }
    youngestFriends.forEach(friend => {
        const NameDisplay = document.getElementById('NameDisplay');
        NameDisplay.textContent += friend + ', '; // เพิ่มชื่อของเพื่อนในแต่ละรอบของการวนลูป
    });    

    return youngestFriends; // คืนค่าชื่อของเพื่อนที่มีอายุน้อยที่สุด
}

function youngestAge() {
    
    let minAge = Infinity; // กำหนดค่าอายุน้อยสุดเริ่มต้นเป็น Infinity เพื่อให้เป็นตัวเลขที่มากที่สุด
    let youngestAge = 0; // ตัวแปรสำหรับเก็บอายุของเพื่อนที่มีอายุน้อยที่สุด

    // วนลูปผ่าน userData เพื่อหาเพื่อนที่มีอายุน้อยที่สุด
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].age < minAge) {
            minAge = userData[i].age;
            youngestAge = minAge; // กำหนดอายุของเพื่อนที่มีอายุน้อยที่สุดใหม่
        }
    }

    return youngestAge; // คืนค่าอายุของเพื่อนที่มีอายุน้อยที่สุด
}

function oldestName() {
    NameDisplay.textContent = '';
    let maxAge = -Infinity; // กำหนดค่าอายุมากสุดเริ่มต้นเป็น -Infinity เพื่อให้เป็นตัวเลขที่น้อยที่สุด
    let oldestFriends = []; // ตัวแปรสำหรับเก็บชื่อเพื่อนที่มีอายุมากที่สุด

    // วนลูปผ่าน userData เพื่อหาเพื่อนที่มีอายุมากที่สุด
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].age > maxAge) {
            maxAge = userData[i].age;
            oldestFriends = [userData[i].name]; // กำหนดชื่อเพื่อนที่มีอายุมากที่สุดใหม่
        } else if (userData[i].age === maxAge) {
            oldestFriends.push(userData[i].name); // เพิ่มชื่อเพื่อนที่มีอายุเท่ากับค่าอายุมากสุด
        }
    }
    oldestFriends.forEach(friend => {
        const NameDisplay = document.getElementById('NameDisplay');
        NameDisplay.textContent += friend + ', '; // เพิ่มชื่อของเพื่อนในแต่ละรอบของการวนลูป
    });

    return oldestFriends; // คืนค่าชื่อของเพื่อนที่มีอายุมากที่สุด
}

function oldestAge() {
    let maxAge = -Infinity; // กำหนดค่าอายุมากสุดเริ่มต้นเป็น -Infinity เพื่อให้เป็นตัวเลขที่น้อยที่สุด
    let oldestAge = 0; // ตัวแปรสำหรับเก็บอายุของเพื่อนที่มีอายุมากที่สุด

    // วนลูปผ่าน userData เพื่อหาเพื่อนที่มีอายุมากที่สุด
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].age > maxAge) {
            maxAge = userData[i].age;
            oldestAge = maxAge; // กำหนดอายุของเพื่อนที่มีอายุมากที่สุดใหม่
        }
    }

    return oldestAge; // คืนค่าอายุของเพื่อนที่มีอายุมากที่สุด
}



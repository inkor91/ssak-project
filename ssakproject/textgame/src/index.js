var name = prompt("캐릭터 이름을 입력하세요.");
var job = prompt("직업 설정. 전사 or 마법사");

var validJobs = ["전사", "마법사"];

var isValidJob = validJobs.includes(job);

if (!isValidJob) {
  alert("유효한 직업이 아닙니다.");
} else {
  switch (job) {
    case "전사":
      var validWeapon = ["칼", "도끼", "창"];
      break;
    case "마법사":
      var validWeapon = ["나무막대", "플라스틱막대", "유리막대"];
      break;
  }

  var weapon = prompt("무기를 선택하세요." + validWeapon);

  var isValidWeapon = validWeapon.includes(weapon);

  if (!isValidWeapon) {
    alert("유효한 무기가 아닙니다.");
  } else {
    alert("멧돼지를 사냥하러 출발합니다.");

    var choice = prompt("멧돼지를 만났습니다. 사냥 or 도망");
    var validChoice = ["사냥", "도망"];
    var isValidChoice = validChoice.includes(choice);

    if (!isValidChoice) {
      alert("유효한 선택이 아닙니다.");
    } else {
      if (choice == "사냥") {
        alert(weapon + "으로(로) 멧돼지를 공격하여 사냥했습니다.");
      } else {
        alert("멧돼지를 만나서 도망쳤습니다.");
      }
    }
    alert("게임이 끝났습니다. 다음에 또 봐요. " + name + "님!");
  }
}

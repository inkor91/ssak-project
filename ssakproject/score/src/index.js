var userId = "hello";
var userPwd = "world";
var dataSet = { 홍길동: 90, 홍길순: 88, 김철수: 60, 정보미: 100, 박민식: 90 };

function login() {
  var inputId = prompt("아이디를 입력하세요");
  var inputPwd = prompt("비밀번호를 입력하세요");
  return userId == inputId && userPwd == inputPwd;
}

function settlement(score) {
  if (100 >= score && score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

function program(dataSet) {
  // 회원 검증
  if (!login()) {
    return alert("로그인 정보를 확인하세요.");
  }

  // 실행 여부
  var start = confirm("성적 결산을 시작할까요?");
  if (!start) {
    return alert("프로그램을 종료합니다.");
  }

  // 결산
  for (data in dataSet) {
    var result = settlement(dataSet[data]);
    dataSet[data] = result;
  }

  return alert("결산이 완료되었습니다. \n" + JSON.stringify(dataSet));
}

program(dataSet);

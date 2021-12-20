var button = document.getElementById("rolling");

button.addEventListener("click", function () {
  rolling();
});

var turn = 0;
var play1Number, play2Numer;
var reset = false;

function rolling() {
  if (reset) {
    location.reload();
  }

  var randomNumber = Math.floor(Math.random() * 6) + 1; // 1~6 사이의 정수
  var randomImage = "images/" + randomNumber + ".png";
  var image = document.getElementsByTagName("img")[turn];
  image.setAttribute("src", randomImage);

  if (turn == 0) {
    button.innerText = "플레이어-2 굴리기";
    play1Number = randomNumber;
  } else {
    button.innerText = "다시하기";
    reset = true;
    play2Numer = randomNumber;
    result(play1Number, play2Numer);
  }

  turn++;
}

function result(num1, num2) {
  var h3Result = document.getElementById("result");
  if (num1 > num2) {
    h3Result.innerText = "플레이어-1 승리";
  } else if (num1 < num2) {
    h3Result.innerText = "플레이어-2 승리";
  } else {
    h3Result.innerText = "무승부";
  }
}

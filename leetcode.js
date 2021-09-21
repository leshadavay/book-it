//let numbers = [1, 8, 6, 2, 5, 4, 8, 3, 7];
//let numbers = [1, 1];
//let numbers = [1, 2, 1];
let numbers = [1, 2, 4, 3];
function calc(numbers) {
  let answer = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      answer = Math.max(answer, Math.min(numbers[i], numbers[j]) * (j - i));
    }
  }
  return answer;
}

function calcOptimal(numbers) {
  let answer = 0;
  if (numbers.length < 2) {
    return answer;
  }
  let size = numbers.length;
  let center = Math.floor(size / 2);
  center = center > 2 ? center - 1 : center;
  let leftPoint = center - 1;
  let rightPoint = center;

  console.log("center: ", center);
  console.log(" (", leftPoint, " | ", rightPoint + ")");

  while (leftPoint >= 0 && rightPoint < size) {
    let height = Math.min(numbers[leftPoint], numbers[rightPoint]);
    let width = rightPoint - leftPoint;
    console.log(
      "height: ",
      height,
      " width: ",
      width,
      " (",
      leftPoint,
      " | ",
      rightPoint + ")"
    );
    answer = Math.max(answer, height * width);

    if (leftPoint > 0 && numbers[leftPoint] < numbers[rightPoint]) {
      leftPoint--;
    } else {
      rightPoint++;
    }
  }
  return answer;
}

console.log("max: ", calcOptimal(numbers));

# 🖕REACT-DOCUMENT-TUTORIAL-TIC.TAC.TO🖕
> 리액트 공식문서에서 튜토리얼에 해당하는 틱택토 게임 구현  
> 전체적인 리액트 구조를 파악하는데 좋은 예시가 될 것
> 최대한 여러 종류의 Hooks을 적용시키려고 노력
> 앞으로 공부하게 될 리액트 관련 라이브러리 들을 테스트 하는데에도 유용하게 사용
> README 파일 작성 요령도 연습
##  
  
  
## [앞으로 할일] 
### - 공식문서 과제
> 1. 이동 기록 목록에서 특정 형식(행, 열)으로 각 이동의 위치를 표시
> 2. 이동 목록에서 현재 선택된 아이템을 굵게 표시
> 3. ~~사각형들을 만들 때 하드코딩 대신에 두 개의 반복문을 사용하도록 Board를 다시 작성~~
> 4. 오름차순이나 내림차순으로 이동을 정렬하도록 토글 버튼을 추가
> 5. ~~승자가 정해지면 승부의 원인이 된 세 개의 사각형을 강조~~
> 6. ~~승자가 없는 경우 무승부라는 메시지를 표시~~

### - 개인 과제
> 1. ~~리액트 공식문서에서 권장하는 함수 컴포넌트로 변환~~
> 2. contextAPI 사용하여 Game -> Board -> Square 컴포는트로 전달되어지는 props 간소화
> 3. ~~History를 배열 타입으로 관리할 경우 제대로 동작하지 않는 현상 해결~~
  


  
## [일지 작성]
### 2021.01.15  
> 리액트 공식문서 튜토리얼에 명시되어 있는 틱택토 게임 구현  
> 함수 컴포넌트로 변환  
> 하드코딩 되어있는 Square 컴포넌트 반복문으로 구현  
  
### 2021.01.16 ~ 17
> 함수 컴포넌트 변환 후 square컴포넌트로 props 전달 성공
> 생각보다 빡셈
> 함수 컴포넌트에서 state를 공유하는 부분이 너무 어색한 상황
  
### 2021.01.18
> Hooks, 코드 구조 생각 않고 기능구현 부터 하기로 결정
> 하나의 클릭 이벤트에서 state들을 셋팅하고 가져오는 부분이 매끄럽게 되지 않음

### 2021.01.19
<details>
<summary> 푸념글 </summary>
<div markdown="1">

> 망할 X O 번갈아서 나오게 하는게 왜 마음대로 안돼 setState가 비동기인가.. 물어볼 사람이 없네
```
let [currentTurn, setCurrentTurn] = useState("X");

const squareClick = (boardDataArr, x, y) => {
  (nextTurn === "X") ? setCurrentTurn("X") : setCurrentTurn("O");
  
  const copyBoardDataArr = boardDataArr.slice();
  copyBoardDataArr[x][y] = currentTurn;
  setBoardDataArr(copyBoardDataArr);
  
  setNextTurn((nextTurn === "X") ? "Y" : "X");
};
```
> 이 코드에서 squareClick 이벤트가 처음 실행될때 setCurrentTurn 적용이 안되는 현상
> setCurrentTurn을 사용하지 않고, nextTurn state 설정해주면서 바로 값을 넣어주면 정상 작동
> 하나의 이벤트에서 두개 state 설정이 안되는건가 ?...
```dotnetcli
let [currentTurn, setCurrentTurn] = useState("X");
  let [boardDataArr, setBoardDataArr] = useState(initBoard(3, 3));
  let [nextTurn, setNextTurn] = useState("O");  

  // 게임 컴포넌트가 처음 랜더링 될때 
  // 현재 Turn은 X 이고 다음 Turn은 O로 설정 하고 시작
  const squareClick = (boardDataArr, x, y) => {
  const copyBoardDataArr = boardDataArr.slice();
  copyBoardDataArr[x][y] = currentTurn;
  setBoardDataArr(copyBoardDataArr);  

  // 현재Turn에 nextTurn으로 셋팅 되어있던 차례를 적용
  setCurrentTurn(nextTurn);
  // nextTurn 변경
  setNextTurn((nextTurn === "X") ? "O" : "X");
};
```
> 그냥 로직이 잘못된거 였다.
> 주석에 설명한 순서에 맞게 setState 로직을 태워줘야 동작한다.
> 이런 이벤트성 함수를 만들때는 해당 이벤트가 해줘야하는 일을 먼저 처리하고
> 다음 플래그에 대한 작업을 해주는 순서로 해야하는게 맞는것 같다.
> 해당 이벤트가 실행되는 시점에서 setState를 하면 해당 이벤트가 종료되고 값이 적용되어 지는 느낌

</div>
</details>

> 1. Square 컴포넌트 클릭 이벤트 전달 성공
> 2. 중복 클릭 방지 로직 추가
> 3. 승자 체크 (수평, 수직, 대각선 차례로 검증) 검증 로직 추가
> 4. readme 푸념글이 많아져 접기/펼치기 양식 추가

### 2021.01.20

> 1. history 기능 추가 (리스트 형식으로 표현)
> 2. 해당 history로 이동 기능 추가


### 2021.01.26
> 1. history 관리를 배열로 할때 문제가 생겨, 문자열로 변경
> 2. history 컴포넌트 생성, 그리기 성공
> 3. 해당 history로 돌아가는 로직 추가
> 4. 문자열로 변경후 history에 추가하던 로직이 배열로 변경하고 하는 수고가 너무 커 JSON 객체를 이용하여 동작하도록 수정
> 5. 왜 그냥 배열은 깊은 복사가 되지 않고, JSON 객체 이용하여 stringfy후 parse한 배열은 깊은 복사가 되는건지 이유를 모르겠다. 너무 궁금하다

### 2021.01.27
> 1. Rules 스크립트 추가 - 게임 규칙에 관련된 로직 정리
> 2. history 변경시 해당 turn의 정보도 같이 변경 되어야한다.
> 3. history 에 아래와 같은 데이터 추가, history 변경 기능 구현
```json
{
  board: boardDataArr,
  step: stepNumber,
  turn: currentTurn,
  coordinate: curCoordinate
}
```
> 4. 승리 판별 후 히스토리 돌아가면 승리 문구가 변경되지 않는현상 발견

### 2021-01-28
```javascript
useEffect(() => {
  console.log("winnercheck Hook");
  if(winnerCheck) {
    setWinnerNotificate(<h3>{currentTurn + " 승리 !"}</h3>);
  } else {
    setWinnerNotificate(<h3>{"현재 차례 : " + currentTurn}</h3>);
  }

}, [winnerCheck]);
```
> 1. winnerCheck 에 묶여있는 useEffect가 동작을 하지 않아 생각해보니 winnerCheck변수의 역할을 제대로 파악하지 못하고 있었음.
>  (winnerCheck는 쭉 false상태이다가 승리조건에 만족하면 그제서야 true로 변경되어 게임이 끝났음을 알리는 역할임.)
> 2. history state에 winnerCheck변수를 추가해, 히스토리가 변될때 winnerCheck도 변경해 주는 방식으로 해결
>
> 여기까지 이 게임을 만들어보면서 react에 대해 느낀점은 내가 만들어 놓은 함수와 state 들을 react에서 제공하는 기능과, lifeCycle에 맞게 잘 끼워맞춰 개발을 하는 느낌이다. 기능들을 조합하다 보면 신기하게 의도하지 않은 기능들이 동작을 하기도 하고, state 값을 셋팅하는 순서가 조금만 바껴도 완전히 다른 동작을 보여준다. 여지껏 했던 개발과 너무 달라 생소하다.  
>      
> 3. 무승부 notificate 추가 -> setNotificate에서 JSX 자체를 셋팅하는 부분 너무 없어보임.
> 4. 이겻을때 대상이 되는 사격형에 강조효과 추가, 승리조건 검증하는 로직 많은부분 수정해야 했음.
> 5. 히스토리 내역에 해당 square좌표 추가

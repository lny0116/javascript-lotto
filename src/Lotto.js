const  MissionUtils  = require("@woowacourse/mission-utils");
const Coin = require('./Coin');

class Lotto {
  #numbers;

  userNumberList;

  prize = {
    "first":0,
    "second":0,
    "third":0,
    "fourth":0,
    "fifth":0,
  };

  bonus;

  constructor(numbers) {
    const coin = new Coin();
    this.setJackpotNum();
    this.validate(numbers);
    this.#numbers = numbers;
  }

  validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  setJackpotNum(){
    MissionUtils.Console.readLine("당첨 번호를 입력해 주세요.\n", (answer)=>{
        this.#numbers = answer.split(",");
        MissionUtils.Console.print(this.#numbers)
    })
}
  setBonusNumber(){
    MissionUtils.Console.readLine("보너스 번호를 입력해 주세요.\n", (answer)=>{
      this.bonus = answer;
    })
  }
  getUserNumber(){
    let randomNumbetList = [];
    
    for(let i=0; i<coin.userMoney; i++){
      this.userNumberList.push(randomNumbetList.push(MissionUtils.Console.pickUniqueNumbersInRange(1, 45, 6).sort((a, b)=>{return a-b;})));
      MissionUtils.Console.print(this.userNumberList[i] + "\n");
    }

  }
  Matching(){
    for(let i=0; i<this.userNumberList.length; i++){
      let point = this.userNumberList[i].fiter(i => this.#numbers.includes(i)).length;

      if(point === 6){
        this.prize.first++;
        point = 0;
      }

      if (point === 5) {
        if (this.userNumberList[i].includes(this.bonus)) {
          this.prize.second++;
          point = 0;
        } else {
          this.prize.third++;
          point = 0;
        }
      }

      if(point === 4){
        this.prize.fourth++;
        point = 0;
      }

      if(point === 3){
        this.prize.fifth++;
        point = 0;
      }
    }
  }
}

module.exports = Lotto;

let times=0;
let a=0;
let b=0;
let guessed=false;
let answer=0;
let n=0;
let gameactive=false;
let wins=0;
let gamepaused=false;

function checkvalue(a){
    const as = new Array(4);
    as[0] = a%10;
    a = (a-as[0])/10;
    as[1] = a%10;
    a = (a-as[1])/10;
    as[2] = a%10;
    a = (a-as[2])/10;
    as[3] = a;

    if(as[0]!=as[1]&&as[0]!=as[2]&&as[0]!=as[3]&&as[1]!=as[2]&&as[1]!=as[3]&&as[2]!=as[3]){
        return true;
    }
    else{
        return false;
    }
}
function check(num,guess){
    times++;
    a=0;
    b=0;
    const number = new Array(4);
    const guesses = new Array(4);

    number[0] = num%10;
    num = (num-number[0])/10;
    number[1] = num%10;
    num = (num-number[1])/10;
    number[2] = num%10;
    num = (num-number[2])/10;
    number[3] = num;
    
    guesses[0] = guess%10;
    guess = (guess-guesses[0])/10;
    guesses[1] = guess%10;
    guess = (guess-guesses[1])/10;
    guesses[2] = guess%10;
    guess = (guess-guesses[2])/10;
    guesses[3] = guess;

    for (let i=0;i<number.length;i++){
        for(let j=0;j<guesses.length;j++){
            if (number[i]==guesses[j]){
                b++;
                if(i==j){
                    b--;
                    a++;
                }
            }
        }
    }
    return a+"A"+b+"B";
}
function random(){
    let a = 0;
    const as = new Array(4);
    while (true){
        a=Math.floor(10000*Math.random());
        let result=a;
        as[0] = a%10;
        a = (a-as[0])/10;
        as[1] = a%10;
        a = (a-as[1])/10;
        as[2] = a%10;
        a = (a-as[2])/10;
        as[3] = a;

        if(as[0]!=as[1]&&as[0]!=as[2]&&as[0]!=as[3]&&as[1]!=as[2]&&as[1]!=as[3]&&as[2]!=as[3]){
            return result;
        }
    }
}
function reset(){
    times=0;
    n=0;
    victory.style.visibility="hidden";
    pastwins.style.visibility="hidden";
    pastguesses.style.visibility="visible";
    tries.textContent="0 Guesses";
    hint.textContent="_A_B";
    again.textContent="A Number Game";
    gamepaused=false;
    for (let i=0;i<4;i++){
        document.getElementById(`tile${i}`).textContent="";
    }
}
function guessnum(guess){
    let str = check(answer,guess);
    hint.textContent = str;
    tries.textContent = times+" Guesses";
    prependguesses(showleadzero(guess),str);
    if (str=="4A0B"){
        gamepaused=false;
        gameactive=false;
        wins++;
        victor.textContent=showleadzero(answer+"");
        victory.style.visibility="visible";
        pastguesses.style.visibility="hidden";
        pastguesss.style.visibility="hidden";
        pastwins.style.visibility="visible";
        again.textContent="Press Enter or Backspace to play again";
        prependwins();
    }
}
function game(){
    reset();
    answer = random();
    pastguess.innerHTML=`<li id="placeholder">(None yet)</li>`;
    if (enable.textContent=="Enable Past Guesses"){
        pastguesss.style.visibility="hidden";
    }
    else{
        pastguesss.style.visibility="visible";
    }
    console.log(answer);
    gameactive=true;
}
function input(e){
    if (!e.repeat){
        if (!gameactive&&(e.key=="Enter"||e.key=="Backspace")){
            game();
        }
        else if (gameactive&&gamepaused&&(e.key=="Enter"||e.key=="Backspace")){
            for (let i=0;i<4;i++){
                document.getElementById(`tile${i}`).textContent="";
            }
            gamepaused=false;
        }
        else if (e.key>="0"&&e.key<="9"&&n<4&&!checkinput(e.key)){
            document.getElementById(`tile${n}`).textContent=e.key;
            n++;
        }
        else if (e.key=="Backspace"&&n>0){
            document.getElementById(`tile${n-1}`).textContent="";
            n--;
        }
        else if (e.key=="Enter"&&n==4){
            let guess="";
            for (let i=0;i<4;i++){
                guess+=document.getElementById(`tile${i}`).textContent;
            }
            n=0;
            guessnum(parseInt(guess));
            gamepaused=true;
        }
    }
}
function checkinput(digit){
    for (let i=0;i<4;i++){
        if (document.getElementById(`tile${i}`).textContent==digit){
            return true;
        }
    }
    return false;
}
function prependguesses(guess,str){
    if (times==1){
        const noneyet = document.getElementById("placeholder");
        noneyet.remove();
    }
    let a=str.substring(0,1);
    let b=str.substring(2,3);
    const li = document.createElement("li");
    li.innerHTML = `${times}. <span class="red">${guess}</span>: ${a}<span class="green">A</span>${b}<span class="orange">B</span>`;
    pastguess.prepend(li);
    if(pastguess.scrollHeight>pastguess.clientHeight){
        setborder(pastguess);
    }
}
function prependwins(){
    win.innerHTML=`Past wins: <span class="light-blue">${wins}</span>`;
    const li = document.createElement("li");
    li.id = `${wins}w`;
    li.innerHTML = `<span class="light-blue">${wins}.</span> ${showleadzero(answer+"")}: <span class="red">${times}</span> Guesses`;
    if (wins>1){
        const previous = document.getElementById(`${wins-1}w`);
        previous.innerHTML = `<span class="dark-blue">`+previous.innerHTML.substring(25);
    }
    winlist.prepend(li);
    if(winlist.scrollHeight>winlist.clientHeight){
        setborder(winlist);
    }
}
function enablepast(e){
    if (enable.textContent=="Enable Past Guesses"){
        pastguesss.style.visibility="visible";
        enable.textContent="Disable Past Guesses";
    }
    else{
        pastguesss.style.visibility="hidden";
        enable.textContent="Enable Past Guesses";
    }
    e.target.blur();
}
function showleadzero(guess){
    if (guess<1000){
        return "0"+guess;
    }
    else{
        return guess+"";
    }
}
function showgamerule(e){
    if (gamerule.style.visibility=="visible"){
        gamerule.style.visibility="hidden";
    }
    else{
        gamerule.style.visibility="visible";
    }
    e.target.blur();
}
function setheight(list){
    list.style.height = "50vh";
}
function setborder(list){
    list.style.borderBottom = "4px solid rgb(128,128,128)";
}
const hint=document.getElementById("hint");
const victory=document.getElementById("victory");
const again=document.getElementById("again");
const tries=document.getElementById("tries");
const gamerule = document.getElementById("gamerule");
const hidegamerule = document.getElementById("hidegamerule");
hidegamerule.addEventListener("click",showgamerule);
const pastguesses = document.getElementById("pastguesses");
const pastguesss = document.getElementById("pastguesss");
const pastguess = document.getElementById("pastguess");
const pastwins = document.getElementById("pastwins");
const enable = document.getElementById("enable");
const win = document.getElementById("wins");
const winlist = document.getElementById("winlist");
const victor = document.getElementById("victor");
const ul = document.querySelectorAll("ul");
ul.forEach(setheight);
enable.addEventListener("click",enablepast);
document.addEventListener("keydown",input);

game();
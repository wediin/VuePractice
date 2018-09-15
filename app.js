new Vue({
    el: "#app",
    data: {
        myHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    computed: {

    },
    methods:{
        startGame: function(){
            this.gameIsRunning = true;
            this.myHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function(){
            dmg = this.calcDamage(5, 12);
            this.monsterHealth -= dmg;
            this.turns.unshift({
                isPlayer: true,
                text: 'Harry Potter hits monster for ' + dmg
            })
            if (this.checkWin()){
                return;
            }
            this.monsterAttacks();
        },
        specialAttack: function(){
            dmg = this.calcDamage(20, 40);
            this.monsterHealth -= dmg;
            this.turns.unshift({
                isPlayer: true,
                text: 'Harry Potter hits hard monster for ' + dmg
            })
            if (this.checkWin()){
                return;
            }
            this.monsterAttacks();
        },
        monsterAttacks: function(){
            dmg = this.calcDamage(10, 20)
            this.myHealth -= dmg;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits player for ' + dmg
            })
        },
        heal: function(){
            this.myHealth = Math.min(100, this.myHealth + 30);
            this.turns.unshift({
                isPlayer: true,
                text: 'Harry Potter heals for 30'
            })
            this.monsterAttacks();
        },
        giveUp: function(){
            this.gameIsRunning = false;
        },
        calcDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        checkWin: function(){
            if (this.monsterHealth <= 0){
                if (confirm('You won, new game?')){
                    this.startGame()
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.myHealth <= 0){
                if (confirm('You lose! new game?')){
                    this.startGame()
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }

});
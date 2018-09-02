function Character() {
    this.health = 100

    this.reset = function() {
        this.health = 100
    }

    this.doAction = function(val) {
        this.health += val;
        if(this.health <= 0) {
            this.health = 0
        }
        else if(this.health > 100) {
            this.health = 100
        }
    }
    
    this.getHealth = function() {
        return this.health
    }

    this.isAlive = function() {
        return this.health > 0
    }
}
new Vue({
    el: '#app',
    data: {
        healthy: 100,
        monster: new Character(),
        player: new Character(),
        isGameRunning: false,
        attackRange: 10,
        healRange: 10,
        playerAction: 0,
        monsterAction: 0,
        isAttack: 1,
        isSpecialAttack: 2,
        isHeal: 3
    },
    computed: {
        playerHealth() {
            return this.player.health
        },
        monsterHealth() {
            return this.monster.health
        },
    },
    methods: {
        startNewGame: function() {
            this.isGameRunning = true
            this.player.reset()
            this.monster.reset()
        },
        doAction: function(action) {
            if(!this.isGameRunning) return

            this.playerAction = this.doCharacterAction(this.player, this.monster, action)

            mAction = this.getRandomInt(3)
            this.monsterAction = this.doCharacterAction(this.monster, this.player,  mAction)

            this.checkState(this.player)
            this.checkState(this.monster)
        },
        doCharacterAction: function(self, enemy, action) {
            if(action == this.isAttack) {
                return this.doAttack(enemy, false)
            }
            else if(action == this.isSpecialAttack) {
                return this.doAttack(enemy, true)
            }
            else {
                return this.doHeal(self)
            }
        },
        doAttack: function(Character, isSpecial) {
            attackOnCharacter = isSpecial ? this.getRandomInt(this.attackRange) * 2 : this.getRandomInt(this.attackRange)
            attackOnCharacter *= -1
            Character.doAction(attackOnCharacter)

            return attackOnCharacter
        },
        doHeal: function(Character) {
            healOnCharacter = this.getRandomInt(this.healRange)
            Character.doAction(healOnCharacter)

            return healOnCharacter
        },
        getRandomInt: function(max) {
            return Math.floor(Math.random() * Math.floor(max)) + 1;
        },
        checkState: function(Character) {
            if(!this.isGameRunning) return

            if(!Character.isAlive()) {
                this.isGameRunning = false
            }
        }
    }
});
class Game extends Phaser.State {

    constructor() {
        super()
        this.offsetAmount = 5
        this.gravity = 0.0125
        this.playerVelocity = { y: 0 }
    }

    preload() {
        this.game.load.image('platform', 'assets/platform.png')
        this.game.load.spritesheet('player', 'assets/dude.png', 32, 48)
    }

    create() {
        console.log("Game!")
        this.createBackground()
        this.createPlayer()
        this.createPlatforms()
        this.createGameTimer()
        this.addInputHandlers()
    }

    createBackground() {
        this.background = this.game.add.image(this.game.width,this.game.height,'background')
        this.background.angle = 180
    }

    createPlayer() {
        this.player = this.game.add.image(200, 200, 'player')        
    }

    createPlatform() {
        const platform = this.game.add.image(Math.random() * 700, 600, 'platform')
        this.platforms.push(platform)
    }

    createPlatforms() {
        this.platforms = []        
    }

    createGameTimer() {
        this.timer = this.game.time.create()
        this.timer.loop(1000, this.createPlatform, this)
        this.timer.start()
    }

    addInputHandlers() {
        this.keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
        this.keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    }

    update() {
        if (this.keyLeft.isDown) {
            this.player.x -= this.offsetAmount
        } else if (this.keyRight.isDown) {
            this.player.x += this.offsetAmount            
        }

        this.movePlayer()
        this.movePlatforms()
        this.checkAndFixSideBounds()
        this.checkPlatformsCollision()
    }

    movePlayer() {
        this.playerVelocity.y += this.gravity
        this.player.y += this.playerVelocity.y
    }

    movePlatforms() {
        this.platforms.forEach(platform => platform.y -= this.offsetAmount)
        this.platforms = this.platforms.filter(platform => platform.y + platform.height > 0)
    }

    checkAndFixSideBounds() {
        if (this.player.x < 0) {
            this.player.x = 0
        } else if (this.player.x + this.player.width > this.game.width) {
            this.player.x = this.game.width - this.player.width
        }
    }

    checkPlatformsCollision() {
        this.platforms.forEach((platform) => {
            if (platform.getBounds().contains(this.player.x, this.player.y + this.player.height)) {
                this.playerVelocity.y = 0
                this.player.y = platform.y - this.player.height
            }
        })
    }

    _startGame () {
        this.game.state.start('game')
    }
}

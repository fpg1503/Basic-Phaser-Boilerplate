class Menu extends Phaser.State {

    constructor() {
	    super()
    }
    
    preload() {
        this.game.load.image('background', 'assets/background.png')
    }

    create() {
        console.log("Menu!")
        this.background = this.game.add.image(0,0,'background')
        this.input.onDown.add(this._startGame, this)

        const style = {
            font: 'bold 40px Arial',
            fill: '#f00',
            boundsAlignH: 'center' ,
            boundsAlignV: 'middle'
        }
        this.text = this.game.add.text(200, 30, 'Doodle Fall Revolution 2017', style)

        const bounce = this.game.add.tween(this.text)
        bounce.to({
            y: 500
        }, 2000, Phaser.Easing.Bounce.In)
        bounce.start()
    }

    update() {
        //TODO!
    }

    _startGame () {
        this.game.state.start('game')
    }
}

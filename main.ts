namespace SpriteKind {
    export const misc = SpriteKind.create()
    export const NPC = SpriteKind.create()
    export const potForSoup = SpriteKind.create()
    export const ingredientForSoup = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile6`, function (sprite, location) {
    if (initStart == 1) {
        if (controller.A.isPressed() == (exposedFood == 1 && holdingTrue == 1)) {
            onionOne.destroy()
            potForSoup = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                c c . . . . . . . . . . . . c c 
                . c c b b b b b b b b b b c c . 
                . . . b b b b b b b b b b . . . 
                . . . b b b b b b b b b b . . . 
                . . . b b b b b b b b b b . . . 
                . . . c b b b b b b b b b . . . 
                . . . c c b b b b b b b b . . . 
                . . . c c b b b b b b b b . . . 
                . . . c c c b b b b b b b . . . 
                . . . c c c b b b b b b b . . . 
                . . . c c c c b b b b b b . . . 
                . . . c c c c c c c b b b . . . 
                . . . c c c c c c c c c c . . . 
                . . . . c c c c c c c c . . . . 
                `, SpriteKind.potForSoup)
        }
    }
})
controller.combos.attachCombo("a + b", function () {
    if (initStart == 0) {
        mainFunc()
        initStart = 1
        startButton.destroy()
    }
})
function mainFunc () {
    rawIngredients = ["onion", "mushroom", "tomato"]
    levelStart = 1
    tiles.setCurrentTilemap(tilemap`level1`)
    leCook = sprites.create(img`
        . . . . 1 1 1 1 1 1 1 1 . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . . 1 1 1 1 1 1 1 1 . . . . 
        . . . 1 1 1 1 1 1 1 1 1 1 . . . 
        . . . 1 1 1 1 1 1 1 1 1 1 . . . 
        . . . 1 1 1 1 1 1 1 1 1 1 . . . 
        . . . 1 1 1 1 1 1 1 1 1 1 . . . 
        . . . . 1 1 1 1 1 1 1 1 . . . . 
        . . . . . c c c c c c . . . . . 
        . . . . . . c c c c . . . . . . 
        . . . . f f f f f f f f . . . . 
        `, SpriteKind.Player)
    game.showLongText("Make Good Food", DialogLayout.Bottom)
    info.startCountdown(300)
    tiles.placeOnTile(leCook, tiles.getTileLocation(10, 8))
    foodThingy()
}
function startScreen () {
    levelStart = 0
    initStart = 0
    startButton = sprites.create(img`
        ..............................................................
        ..........................cccccccccccccccccccccccccccccccccc..
        ..fff....................ccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcc.
        ..f..f...................cbbb111bb11111bbb111bbb111bb11111bbc.
        ..f..f...................cbb11111b11111bb11111bb1111b11111bbc.
        ..f..f...................cbb1bbbbbbb1bbbb1bbb1bb1bb1bbb1bbbbc.
        ..fff....................cbb1bbbbbbb1bbbb1bbb1bb1bb1bbb1bbbbc.
        ..f......................cbb111bbbbb1bbb11bbb11b111bbbb1bbbbc.
        ..f..f.f.ff...fff..fff...cbbbb111bbb1bbb1111111b111bbbb1bbbbc.
        ..f..ff.f..f.f....f......cbbbbbb1bbb1bbb1111111b1bb1bbb1bbbbc.
        ..f..f..ffff.f....f......cbbbbbb1bbb1bbb1bbbbb1b1bb1bbb1bbbbc.
        ..f..f..f.....ff...ff....cbb11111bbb1bbb1bbbbb1b1bb1bbb1bbbbc.
        ..f..f..f..f....f....f...cbbb111bbbb1bbb1bbbbb1b1bb1bbb1bbbbc.
        ..f..f...ff..fff..fff....ccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcc.
        ..........................cccccccccccccccccccccccccccccccccc..
        ..............................................................
        `, SpriteKind.misc)
    scene.setBackgroundColor(4)
    startButton.setPosition(scene.screenWidth() / 2, scene.screenHeight() - 20)
}
function foodThingy () {
    if (holdingTrue == 0 && (controller.A.isPressed() && leCook.tileKindAt(TileDirection.Top, assets.tile`myTile`))) {
        onionOne = sprites.create(assets.image`Onion`, SpriteKind.ingredientForSoup)
        tiles.placeOnTile(onionOne, tiles.getTileLocation(12, 10))
        onionOne.follow(leCook)
        holdingTrue = 1
        exposedFood = 1
    }
}
let leCook: Sprite = null
let levelStart = 0
let rawIngredients: string[] = []
let startButton: Sprite = null
let potForSoup: Sprite = null
let onionOne: Sprite = null
let holdingTrue = 0
let exposedFood = 0
let initStart = 0
startScreen()
game.onUpdate(function () {
    scene.cameraFollowSprite(leCook)
    controller.moveSprite(leCook)
    if (levelStart == 1) {
        foodThingy()
    }
})

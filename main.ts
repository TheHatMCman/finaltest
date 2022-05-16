namespace SpriteKind {
    export const misc = SpriteKind.create()
    export const NPC = SpriteKind.create()
    export const potForSoup = SpriteKind.create()
}
controller.combos.attachCombo("a + b", function () {
    if (initStart == 0) {
        mainFunc()
        initStart = 1
        startButton.destroy()
    }
})
function mainFunc () {
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
    tiles.placeOnTile(leCook, tiles.getTileLocation(10, 8))
    foodThingy()
}
function startScreen () {
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
    if (controller.A.isPressed() && leCook.tileKindAt(TileDirection.Top, assets.tile`myTile`)) {
        onionOne = sprites.create(img`
            . . . . d . . . . . . d . . . . 
            . . . . d d . . . . d d . . . . 
            . . . . . . d d d d . . . . . . 
            . . . . . d d d d d d . . . . . 
            . . . . d d b d d b d d . . . . 
            . . . d d d b d d b d d d . . . 
            . . . d d b d d d d b d d . . . 
            . . d d d b d d d d b d d d . . 
            . . d d d b d d d d b d d d . . 
            . . d d b d d d d d d b d d . . 
            . . d d b d d b b d d b d d . . 
            . . d d b d d b b d d b d d . . 
            . . d d b d d b b d d b d d . . 
            . . d d b d d b b d d b d d . . 
            . . d d b d d b b d d b d d . . 
            . . . d b d d d d d d b d . . . 
            `, SpriteKind.Food)
        onionOne.follow(leCook)
    }
}
let onionOne: Sprite = null
let leCook: Sprite = null
let startButton: Sprite = null
let initStart = 0
startScreen()
game.onUpdate(function () {
    scene.cameraFollowSprite(leCook)
    controller.moveSprite(leCook)
})

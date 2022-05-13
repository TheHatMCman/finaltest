namespace SpriteKind {
    export const misc = SpriteKind.create()
}
controller.combos.attachCombo("a + b", function () {
    if (initStart == 0) {
        mainFunc()
        initStart = 1
        startButton.destroy()
    }
})
function mainFunc () {
    scene.setBackgroundColor(0)
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
let startButton: Sprite = null
let initStart = 0
startScreen()

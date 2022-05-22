namespace SpriteKind {
    export const misc = SpriteKind.create()
    export const NPC = SpriteKind.create()
    export const potForSoup = SpriteKind.create()
    export const ingredientForSoup = SpriteKind.create()
}
namespace StatusBarKind {
    export const completion = StatusBarKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile6`, function (sprite, location) {
    if (controller.A.isPressed() == (exposedFood == 1 && holdingTrue == 1)) {
        foodOne.destroy()
        cookingTrue = 1
        holdingTrue = 0
        exposedFood = 0
    }
})
controller.combos.attachCombo("a + b", function () {
    if (initStart == 0) {
        mainFunc()
        initStart = 1
        startButton.destroy()
    }
})
function customerOrders (potentialIngredients: any[]) {
    let list: number[] = []
    rngMachine = randint(0, 1000)
    while (list.length <= 4) {
        if (rngMachine < 470 && rngMachine < 475) {
            tempOrder = potentialIngredients._pickRandom()
            listOfOrders.push(tempOrder)
            newOrderCreate = 1
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.potForSoup, function (sprite, otherSprite) {
    if (grabbableTrue == 1) {
        holdingTrue = 1
        otherSprite.follow(sprite, 100)
    }
})
function mainFunc () {
    grabbableTrue = 0
    potFinish = 0
    numOfOnionInPot = 0
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
    info.startCountdown(120)
    tiles.placeOnTile(leCook, tiles.getTileLocation(11, 8))
    scene.cameraFollowSprite(leCook)
    game.showLongText("Prepare to Make Good Food", DialogLayout.Bottom)
    tempGeneral = rawIngredients._pickRandom()
    game.showLongText("Let's start with the basics! Start by grabbing an " + tempGeneral, DialogLayout.Bottom)
    foodThingy()
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
    tiles.placeOnTile(potForSoup, tiles.getTileLocation(7, 5))
    completeBar = statusbars.create(20, 4, StatusBarKind.completion)
    completeBar.setColor(2, 15)
    completeBar.value = 0
    completeBar.max = 1000
    completeBar.positionDirection(CollisionDirection.Top)
    completeBar.attachToSprite(potForSoup)
}
function startScreen () {
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
    leCook.destroy()
    levelStart = 0
    initStart = 0
    startButton = sprites.create(img`
        ...............................cccccc......................cccccc.......
        .............................ccbbbbbbcc..................ccbbbbbbcc.....
        ..fff.......................cbbb1111bbbc................cbbbbbbbbbbc....
        ..f..f.....................cbbb111111bbbc......cc......cbbb11111bbbbc...
        ..f..f.....................cbbb11bb11bbbc.....c11c.....cbbb11bb11bbbc...
        ..f..f....................cbbb111bb111bbbc....c11c....cbbbb11bb11bbbbc..
        ..fff.....................cbbb11bbbb11bbbc..ccc11ccc..cbbbb11bb11bbbbc..
        ..f.......................cbbb11bbbb11bbbc.c11111111c.cbbbb11111bbbbbc..
        ..f..f.f.ff...fff..fff....cbbb11111111bbbc.c11111111c.cbbbb11111bbbbbc..
        ..f..ff.f..f.f....f.......cbbb11111111bbbc..ccc11ccc..cbbbb11bb11bbbbc..
        ..f..f..ffff.f....f.......cbbb11bbbb11bbbc....c11c....cbbbb11bb11bbbbc..
        ..f..f..f.....ff...ff......cbb11bbbb11bbc.....c11c.....cbbb11bb11bbbc...
        ..f..f..f..f....f....f.....cbb11bbbb11bbc......cc......cbbb11111bbbbc...
        ..f..f...ff..fff..fff.......cbbbbbbbbbbc................cbbbbbbbbbbc....
        .............................ccbbbbbbcc..................ccbbbbbbcc.....
        ...............................cccccc......................cccccc.......
        `, SpriteKind.misc)
    logoSpeedCooked = sprites.create(img`
        ....ffffffffff.ffffffffffffffff.......ffff..ff.....ff..ffff.ffffffffffffffffff..
        ..fff77ff77777ff77777f7777f7777f.....f6666ff66f...f66f.f66f.f66f6666f666666666f.
        .fff7ff1f7fff77f77777f7777f7777f....f66666f6666f.f6666ff66ff666f6666f6666666666f
        ff777ff1f7f11f7f77ffff77fff7ff77f...f666f6f6666f.f6666ff66ff66ff66fff666fffff66f
        f7777f11f7f11f7f77f11f77f1f7f1f7f...f66f1f666666f666666f66f666ff66f1f666f111f66f
        f7777f11f7f11f7f77f11f77f1f7f1f7f..f66f11f66ff66f66ff66f66666f1f66f1f666f1fff66f
        f7777ff1f7f11f7f77f11f77f1f7f1f7f..f66f11f66ff66f66ff66f66666f1f66f1f666fff6666f
        .f7777f1f7fff77f77ffff77fff7f1f7ffff66f11f66ff66f66ff66f6666f11f66fff66666666ff.
        ..f7777ff77777ff77777f7777f7f1f7fbbf66f11f66ff66f66ff66f6666f11f6666f6666666f...
        ...f7777f7ffff.f77777f7777f7f1f7ffff66f11f66ff66f66ff66f66666f1f66fff66666666f..
        ....f777f7f....f77ffff77fff7f1f7f..f666f1f66ff66f66ff66f66666f1f66f1f666ff666f..
        ....f777f7f....f77f11f77f1f7f1f7f..f6666ff666666f666666f66f666ff66f1f666f.f666f.
        ...f777ff7f....f77f11f77f1f7ff77f...f66666f6666f.f6666ff66ff66ff66fff666f.f666f.
        fff7777ff7f....f77ffff77fff7777f....f66666f6666f.f6666ff66ff666f6666f666f..f666f
        f77777f.f7f....f77777f7777f7777f.....f666fff66f...f66f.f66f.f66f6666f666f..f666f
        ffffff..fff....ffffffffffffffff.......fff...ff.....ff..ffff.fffffffffffff...ffff
        `, SpriteKind.misc)
    scene.setBackgroundImage(img`
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        .......................................1........................................................................................................................
        ............................................................................................................................................................1...
        ...............................................................................................................................111....................111.......
        .................111...........................................................................................................111....................111.......
        .................111...........................................................................................................111....................111.......
        .................111..............................................................................1.............................................................
        .......1........................................................................................................................................................
        ................................................................................................................................................................
        .......................................................111...................................bbbbbbbb...........................................................
        .......................................................111..................................bbbbbbbbbbb.........................................................
        .......................................................111.................................bbbbbcccbbbbbb.......................................................
        ............................................................................1.............bbbbcc...cbbbbb..............................1........................
        ..........................................................................................bbbb......ccbbbbb.....................................................
        ..........................................................................................bbbb........bbbbb.....................................................
        ..........................................................................................bbbb........cbbbbbbbbbbbbbbbbb........................................
        ................................1.........................................................cbbbbb........bbbbbbbbbbbbbbbbbbbbbbb.................................
        ..........................................................................................ccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.............................
        .......................................................1...................................cccbcbcbbbbbbbbbbbbfcccccccbbbbbbbbbbbbbbb...........................
        .............................................................................................cccccccccbbbddbbbbfccfccccccccccbbbbbbbbbb.........................
        ......................................................................................................bbdddddbbbffccccccccccccccbbbbbbbbb.......................
        ......................................................................................................bbdddbddbbbbffcfccccccccccccbbbbbbbb......................
        ............111......................................................................................bbddbbbbbbbbbbbfffcfcfcccccccccbbbbbbb.....................
        ............111......................................................................................bbbbbbbbbbbbbbbbbbfffffccfcccccccbbbbbb....................
        ............111.....................................................................................bbbbbbbbbbbbbbbbbbbbbbbfffffcfcffcfbbbbbb...................
        ....................................................................................................bbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffbbbbb..bbbbbb...........
        ....................................................................................................bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbb........
        ............................................................................111.....................bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbcbbbbbbb.......
        ............................................................................111....................cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbccccccbbbb......
        ........................................111.................................111....................cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbb.....ccbbb......
        ........................................111........................................................cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbb.....ccbbb.....
        ........................................111........................................................cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbb.....ccbb.....
        ...................................................................................................4bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccbbbb.....cbb.....
        ..........................................................................................1........4bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcc..ccbbbbbbbbbbb.....
        ....111...........................................................................................4cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccc...cccbbbbbbbbc.....
        ....111...........................................................................................44bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccc....cccbbbbcccc.....
        ....111............1.....................................1........................................44c4bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccc......cccccc........
        ...................................................................................................4c4bbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccc.....................
        ...................................................................................................44cbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccc.....................
        ................................4455...............................................................444cccbbbbbbbbbbbbbbbbbbbccccccccccccccc.....................
        ................................4455...............................................................4444c44ccbbbbbbbbbbbbccccccccccccccccccc.....................
        ................................4455...............................................................4454444cccccccccccccccccccccccccccccccc......................
        .................................44555...............................................................544c4c44ccccccccccccccccccccccccccccc......................
        .................................445555..............................................................5444cc4cccccccccccccccccccccccccccccc......................
        .................................4455555.............................................................5554444c44c44ccccccccccccccccccc4ccc.......................
        .................................445555555...............................1....................1.......55544c444c44cccccccccccccccccc44cc........................
        .................................4455555555............................................................2254444444cc44ccccccccccccccc44cc...........111..........
        ................................4445555555555............................................................22444444cc44c44cc4cc44c4c44cc4............111..........
        ................................44455555555555555.555555555................................................2244444444c44c44c444444444c.............111..........
        ................................44455555555555f555555555555555................fffffffffffffffffffffff........2444444444444444c444444............................
        ...............................44444555545555ff5555555555555555..........fffff77777777777777777777777fffff....22244444444c555554444.............................
        ...............................4444455554455ff554555554555554555......fff777777777777777777777777777777777fff....222245555555544................................
        ..............................44444e45555455f555fffff55455555455...fff777777777777777777777777777777777777777fff.....25555555...................................
        .............................444444e4555554555fffffff55555555455fff777777777777777777777777777777777777777777777fff.............................................
        ......1.....................444e4444e45555445fffffff5555445555ff777777777777777777777777777777777777777777777777777ff...........................................
        ............................444e4444e45555554ffff55544555455ff7777777777777777777777777777777777777777777777777777777ff.........................................
        ...........................44444e4444e4555555ff55555545555ff77777777777777777777777777777777777777777777777777777777777ff.......................................
        ..........................4444444e444e445555554455ccc545ff777777777777777777777777777777777777777777777777777777777777777ff.................................1...
        .........................44e4ff44e4444e445555554ccccccff7777777777777777777777777777777777777777777777777777777777777777767ff...................................
        ........111.............444fff4444e4444e445555cccccccf77777777777777777777777777777777777777777777777777777777777777777777899f..................................
        ........111.............444fe44fffff4444ee445ccccccff7777777777777777777777777777777777777777777777777777777777767777777779999ff................................
        ........111............444444efffffff4444ee44cccccf77777777777777777777777777777777777777777777777777777767777777777677677998989f...............................
        ......................44e4444fffffff4ee4444ecccccf7777777777777777777777777777777777777777777777777777777777777777777777779999989f..............................
        ......................e4e4444fffff44444ee444cccff777777777777777777777777777777777777777777777777777777777777776777777776799889999ff............................
        ......................e4e4444ffff44444444eccccf9999997777777777777777777777777777777777777777777777777777776777777776777779899989989f...........................
        .....................e44e4444fffe4444444cccccf999999999777777777777777777777777777777777777777767776777777777777776777767999988999998f........1..........111....
        .....................ee44e4444444e4444ccccccf99999999999977777777777777777777777777777777777777777777777777777767777767779998999988888f..................111....
        .....................e4444e4444444eccccccccf9989999999999997777777777777777777777777777767777777777777777677767767767767789999988888888f.................111....
        .....................ee444e4444444ccccccccf999999999999999999977777777777777776777767777799998999977777777767777677677777999888888898888f.......................
        .....................e4e444e44444ccccccccf99999999999999999899999777677777677777777779999999999998887776667776767777777798888888888888888f......................
        .....................eee4444e4444cccccccf9999999998999999999999999999777777777669999999999989998998999776767767776676666888888998898888888f.....................
        .....................ee4e4444e444ccccccf799999999999999999999999999899999999999998999998998889999899998977767667666666688889988888888889888f....................
        ......................ee4e4444ee4cccccf77999999999999999999989999999999999998999999999899889999999898999986666666666666888998888888888888888f..............1....
        ......................eee4e444444ccccf6779999999989999999999999998999999988899999999898999999999899989889888666666676688899888888888888888888f..................
        ......................eeee4eee444ccccf7769989999999999999999989988999999999998898999999999998999998988888888888666666888888888888888888888888f..................
        .....111...............eeee44eeeeeccf777799999889999999889999989999989998899989999999898998999889888898889988888888888888888888988888888888888f.................
        .....111...............eeeee444eeeef77677999999999989999999999999999998889999999899989999889888888888888888888888888888888888888888888888888888f................
        .....111...............eeeeee44444f7767779989999988889999989999899999999998889999998989888888888998888888888888888888888888888888888888888888888f.......111.....
        ........................eeeeeeeeeef6677698999999899999999999899998899889998999988988888888989888988888888888888888888888888888888888888888888888f.......111.....
        .........................eeeeeeeef777777999998999998888998888999899998998999988888988889988888888888888888888888888888888888888888888888888888888f......111.....
        ...........1...............eeeeef76776768889998998889989999899988888888888988898888888888888888888888888888888888888888898888888888888888888888888f.............
        ............................eeeef77667779988999988888888888988888888898998888888888888888888888888888898888888888888888888888888888888888888888888f.............
        .............................eef6677676688888888888888888888889888888888888888888888888888888888888888888888888888888888888888888888888888888888886f............
        ..............................ef6666666888888888888888888888888888888888888888888888888888898888888888888888888888888888888888888888888888888888886f............
        ....1.........................f766666768898888888898888888888888888888888888888988888888888888888888888888888888888888888888888888888888888888888866f...........
        ..............................f667666688888888888888888888888888888888988888888888888888888888888888888888888888888888888888888888888888888888888866f...........
        .............................f6666666688888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888ccccc66f..........
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        `)
    startButton.setPosition(scene.screenWidth() / 2, scene.screenHeight() - 20)
    logoSpeedCooked.setPosition(scene.screenWidth() / 3.5, scene.screenHeight() / 8)
    cookingTrue = 0
}
function theActualCookin () {
    if (cookingTrue == 1 && exposedFood == 0) {
    	
    }
    if (cookingTrue == 0 && potFinish == 1) {
        grabbableTrue = 1
    }
}
function foodThingy () {
    if (holdingTrue == 0 && (controller.A.isPressed() && leCook.tileKindAt(TileDirection.Top, assets.tile`myTile`))) {
        if (tempGeneral == rawIngredients[0]) {
            foodOne = sprites.create(assets.image`Onion`, SpriteKind.ingredientForSoup)
        } else if (tempGeneral == rawIngredients[1]) {
            foodOne = sprites.create(assets.image`mushRoom`, SpriteKind.ingredientForSoup)
        } else {
        	
        }
        tiles.placeOnTile(foodOne, tiles.getTileLocation(12, 10))
        foodOne.follow(leCook)
        holdingTrue = 1
        exposedFood = 1
        if (tiles.tileAtLocationIsWall(tiles.getTileLocation(10, 7))) {
            tiles.setWallAt(tiles.getTileLocation(10, 6), false)
            tiles.setTileAt(tiles.getTileLocation(10, 6), assets.tile`table`)
            tiles.setWallAt(tiles.getTileLocation(10, 7), false)
            tiles.setTileAt(tiles.getTileLocation(10, 7), assets.tile`tileFloor`)
            tiles.setWallAt(tiles.getTileLocation(10, 8), false)
            tiles.setTileAt(tiles.getTileLocation(10, 8), assets.tile`tileFloor`)
            game.showLongText("Now put the Onion in the pot above", DialogLayout.Bottom)
        }
    }
}
scene.onOverlapTile(SpriteKind.potForSoup, assets.tile`checkOut`, function (sprite, location) {
    if (tutorText[1] == 0) {
        game.showLongText("Press \"B\" to deliver the soup", DialogLayout.Bottom)
        tutorText[1] = 1
    }
    if (controller.B.isPressed()) {
        if (completeBar.value == 1000) {
            info.changeScoreBy(100)
            completeBar.value = 0
            potPosition(0)
        }
    }
})
function potPosition (num: number) {
    if (num == 0) {
        tiles.placeOnTile(potForSoup, tiles.getTileLocation(7, 5))
        potForSoup.follow(leCook, 0)
    } else if (num == 1) {
        tiles.placeOnTile(potForSoup, tiles.getTileLocation(7, 6))
    }
}
let logoSpeedCooked: Sprite = null
let completeBar: StatusBarSprite = null
let potForSoup: Sprite = null
let tempGeneral = ""
let leCook: Sprite = null
let levelStart = 0
let rawIngredients: string[] = []
let numOfOnionInPot = 0
let potFinish = 0
let grabbableTrue = 0
let newOrderCreate = 0
let tempOrder: any = null
let rngMachine = 0
let startButton: Sprite = null
let initStart = 0
let cookingTrue = 0
let foodOne: Sprite = null
let holdingTrue = 0
let exposedFood = 0
let listOfOrders: any[] = []
let tutorText: number[] = []
tutorText = [0, 0]
listOfOrders = []
startScreen()
game.onUpdate(function () {
    if (initStart == 1) {
        scene.cameraFollowSprite(leCook)
        controller.moveSprite(leCook)
        theActualCookin()
        foodThingy()
        if (potFinish == 1 && completeBar.value == 1000) {
            potFinish = 0
            potPosition(1)
            if (tutorText[0] == 0) {
                game.showLongText("The Soup is Ready! Grab it and deliver it!", DialogLayout.Bottom)
                tutorText[0] = 1
            }
        }
        if (grabbableTrue == 1 && holdingTrue == 1 && (controller.B.isPressed() && (potForSoup.tileKindAt(TileDirection.Bottom, assets.tile`tileFloor`) || potForSoup.tileKindAt(TileDirection.Top, assets.tile`tileFloor`)))) {
            if (completeBar.value == 1000) {
                game.splash("You spilled the soup")
                info.startCountdown(0)
            } else {
                holdingTrue = 0
                potFinish = 0
                potForSoup.follow(leCook, 0)
                potPosition(0)
            }
        }
    }
})
game.onUpdateInterval(10, function () {
    if (initStart == 2) {
        if (rngMachine < 465 && rngMachine < 475) {
            leCook.sayText("New Order for " + tempOrder + " soup.", 100, true)
            newOrderCreate = 0
        }
    }
})
game.onUpdateInterval(200, function () {
    if (cookingTrue == 1 && exposedFood == 0) {
        completeBar.value += 100
        console.log(tempOrder)
        if (completeBar.value == 1000) {
            potFinish = 1
            cookingTrue = 0
        }
    }
})

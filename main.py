@namespace
class SpriteKind:
    misc = SpriteKind.create()
    NPC = SpriteKind.create()
    potForSoup = SpriteKind.create()
    ingredientForSoup = SpriteKind.create()

def on_overlap_tile(sprite, location):
    global potForSoup2
    if initStart == 1:
        if controller.A.is_pressed() == (exposedFood == 1 and holdingTrue == 1):
            onionOne.destroy()
            potForSoup2 = sprites.create(img("""
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
                """),
                SpriteKind.potForSoup)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile6
    """),
    on_overlap_tile)

def on_combos_attach_combo():
    global initStart
    if initStart == 0:
        mainFunc()
        initStart = 1
        startButton.destroy()
controller.combos.attach_combo("a + b", on_combos_attach_combo)

def mainFunc():
    global rawIngredients, levelStart, leCook
    rawIngredients = ["onion", "mushroom", "tomato"]
    levelStart = 1
    tiles.set_current_tilemap(tilemap("""
        level1
    """))
    leCook = sprites.create(img("""
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
        """),
        SpriteKind.player)
    game.show_long_text("Make Good Food", DialogLayout.BOTTOM)
    info.start_countdown(300)
    tiles.place_on_tile(leCook, tiles.get_tile_location(10, 8))
    foodThingy()
def startScreen():
    global levelStart, initStart, startButton
    levelStart = 0
    initStart = 0
    startButton = sprites.create(img("""
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
        """),
        SpriteKind.misc)
    scene.set_background_color(4)
    startButton.set_position(scene.screen_width() / 2, scene.screen_height() - 20)
def foodThingy():
    global onionOne, holdingTrue, exposedFood
    if holdingTrue == 0 and (controller.A.is_pressed() and leCook.tile_kind_at(TileDirection.TOP, assets.tile("""
        myTile
    """))):
        onionOne = sprites.create(assets.image("""
                Onion
            """),
            SpriteKind.ingredientForSoup)
        tiles.place_on_tile(onionOne, tiles.get_tile_location(12, 10))
        onionOne.follow(leCook)
        holdingTrue = 1
        exposedFood = 1
leCook: Sprite = None
levelStart = 0
rawIngredients: List[str] = []
startButton: Sprite = None
potForSoup2: Sprite = None
onionOne: Sprite = None
holdingTrue = 0
exposedFood = 0
initStart = 0
startScreen()

def on_on_update():
    scene.camera_follow_sprite(leCook)
    controller.move_sprite(leCook)
    if levelStart == 1:
        foodThingy()
game.on_update(on_on_update)

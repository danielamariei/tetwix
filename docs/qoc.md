### Game Speed Settings

#### Question
What game speed selecting mechanism should we use in the user interface?

#### Options
O1: Drop-down list
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/qoc/qoc-game-speed-drop-down.jpg)

O2: Radio buttons
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/qoc/qoc-game-speed-radio.jpg)

O3: Range input
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/qoc/qoc-game-speed-range.jpg)

#### Criteria

* C1: It is easy for the user to make the action (low user effort).
* C2: The user receives continuous feedback.
* C3: What the user can do is obvious.
* C4: The user can make the action fast.
* C5: The cognitive load on the user is reduced (the 7 rule).
* C6: The mechanism respects Hick's law.
* C7: The represented model is the same as the mental model.

#### Decision
The option with the highest number of points is chosen.

Criteria | Drop-down list | Radio buttons | Range input
---------|----------------|---------------|------------
 C1 |  | * | * 
 C2 | * | * | * 
 C3 | * | * | * 
 C4 |  | * | * 
 C5 |  | * | * 
 C6 |  | * | * 
 C7 |  |  | * 
 Total | 2 | 6 | 7 
 
### Board Style
#### Question
What board style should we use in the user interface?

#### Options
O1: Single
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/gameboards/gameboard-single-sketch.jpg)

O2: Split
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/gameboards/gameboard-split-sketch.jpg)

O3: Model
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/gameboards/gameboard-model-sketch.jpg)


#### Criteria

* C1: Full board movement capabilities.
* C2: Power-ups capabilities.
* C3: What the user can do is obvious.
* C4: Screen compactness.
* C5: The represented model is the same as the mental model.

Criteria | Single | Split | Model
---------|----------------|---------------|------------
 C1 | * |  | * 
 C2 | * |  | *  
 C3 | * |  | * 
 C4 |  |  |  
 C5 | * |  | * 
 Total | 4 | 0 | 4
 
### Input Types
#### Question
What user input types should the application accept?

#### Options
O1: Mouse
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/mouse-force-drop.jpg)
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/mouse-move-left-right.jpg)
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/mouse-rotate-cw-ccw.jpg)

O2: Keyboard
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/kb-force-down.jpg)
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/kb-move-left-right.jpg)
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/kb-rotate-cw-ccw.jpg)

O3 : Gamepad
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/gp-force-down-sketch.jpg)
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/gp-move-left-right-sketch.jpg)
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/gp-rotate-cw-ccw-sketch.jpg)


O4: Gestural
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/leap-force-drop-sketch.jpg)
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/leap-move-left-right-sketch.jpg)
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/leap-rotate-cw-ccw-sketch.jpg)

O5: Locomotion
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/locomotion-pierces-board.jpg)
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/locomotion-force-drop.jpg)
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/locomotion-move-left-right.jpg)
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/locomotion-rotate-cw-ccw.jpg)


O6: Audio
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/voice-force-down.jpg)
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/voice-left-right.jpg)
![](https://github.com/danielamariei/tetwix/blob/master/wiki-resources/images/input-types/voice-rotate-cw-ccw.jpg)


#### Criteria
* C1: It is easy for the user to make the action (low user effort).
* C2: The user receives continuous feedback.
* C3: What the user can do is obvious.
* C4: The user can make the action fast.
* C5: The cognitive load on the user is reduced (the 7 rule).
* C6: Direct manipulation.
* C7: Ease of implementation.
* C8: The user does not experience fatigue.


#### Decision
The options with a score above and including 4 points will be selected.

Criteria | Mouse | Keyboard | Gamepad | Gestural | Locomotion | Audio
---------|-------|----------|---------|----------|------------|------
C1 | * | * | * |  |  | 
C2 | * | * | * | * | * | * 
C3 |  |  |  |  | * | 
C4 | * | * | * | * | * | 
C5 | * | * | * | * | * | * 
C6 | * | * | * |  | * | 
C7 | * | * | * | * |  | 
C8 | * | * | * |  |  | 
Total | 7 | 7 | 7 | 4 | 5 | 2

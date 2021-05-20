# Rectangle
``Child of RenderObject instance``

- - -

# Intro
The 'Rectangle' class allows you to draw rectangles in different sizes and styles. You can apply 4 controllers to it. 

# Required arguments

1. x ``number`` | Sets the x coordinates.
2. y ``number`` | Sets the y coordinates.
3. width ``number`` | Sets the width of the rectangle.
4. height ``number`` | Sets the height of the rectangle.
5. styles ``object`` :
  - backgroundColor ``string | array`` | Set background color of the rectange.
  - borderColor ``string | array`` | Set border color of the rectangle.
  - blurColor ``string | array`` | Set shadow blur color.
  - borderWidth ``number`` | Set width of border.
  - blurOffsetX ``number`` | Set shadow x offset.
  - blurOffsetY ``number`` | Set shadow y offset.
  - blurStrength ``number`` | Set shadow blur strength.
  - globalCompositeOperation ``string`` | Set global composite oprations.

# Methods
- ``On(event, listener)`` Listens for event and calls the listener when triggered. Requires 2 arguments. Event can be any of the following strings: ``hover``, ``click``, ``scroll``.
- ``SetRenderImage(image)`` Sets a image to the rectangle instance do draw. Requires one argument which has to be a ``HTMLImageElement`` instance.
- ``ApplyTo(canvasRendererInstance)`` Applies created instance to a canvas renderer. Requires 1 argument which has to be a ``Canvas Renderer`` instance.

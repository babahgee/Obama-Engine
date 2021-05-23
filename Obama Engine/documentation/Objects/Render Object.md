# RenderObject
```javascript
class RenderObject;
```

- - -

## Intro
This is a parent class, which means that other objects that can be rendered will be applied to this object, **as a child**.

## Properties
- ``Updaters`` | Array of updaters.
- ``attachedRenderObjects`` | Array of attached render objects.
- ``velocityController`` | Applied velocity controller.
- ``collisionController`` | Applied collision controller
- ``gravityController`` | Applied gravity controller.
- ``canDraw`` | Boolean if object can draw.
- ``camera`` | Attached camera.
- ``renderCamera`` | Camera to check if object is in camera sight.

## Methods
```javascript
AttachTo(renderObject);
```
Attaches instance to a render object.
- ``renderObject`` | A ``Render Object`` instance.

<br>

```javascript
RenderInCamera(camera);
```
Render object only in camera sight.
- ``camera`` | A ``Camera`` instance.

## Examples
There are no examples for this since this is not really a public class.
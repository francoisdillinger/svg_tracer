# SVG Tracer

## Update

Shortly after beginning this project, it was featured on CodePen. Check it out [here](https://codepen.io/memesAreLyfe/pen/PoVLbGX)!

## History

I got the idea for this project while watching some tutorials on working with the D3 library and SVGs. The overall goal is to manipulate the SVG by clicking and dragging the control points (circles) until the triangle fits the glowing outlines. Once the triangle side matches up with the outline, the outline will flash green, and you can release the control point (circle), locking the side in place.

Currently, the code supports equilateral and scalene triangles. I'd like to eventually add the ability for the user to specify the number of sides they want the randomly generated shape to contain. However, this has been more difficult than I initially realized due to the math involved, so this will be a work in progress. The code ***will*** generate additional sides for a shape, but the problem arises when trying to ensure none of the sides are overlapping. This will require writing functions to detect overlapping or intersecting lines for n-sided polygons, which I haven't solved on my own 😖 ...yet 😏.

## Examples

### Equilateral Triangles

![equilateral](https://github.com/user-attachments/assets/8d1f99fd-cd10-4a93-81e1-05f70b54df68)


### Scalene Triangles

![scalene](https://github.com/user-attachments/assets/b89c5689-759b-40b8-ac3d-1d726a40085a)


## Instructions

![instructions](https://github.com/user-attachments/assets/10f9f36d-7752-4791-b86c-ee07fcee7354)


### Tracing the Outlines

![trace](https://github.com/user-attachments/assets/f5d145cf-7903-4362-9f5e-48fa36efd0b6)


## Installing

1. Fork a copy to your repository.
2. Open your terminal, and clone the repository to your desktop.
3. Navigate to the root of the project folder.
4. Install node modules:
    ```sh
    npm install
    ```
5. Run the program:
    ```sh
    npm run dev
    ```
6. **Have Fun!** 🥳

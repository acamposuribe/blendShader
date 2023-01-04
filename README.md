# blendShader.js
P5 Realistic Colour blending Library

This Shader allows for quick and high performance realistic colour mixing in P5

# DEPENDENCY:

MixBox: https://github.com/scrtwpns/mixbox

# INSTALLATION:

0) Download [mixbox.js](https://github.com/scrtwpns/mixbox/blob/master/javascript/mixbox.js) and modify the library by declaring the **lut** variable on top, and removing the **let** declaration in line 972. This will make the **lut** variable globally available.

1) Link the .js files in your HTML file.

```
<script src="./mixbox-mod.js"></script>
<script src="./blendShader.js"></script>
```

2) Create your canvas in your SETUP funcion as **mainCanvas** and using WEBGL

```
mainCanvas = createCanvas(width,height,WEBGL);
```

3) Load Library from p5

```
loadColorShader()
```


# USAGE

Draw your geometry to the **paint** buffer, select pigment colour and intensity, and execute the **blendColor** function, once for each colour.

```
pigment("yellow",150)
paint.rect(2*width/3,2*height/3,300,300)
blendColor()
```


# DISCLAIMER

This Library depends on the MixBox library, licensed for non-commercial use under the CC BY-NC 4.0 license. If you want to obtain commercial license from them, please contact: mixbox@scrtwpns.com. I have no relationship with Secret Weapons.

// ==========================================================
//  COLOR BLENDING SHADER (c) 2022
//  License: MIT License
//  Author: Alejandro Campos
// ==========================================================

let mixboxTexture, paint, colorBlendingShader, pDensity, mainCanvas, newPigment;
    
function loadColorShader() {
    // Create buffer for Shader
    pDensity = pixelDensity();
    paint = createGraphics(width, height);
    paint.pixelDensity(pDensity);
    // MixBox auxiliary function
    lutTexture();
    // Compile Shader
    colorBlendingShader = createShader(vert, frag);
    paint.fill(255,0,0,255)
}

// COLOR MIXING FUNCTION
function blendColor() {
    push();

    // Load shader and send data from canvas
    shader(colorBlendingShader);
    colorBlendingShader.setUniform('addColor', newPigment);
    colorBlendingShader.setUniform('mixbox_lut', mixboxTexture);
    colorBlendingShader.setUniform('source', mainCanvas);
    colorBlendingShader.setUniform('mask', paint);

    // Give geometry to shader
    rectMode(CENTER)
    translate(0,0);
    fill(0,0,0,0);
    noStroke();
    rect(0, 0, width, height);

    // Clear Mask to prepare for next colour
    paint.clear();

    pop();
}

function pigment(_c,_i) {
    newPigment = [float(red(color(_c))),float(green(color(_c))),float(blue(color(_c)))];
    paint.fill(255,0,0,_i)
    paint.noStroke();
}

function lutTexture() {
    if (!mixboxTexture) {
        mixboxTexture = createGraphics(512,512);
        mixboxTexture.pixelDensity(1);
        mixboxTexture.loadPixels();
        for(var b = 0; b < 64; b++)
        for(var g = 0; g < 64; g++)
        for(var r = 0; r < 64; r++) {
            var x = (b % 8)*64 + r;
            var y = ((b / 8) | 0)*64 + g;
            var xyz = r + g*64 + b*64*64;
            mixboxTexture.pixels[(x + y*512)*4 + 0] = lut[xyz+   192];
            mixboxTexture.pixels[(x + y*512)*4 + 1] = lut[xyz+262336];
            mixboxTexture.pixels[(x + y*512)*4 + 2] = lut[xyz+524480];
            mixboxTexture.pixels[(x + y*512)*4 + 3] = 255;
        }
        mixboxTexture.updatePixels();
    }
}

// SHADER

let vert = `
precision highp float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 vVertTexCoord;

void main(void) {
vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
vVertTexCoord = aTexCoord;
}
`
let frag = `
precision highp float;
varying vec2 vVertTexCoord;


uniform sampler2D source;
uniform sampler2D mask;
uniform sampler2D mixbox_lut;
uniform vec4 addColor;

#include "mixbox.glsl"

vec3 rgb(float r, float g, float b){
    return vec3(r / 255.0, g / 255.0, b / 255.0);
}

void main() {
    vec4 maskColor = texture2D(mask, vVertTexCoord);
    vec4 canvasColor = texture2D(source, vVertTexCoord);

    // We need vec3
    vec3 existingColor = vec3(canvasColor.r,canvasColor.g,canvasColor.b);
    vec3 colorToAdd = rgb(addColor.r,addColor.g,addColor.b);

    if (maskColor.r > 0.0) {
        float t = maskColor.a;
        vec3 mixedColor = mixbox_lerp(existingColor, colorToAdd, t);
        gl_FragColor = vec4(mixedColor,1.0);
    }
    else {
        gl_FragColor = vec4(existingColor,1.0);
    }
}
`

// ADD MIXBOX BLENDING FORMULA TO THE SHADER
frag = frag.replace('#include "mixbox.glsl"', mixbox.glsl());

function setup() {

    // CREATE CANVAS as mainCanvas; and always WEBGL !!
    mainCanvas = createCanvas(500,500,WEBGL);
    pixelDensity(2);

    // LOAD LIBRARY
    loadColorShader()

    // EXAMPLE USAGE, draw two squares, one yellow, one blue
        background(220)

        paint.rectMode(CENTER)

        pigment("blue",150)                     // pigment(color,intensity) -> Set pigment color and intensity (0-255). You can also use HEX values, or [R,G,B] colours
        paint.rect(width/3,height/3,300,300);   // Draw geometry
        blendColor()                            // Blend the colour -> Execute once per each different colour

        pigment("yellow",150)
        paint.rect(2*width/3,2*height/3,300,300)
        blendColor()
}

function draw() {
}